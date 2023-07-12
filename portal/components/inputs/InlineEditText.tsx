import React, { useState } from "react";

import EdiText from "react-editext";

const InlineEditText = () => {
  const [value, setValue] = useState("What is real? How do you define real?");

  const handleSave = (val: any) => {
    console.log("Edited Value -> ", val);
    setValue(val);
  };
  return (
    <div className="container">
      <EdiText
        type="text"
        value={value}
        onSave={handleSave}
        startEditingOnFocus
      />
    </div>
  );
};

export default InlineEditText;
