import React, { ReactElement } from "react";
import styles from "./sizer.module.css";

const Sizer = ({ children }: { children: ReactElement }) => {
  return (
    <div className={styles.sizer}>
      <div className={styles.sizer_clip}>{children}</div>
    </div>
  );
};

export default Sizer;
