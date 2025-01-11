import mammoth from 'mammoth';
import fs from 'fs';
import * as Cheerio from 'cheerio';

const parseDocxTables = async (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);

  // Convert .docx to HTML
  const result = await mammoth.convertToHtml({ buffer: fileBuffer });

  // Parse HTML with Cheerio
  const $ = Cheerio.load(result.value);

  console.log("Parsing Tables:");
  // Loop through each table in the document
  $("table").each((tableIndex, table) => {
    let headers = [];
    let headerColumnIndexes = null;
    const questionList = [];

    $(table).find("tr").each((rowIndex, row) => {
      const cells = $(row).find("td, th");

      if (!headerColumnIndexes) {
        // Detect headers
        cells.each((cellIndex, cell) => {
          const cellText = $(cell).text().trim().toLowerCase();
          const wordsToCheck = ['no', 's.no', 'part-a', 'marks', 'bl', 'co', 'pi'];
          const partARegex = /part[-–]?a/i;

          if (wordsToCheck.includes(cellText)) {
            headers[cellIndex] = cellText;
          } else if (partARegex.test(cellText)) {
            headers[cellIndex] = 'question';
          }
        });

        if (headers.length > 0) {
            headerColumnIndexes = {
            no: headers.indexOf('no'),
            question: headers.indexOf('question'),
            marks: headers.indexOf('marks'),
            co: headers.indexOf('co'),
            pi: headers.indexOf('pi'),
            bi: headers.indexOf('bl'), 
          };

          console.log(`Headers detected in Table ${tableIndex + 1}, Row ${rowIndex + 1}:`, headers);
        }
      } else {
        const questionObj = {};
        cells.each((cellIndex, cell) => {
        const cellText = $(cell).text().trim();

          if (cellIndex === headerColumnIndexes.no) questionObj.no = cellText;
          if (cellIndex === headerColumnIndexes.question) questionObj.question = cellText;
          if (cellIndex === headerColumnIndexes.marks) questionObj.marks = cellText;
          if (cellIndex === headerColumnIndexes.co) questionObj.co = cellText;
          if (cellIndex === headerColumnIndexes.pi) questionObj.pi = cellText;
          if (cellIndex === headerColumnIndexes.bi) questionObj.bi = cellText;
        });

        // Add complete question objects to the list
        if (Object.keys(questionObj).length > 0) {
          questionList.push(questionObj);
        }
      }
    });

    console.log(`Table ${tableIndex + 1} Parsed Data:`, JSON.stringify(questionList, null, 2));
  });
};

const filePath = "ND-TOC ST2 23-24 (1) (1).docx";
parseDocxTables(filePath).catch((err) => console.error("Error:", err));
