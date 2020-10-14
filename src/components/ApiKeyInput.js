import React from "react";
import Button from "@material-ui/core/Button";

function ApiKeyInput({ updateApiKey, handleAPIKeyChange }) {
  return (
    <form>
      <input
        type="text"
        onChange={handleAPIKeyChange}
        placeholder="Your alphavantage API key"
      />
      <Button size="small" variant="outlined" onClick={updateApiKey}>
        Go!
      </Button>
    </form>
  );
}

export default ApiKeyInput;
