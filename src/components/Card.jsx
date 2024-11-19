import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, id }) => (
  <Link to={`/content/${id}`} style={{ textDecoration: "none" }}>
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
    </div>
  </Link>
);

export default Card;
