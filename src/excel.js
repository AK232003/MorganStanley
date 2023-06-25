import React from 'react';
import ExcelJS from 'exceljs';

const exportToExcel = async () => {
  const data = [
    ['Full Name', 'Gender', 'Date Of Birth', 'Estimated Age', 'Category', 'Photo', 'State', 'District', 'Home', 'Case Number', 'Reason For Admission', 'Reason For Flagging', 'Last Visit Since', 'Last Call Since', 'Guardian', 'Sibling Details', 'Case History'],
  ];

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  worksheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const fileName = 'data.xlsx';

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fileName);
  } else {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  }
};
export default exportToExcel;