import React, { useEffect, useState } from "react";
import { OrderedListOutlined } from "@ant-design/icons";

const Drawer = ({ children, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show]);

  return (
    <div className="drawer">
      <button className="open-button" onClick={() => setShow(!show)}>
        Order <OrderedListOutlined />
      </button>
      {show && (
        <>
          <div className="content">{children}</div>
          <div className="backdrop" onClick={() => setShow(false)} />
        </>
      )}
    </div>
  );
};

export default Drawer;
