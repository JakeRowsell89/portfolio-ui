import React, { useState, useEffect } from "react";
import axios from "axios";
import Trackers from "./pages/Trackers";
import ApiKeyInput from "./components/ApiKeyInput";
import { API_KEY, TRACKERS } from "./constants";
import normalisePrice from "./helpers";
import "./App.css";

const trackerCache = {};

function App() {
  const [stocks, setStocks] = useState([]);
  const storedTrackers = localStorage.getItem(TRACKERS) || "[]";
  const [apiKey, setApiKey] = useState(localStorage.getItem(API_KEY));
  const [trackers, setTrackers] = useState(JSON.parse(storedTrackers));
  const [formData, updateAPIKeyFormData] = useState("");
  const [symbol, updateTrackerFormData] = useState("");
  const [amount, updateAmountFormData] = useState(0);

  const handleAPIKeyChange = (e) => updateAPIKeyFormData(e.target.value.trim());
  const handleAmountChange = (e) => {
    updateAmountFormData(Number(e.target.value.trim()));
  };
  const handleTrackerChange = (e) =>
    updateTrackerFormData(e.target.value.trim());

  const updateApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem(API_KEY, formData);
    setApiKey(formData);
  };

  const addTracker = (e) => {
    console.log(stocks);
    const newStocks = [...stocks, { amount, symbol }];
    e.preventDefault();
    localStorage.setItem(TRACKERS, JSON.stringify(newStocks));
    setTrackers(newStocks);
    setStocks(newStocks);
    updateTrackerFormData("");
    updateAmountFormData(0);
  };

  useEffect(() => {
    for (let i = 0; i < trackers.length; i++) {
      const tracker = trackers[i];
      if (!trackerCache[tracker.symbol]) {
        axios
          .get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tracker.symbol}.L&apikey=${apiKey}`
          )
          .then(({ data }) => {
            console.log(data);
            const returnedPrice = data["Global Quote"]["05. price"];
            const price = normalisePrice(tracker.symbol, returnedPrice);
            const newStocksPrice = {
              ...tracker,
              priceFromAPI: returnedPrice,
              price,
              totalValue:
                Math.round((price * tracker.amount + Number.EPSILON) * 100) /
                100,
            };

            console.log(newStocksPrice);
            setStocks((oldStocksPrice) => [
              ...oldStocksPrice.filter((s) => s.symbol !== tracker.symbol),
              newStocksPrice,
            ]);
            if (!data && data["Global Quote"]) {
              throw new Error("Possible API limit hit", JSON.stringify(data));
            }
          })
          .catch(console.error);
      }
      trackerCache[tracker.symbol] = true;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {apiKey ? (
          <Trackers
            stocks={stocks}
            handleTrackerChange={handleTrackerChange}
            handleAmountChange={handleAmountChange}
            addTracker={addTracker}
            symbol={symbol}
            amount={amount}
          />
        ) : (
          <ApiKeyInput
            updateApiKey={updateApiKey}
            handleAPIKeyChange={handleAPIKeyChange}
          />
        )}
        Total portfolio value: {stocks.reduce((p, c) => p + c.totalValue, 0)}
      </header>
    </div>
  );
}

export default App;
