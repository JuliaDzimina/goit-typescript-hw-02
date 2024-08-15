import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
      <RotatingLines />
    </div>
  );
};

export default Loader;
