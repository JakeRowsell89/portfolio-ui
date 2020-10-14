import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tracker from "./Tracker";
import "./Trackers.css";

function Trackers({ stocks, addTracker }) {
  const [showing, setShowing] = useState(false);
  const [amount, setAmount] = useState();
  const [name, setName] = useState("");
  const [type, setType] = useState("stock");
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
      setAmount(null);
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
        <form className="stocks-form">
          <TextField
            onChange={updateTracker}
            label="Asset Symbol"
            value={name}
            size="medium"
          />
          <TextField
            onChange={updateAmount}
            label="Amount"
            value={amount}
            size="medium"
          />
          <FormControl>
            <InputLabel id="asset-type-input" shrink={true}>
              Type
            </InputLabel>
            <Select
              onChange={updateType}
              value={type}
              labelId="asset-type-input"
            >
              <MenuItem value="bond">bond</MenuItem>
              <MenuItem value="gold">gold</MenuItem> 
              <MenuItem value="stock">stock</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={saveTracker}
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
          <span role="img" aria-label="Add new asset"></span>➕
        </div>
      )}
    </div>
  );
}

export default Trackers;
