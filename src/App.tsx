import React, { useEffect, useState } from 'react';
import './App.css';

const API_KEY = 'RIBXT3XYLI69PC0Q';
const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`;

interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const timeSeries = data['Time Series (Daily)'];
        const stockData = Object.keys(timeSeries).map(date => ({
          date,
          ...timeSeries[date],
        }));
        setData(stockData);
      })
      .catch(error => setError('Failed to fetch data'));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Data</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Open</th>
              <th className="py-2">High</th>
              <th className="py-2">Low</th>
              <th className="py-2">Close</th>
              <th className="py-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.open}</td>
                <td className="border px-4 py-2">{item.high}</td>
                <td className="border px-4 py-2">{item.low}</td>
                <td className="border px-4 py-2">{item.close}</td>
                <td className="border px-4 py-2">{item.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
