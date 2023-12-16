import React from 'react';
import jsonData from './data1.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Define a custom type for position data
type PositionData = [string, string, string, string, string];

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
  
    // Flatten all positions into a single array and sort them by date
    const allPositions: PositionData[] = userbrokers.reduce(
      (acc: PositionData[], broker) => {
        const { userstrategys } = broker;
        userstrategys.forEach((strategy) => {
          const { positions } = strategy;
          positions.forEach((position) => {
            // Format the date using toLocaleDateString
            const formattedDate = new Date(position.createdAt).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }
            );
  
            acc.push([
              broker.name,
              formattedDate,
              strategy.name,
              position.avgBuyPrice,
              position.profitLoss,
            ]);
          });
        });
        return acc;
      },
      []
    );
  
    // Sort positions by date in ascending order
    const sortedPositions: PositionData[] = allPositions.sort(
      (a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime()
    );
  
    pdf.autoTable({
      head: [headers],
      body: sortedPositions,
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
