import React, { useState } from "react";

import { UpOutlined, DownOutlined } from "@ant-design/icons";

const SequencingTable = ({ data, onChange }) => {
  const reOrder = (index, side) => {
    const final = [...data];
    if (side) {
      // increasing index
      if (index !== final.length - 1) {
        const temp = data[index + 1];
        final[index + 1] = data[index];
        final[index] = temp;
      }
    } else {
      // decreasing index
      if (index !== 0) {
        const temp = data[index - 1];
        final[index - 1] = data[index];
        final[index] = temp;
      }
    }
    onChange(final);
  };

  return (
    <div className="sequencing-table">
      {data.map((row, index) => (
        <div key={row} className="row">
          <div className="name">
            ({index + 1}) {row}
          </div>
          <div className="buttons">
            <button className="btn" onClick={() => reOrder(index, false)}>
              <UpOutlined />
            </button>
            <button className="btn" onClick={() => reOrder(index, true)}>
              <DownOutlined />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SequencingTable;
