import mammoth from 'mammoth';


try {
    const filePath = "ND-TOC ST2 23-24 (1) (1).docx";
    const { value: extractedText } = await mammoth.extractRawText({ path: filePath });
    const questions = extractedText.split('\n').filter(line => line.trim() !== '');
    console.log(questions);
} catch (error) {
    console.error('Error processing file:', error);
}