import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./components/Chart";
import Trackers from "./components/Trackers";
import Accounts from "./components/Accounts";
import ApiKeyInput from "./components/ApiKeyInput";
import { API_KEY, TRACKERS, ACCOUNTS } from "./constants";
import normalisePrice from "./helpers";
import "./App.css";

const trackerCache = {};

function App() {
  const [stocks, setStocks] = useState([]);
  const storedAccounts = localStorage.getItem(ACCOUNTS) || "[]";
  const [accounts, setAccounts] = useState(JSON.parse(storedAccounts));
  const storedTrackers = localStorage.getItem(TRACKERS) || "[]";
  const [apiKey, setApiKey] = useState(localStorage.getItem(API_KEY));
  const [trackers, setTrackers] = useState(JSON.parse(storedTrackers));
  const [formData, updateAPIKeyFormData] = useState("");

  const handleAPIKeyChange = (e) => updateAPIKeyFormData(e.target.value.trim());

  const updateApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem(API_KEY, formData);
    setApiKey(formData);
  };

  const addTracker = (name, amount, type) => {
    const newStocks = [...stocks, { amount, name, type }];
    localStorage.setItem(TRACKERS, JSON.stringify(newStocks));
    setTrackers(newStocks);
    setStocks(newStocks);
  };

  const addAccount = (name, value) => {
    const newAccounts = [...accounts, { name, value, type: "savings" }];
    localStorage.setItem(ACCOUNTS, JSON.stringify(newAccounts));
    setAccounts(newAccounts);
  };

  useEffect(() => {
    for (let i = 0; i < trackers.length; i++) {
      const tracker = trackers[i];
      if (!trackerCache[tracker.name]) {
        axios
          .get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tracker.name}.L&apikey=${apiKey}`
          )
          .then(({ data }) => {
            console.log(data);
            const returnedPrice = data["Global Quote"]["05. price"];
            const price = normalisePrice(tracker.name, returnedPrice);
            const newStocksPrice = {
              ...tracker,
              priceFromAPI: returnedPrice,
              price,
              value:
                Math.round((price * tracker.amount + Number.EPSILON) * 100) /
                100,
            };

            console.log(newStocksPrice);
            setStocks((oldStocksPrice) => [
              ...oldStocksPrice.filter((s) => s.name !== tracker.name),
              newStocksPrice,
            ]);
            if (!data && data["Global Quote"]) {
              throw new Error("Possible API limit hit", JSON.stringify(data));
            }
          })
          .catch(console.error);
      }
      trackerCache[tracker.name] = true;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <Chart assets={stocks.concat(accounts)} />
        <Accounts accounts={accounts} addAccount={addAccount} />
        {apiKey ? (
          <Trackers stocks={stocks} addTracker={addTracker} />
        ) : (
          <ApiKeyInput
            updateApiKey={updateApiKey}
            handleAPIKeyChange={handleAPIKeyChange}
          />
        )}
        Total portfolio value:{" "}
        {stocks.reduce((p, c) => p + c.value, 0) +
          accounts.reduce((p, c) => p + c.value, 0)}
      </header>
    </div>
  );
}

export default App;
