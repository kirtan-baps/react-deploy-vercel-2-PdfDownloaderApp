import React from 'react';
import jsonData from './data1.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const App: React.FC = () => {
  const handleDownloadPdf = () => {
    const pdf = new jsPDF();
    const { userbrokers } = jsonData.data.getuserdata;
    const headers = [
      'Broker Name',
      'Date Created',
      'Strategy Name',
      'Avg Buy Price',
      'Profit/Loss',
    ];

    userbrokers.forEach((broker) => {
      const { userstrategys } = broker;
      userstrategys.forEach((strategy) => {
        const { positions } = strategy;
        const data = positions.map((position) => [
          broker.name,
          position.createdAt,
          strategy.name,
          position.avgBuyPrice,
          position.profitLoss,
        ]);

        pdf.autoTable({
          head: [headers],
          body: data,
        });
      });
    });

    pdf.save('trading_positions.pdf');
  };

  return (
    <div className="App">
      <h1>PDF Download Example</h1>
      <p>
        Click the button below to download the PDF containing trading positions.
      </p>
      <button type="button" onClick={handleDownloadPdf}>
        Download PDF
      </button>
    </div>
  );
};

export default App;
