import React, { useState } from "react";

import Tracker from "./Tracker";

function Trackers({ stocks, addTracker }) {
  const [showing, setShowing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const updateTracker = (e) => {
    setName(e.target.value.trim());
  };
  const updateAmount = (e) => {
    setAmount(Number(e.target.value.trim()));
  };
  const updateType = (e) => {
    console.log(e.target.value.trim());
    setType(e.target.value.trim());
  };
  const saveTracker = (e) => {
    e.preventDefault();

    if (name.length) {
      addTracker(name, amount, type);
      setAmount(0);
      setName("");
      setType("");
      setShowing(false);
    }
  };
  return (
    <div className="Trackers">
      <header className="Trackers-header">My Trackers</header>
      <section className="Trackers-list">
        {stocks.map((tracker, i) => (
          <Tracker tracker={tracker} key={i} />
        ))}
      </section>
      {showing ? (
        <form>
          <input
            type="text"
            onChange={updateTracker}
            placeholder="New Tracker listing"
            value={name}
          />
          <input
            type="text"
            onChange={updateAmount}
            placeholder="Amount of shares"
            value={amount}
          />
          <select onChange={updateType} value={type}>
            <option value="bond">bond</option>
            <option value="gold">gold</option> 
            <option value="stock">stock</option>
          </select>
          <div onClick={saveTracker}>
            <span role="img" aria-label="Confirm asset creation">
              ✅
            </span>
          </div>
          <div onClick={() => setShowing(false)}>
            <span role="img" aria-label="Cancel asset creation">
              ❌
            </span>
          </div>
        </form>
      ) : (
        <div onClick={() => setShowing(true)}>
          <span role="img" aria-label="Add new asset"></span>➕
        </div>
      )}
    </div>
  );
}

export default Trackers;
