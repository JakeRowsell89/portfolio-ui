import React from "react";

function Tracker({ tracker }) {
  return (
    <div className="Tracker">
      <section className="Tracker-list">
        {`${tracker.name} (${tracker.type}) - ${tracker.amount}x${tracker.price} = ${tracker.value}`}
      </section>
    </div>
  );
}

export default Tracker;
