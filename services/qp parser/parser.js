import mammoth from 'mammoth';
import fs from 'fs';
import * as Cheerio from 'cheerio';

function removeSpaces(text) {
  return text.replace(/\s+/g, "");
}

export const parseDocxTables = async (filePath) => {

  class QuestionObject {
    constructor({
        pi = null,
        co = null,
        bl = null,
        marks = null,
        question = null,
        option = null,
        subDivision = null,
        no = null
    } = {}) {
        this.pi = pi;
        this.co = co;
        this.bl = bl;
        this.marks = marks;
        this.question = question;
        this.option = option;
        this.subDivision = subDivision;
        this.no = no;
    }

}



  const fileBuffer = fs.readFileSync(filePath);

  // Convert .docx to HTML
  const result = await mammoth.convertToHtml({ buffer: fileBuffer });

  // Parse HTML with Cheerio
  const $ = Cheerio.load(result.value);
  let questionList = [];
  // console.log("Parsing Tables:");
  // Loop through each table in the document
  $("table").each((tableIndex, table) => {
    let headers = [];
    let foundHeader = false;
    let headerColumnIndexes = {
        no: 0,
        option: 1,
        subDivision: 2,
        question: 3,
        marks: null,
        bl: null,
        co: null,
        pi: null,
    };
    

    $(table).find("tr").each((rowIndex, row) => {

      const cells = $(row).find("td, th");
      

      if (!foundHeader) {
        // Detect headers
        cells.each((cellIndex, cell) => {
          const cellText = $(cell).text().trim().toLowerCase();
          const wordsToCheck = ['no', 's.no', 'part-a', 'marks', 'bl', 'co', 'pi'];
          const partRegex = /part\s*[-–]?\s*\w/i;
          const answerRegex = /^answer all( the)? question(s)?/i;

          if (wordsToCheck.includes(cellText)) {
            headers[cellIndex] = cellText;
          } else if (partRegex.test(cellText) || answerRegex.test(cellText)) {
            headers[cellIndex] = 'question';
          } 
        });

        if (headers.length > 0) {
            headerColumnIndexes = {
                no: headers.indexOf('no') !== -1 ? headers.indexOf('no') : headerColumnIndexes.no,
                option: headers.indexOf('option') !== -1 ? headers.indexOf('option') : headerColumnIndexes.option,
                subDivision: headers.indexOf('sub division') !== -1 ? headers.indexOf('sub division') : headerColumnIndexes.subDivision,
                question: headers.indexOf('question') !== -1 ? headers.indexOf('question') : headerColumnIndexes.question,
                marks: headers.indexOf('marks') !== -1 ? headers.indexOf('marks') : null,
                co: headers.indexOf('co') !== -1 ? headers.indexOf('co') : null,
                bl: headers.indexOf('bl') !== -1 ? headers.indexOf('bl') : headers.indexOf('bl') !== -1 ? headers.indexOf('bl') : null,
                pi: headers.indexOf('pi') !== -1 ? headers.indexOf('pi') : null,
            };

          // console.log(`Headers detected in Table ${tableIndex + 1}, Row ${rowIndex + 1}:`, headers);
          foundHeader = true;
        }
      } else {
        const regexTextOption = /^[a-fA-F](i(\.|\))?)?$/;
        const regexTextSubDivision = /^\(?i{1,3}\)?(\.|\))?$/;
        const regexTextQuestionNo = /^[0-9]+(\n[0-9]+)*$/;

        const questionObj = {
            pi: null,
            co: null,
            bl: null,
            marks: null,
            question: null,
            option: null,
            subDivision: null,
            no: null
        };

        let nonNestedCells = [];

      // Iterate through the cells in reverse order
      $(cells.toArray().reverse()).each((cellIndex, cell) => {
        // Check if the cell contains nested content (nested tables or cells)
        const hasNestedContent = $(cell).parents("td, th").length > 0;

        if (!hasNestedContent) {
          // Add the cell text to the array if it doesn't contain nested content
          const cellText = $(cell).text();
          nonNestedCells.push(cellText);
        } else {
          //console.log(`In Table ${tableIndex + 1}, Row ${rowIndex + 1}, Skipped cell ${cellIndex} because it contains nested content.`);
        }
      });

      // Output the array of non-nested cells
        nonNestedCells.forEach((cellText, cellIndex) => {
            if(nonNestedCells.length>0){
            if (headers.length-1-cellIndex === headerColumnIndexes.pi) questionObj.pi = cellText.trim();
            else if (headers.length-1-cellIndex === headerColumnIndexes.bl) questionObj.bl = cellText.trim();
            else if (headers.length-1-cellIndex === headerColumnIndexes.co) questionObj.co = cellText.trim();
            else if (headers.length-1-cellIndex === headerColumnIndexes.marks) questionObj.marks = cellText.trim();
            else if (headers.length-1-cellIndex === headerColumnIndexes.question) questionObj.question = cellText.trim();
            else if(headers.length-1-cellIndex<headerColumnIndexes.question){
                if(regexTextOption.test(removeSpaces(cellText))){
                    questionObj.option = cellText.trim()[0];
                }else if(regexTextSubDivision.test(cellText.trim())){
                    questionObj.subDivision = cellText;
                }else if(regexTextQuestionNo.test(cellText.trim())){
                    questionObj.no = cellText;
                }
            }
            else if (headers.length-1-cellIndex === headerColumnIndexes.no){
                questionObj.no = cellText;
            };
          }
        });

        if (Object.keys(questionObj).length > 0) {
            const question = new QuestionObject(questionObj);
            questionList.push(question);
        }
      }
    });

    const handleQuestionList = (questionList) => {
      let previousNo = null;
      let previousOption = null;

      return questionList
        // Filter out objects that have all null fields and only one non-null field from array
        .filter((obj) => {
            // Get all the values of the object
            const values = Object.values(obj);
        
            // Count the number of non-null values
            const nonNullCount = values.filter((value) => value !== null && value !== "" && value.trim() !== "").length;
        
            // Keep objects that have more than one non-null field
            return nonNullCount > 1;
          })
      
        // Update unmatched question.no with previous no
        .map((question) => {
          if (!question.no || question.no.trim() === "") {
            question.no = previousNo;
          } else {
            previousNo = question.no;
          } 
          if(!question.option || question.option.trim() === ""){
            question.option = previousOption;
          } else{
            previousOption = question.option;
          }
          return question;
        })
      
    };
    
    questionList=handleQuestionList(questionList);
    
  });

  const processedQuestions = processQuestionsSubdivision(questionList);
  
  return processedQuestions;
};


function processQuestionsSubdivision(questionList) {
  const queue = [];
  let subdivisionCounter = 1;

  questionList.forEach((question, index) => {

      if (queue.length === 0) {
          queue.push(question);
          return;
      }

      const currentQuestion = queue[queue.length - 1];
      
      if (currentQuestion.no === question.no && currentQuestion.option === question.option) {
          queue.push(question);
      } else {
        
          //Before pushing the current question into the queue, process the queue
          subdivisionCounter = 1;
          if (queue.length === 1) {
              queue[0].subDivision = null;
          } else {
              queue.forEach((q, i) => {
                  q.subDivision = (subdivisionCounter + i).toString();
              });
          }

          queue.length = 0;
          queue.push(question);
      }
  });

  // Processing for any remaining elements in the queue
  if (queue.length === 1) {
      queue[0].subDivision = null;
  } else {
      queue.forEach((q, i) => {
          q.subDivision = (subdivisionCounter + i).toString();
      });
  }
  
  return questionList;
}