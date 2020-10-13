import React from "react";

import Tracker from "../components/Tracker";

function Trackers({
  stocks,
  handleTrackerChange,
  handleAmountChange,
  addTracker,
  symbol,
  amount,
}) {
  return (
    <div className="Trackers">
      <header className="Trackers-header">My Trackers</header>
      <section className="Trackers-list">
        {stocks.map((tracker, i) => (
          <Tracker tracker={tracker} key={i} />
        ))}
      </section>
      <form>
        <input
          type="text"
          onChange={handleTrackerChange}
          placeholder="New Tracker listing"
          value={symbol}
        />
        <input
          type="text"
          onChange={handleAmountChange}
          placeholder="Amount of shares"
          value={amount}
        />
        <input type="submit" onClick={addTracker} value="sub" />
      </form>
    </div>
  );
}

export default Trackers;
