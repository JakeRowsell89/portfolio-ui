import React from "react";

function ApiKeyInput({ updateApiKey, handleAPIKeyChange }) {
  return (
    <form>
      <input
        type="text"
        onChange={handleAPIKeyChange}
        placeholder="Your alphavantage API key"
      />
      <input type="submit" onClick={updateApiKey} value="sub" />
    </form>
  );
}

export default ApiKeyInput;
