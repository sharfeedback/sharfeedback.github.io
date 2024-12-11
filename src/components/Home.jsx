import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
// import data from "../data/data.json";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardWrap from "./Card";
import { useData } from "./DataContent";
import SearchBar from "./SearchBar";

import { useAppBarTitle } from "./ButtonAppBar";

const Home = () => {
  const { id } = useParams();
  const { setTitle } = useAppBarTitle();
  const [search, setSearch] = useState("");
  setTitle("Intern");
  const { data, loading, error } = useData();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const openGemini = () =>  navigate("/gemini");
  const filteredData = data.filter(
    (item) =>
      !item.hide &&
      item.title.toLowerCase().includes(search.toLowerCase()) |
        item.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "700px",
        display: "unset",
      }}
    >
      <SearchBar value={search} onChange={setSearch} />
      <Button onClick={openGemini}>Ask AI</Button>
      <Box>
        {data.map((item, index) => {
          if (
            !item.hide &
            (item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.content.toLowerCase().includes(search.toLowerCase()))
          ) {
            return <CardWrap key={index} id={index} title={item.title} />;
          }
          return null; // Ensures no rendering for non-matching items.
        })}
      </Box>
    </div>
  );
};

export default Home;
