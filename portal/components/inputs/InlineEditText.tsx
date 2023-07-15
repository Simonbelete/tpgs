import React, { useState, useCallback } from "react";

import EdiText from "react-editext";

const InlineEditText = ({
  onSave,
  value,
  editing,
}: {
  onSave: (val: string) => void;
  value?: string;
  editing?: boolean;
}) => {
  const handleSave = useCallback(
    (val: string) => {
      onSave(val);
    },
    [onSave]
  );

  return (
    <div className="container">
      <EdiText
        type="text"
        value={value ?? ""}
        onSave={handleSave}
        startEditingOnFocus
        editing
      />
    </div>
  );
};

export default InlineEditText;
