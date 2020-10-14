import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Account from "./Account.js";
import "./Accounts.css";

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
        <form className="accounts-form">
          <TextField
            label="Name"
            onChange={updateName}
            value={name}
            size="medium"
          />
          <TextField
            label="Balance"
            onChange={updateBalance}
            value={value}
            size="medium"
          />
          <Button
            onClick={saveAccountDetails}
            variant="outlined"
            color="primary"
            size="small"
          >
            Save
          </Button>
          <Button
            onClick={() => setShowing(false)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            Cancel
          </Button>
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
