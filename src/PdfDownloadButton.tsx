// // src/PdfDownloadButton.tsx
// import React from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import jsonData from './data1.json';

// const PdfDownloadButton: React.FC = () => {
//   const downloadPdf = () => {
//     const pdf = new jsPDF();
//     const brokers = jsonData.data.getuserdata.userbrokers;

//     brokers.forEach((broker) => {
//       // Add broker name to the PDF
//       pdf.text(`Broker Name: ${broker.name}`, 14, 20);

//       broker.userstrategys.forEach((strategy) => {
//         // Add strategy name to the PDF
//         pdf.text(`Strategy Name: ${strategy.name}`, 14, pdf.autoTable.previous.finalY + 10);

//         // Create an array of arrays containing the data to be added to the PDF
//         const rows = strategy.positions.map((position) => [
//           position.symbol,
//           position.avgBuyPrice,
//           position.Orders[0].reason,
//         ]);

//         // Add the table to the PDF
//         pdf.autoTable({
//           head: [['Symbol', 'Avg Buy Price', 'Profit/Loss']],
//           body: rows,
//           startY: pdf.autoTable.previous.finalY + 10,
//         });
//       });
//     });

//     // Save the PDF
//     pdf.save('report.pdf');
//   };

//   return (
//     <button onClick={downloadPdf} className="download-button">
//       Download PDF
//     </button>
//   );
// };

// export default PdfDownloadButton;
