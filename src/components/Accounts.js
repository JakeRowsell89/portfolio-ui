import React, { useState } from "react";
import Account from "./Account.js";

function Accounts({ accounts, addAccount }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [showing, setShowing] = useState(false);

  const updateName = (e) => {
    setName(e.target.value.trim());
  };

  const updateBalance = (e) => {
    setValue(Number(e.target.value.trim()));
  };

  const saveAccountDetails = (e) => {
    e.preventDefault();
    if (name.length) {
      addAccount(name, value);
      setValue(0);
      setName("");
      setShowing(false);
    }
  };
  return (
    <div className="Accounts">
      <header className="Accounts-header">My Accounts</header>
      <section className="Accounts-list">
        {accounts.map((account, i) => (
          <Account name={account.name} value={account.value} key={i} />
        ))}
      </section>
      {showing ? (
        <form>
          <input
            type="text"
            onChange={updateName}
            placeholder="Account name"
            value={name}
          />
          <input
            type="text"
            onChange={updateBalance}
            placeholder="Account value"
            value={value}
          />
          <div onClick={saveAccountDetails}>
            <span role="img" aria-label="Confirm account creation">
              ✅
            </span>
          </div>
          <div onClick={() => setShowing(false)}>
            <span role="img" aria-label="Close account creation">
              ❌
            </span>
          </div>
        </form>
      ) : (
        <div onClick={() => setShowing(true)}>
          <span role="img" aria-label="Add new account">
            ➕
          </span>
        </div>
      )}
    </div>
  );
}

export default Accounts;
