const ExcelJS = require('exceljs');
const path = require('path');

async function readExcel() {
    const filePath = path.join(__dirname, 'public', 'data.xlsx');
    const workbook = new ExcelJS.Workbook();

    try {
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);

        console.log('--- Reading data.xlsx ---');
        worksheet.eachRow((row, rowNumber) => {
            console.log(`Row ${rowNumber}: ${JSON.stringify(row.values)}`);
        });
        console.log('--- End of File ---');
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

readExcel();
