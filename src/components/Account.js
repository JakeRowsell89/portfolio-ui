import React from "react";

function Account({ name, value }) {
  return (
    <div className="Account">
      <section className="Account-list">
        {name} {value}
      </section>
    </div>
  );
}

export default Account;
