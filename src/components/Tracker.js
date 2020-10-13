import React from "react";

function Tracker({ tracker }) {
  return (
    <div className="Tracker">
      <section className="Tracker-list">
        {tracker.symbol} x {tracker.amount} = {tracker.price} x {tracker.amount}{" "}
        = {tracker.totalValue}
      </section>
    </div>
  );
}

export default Tracker;
