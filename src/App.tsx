import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import MarkdownPage from "./components/MarkdownPage";
import data from "./data/data.json";

const App = () => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      !item.hide && item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div style={{ padding: "20px", width: "80%"}}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar value={search} onChange={setSearch} />
                {filteredData.map((item, index) => (
                  <Card key={index} id={index} title={item.title} />
                ))}
              </>
            }
          />
          <Route path="/content/:id" element={<MarkdownPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
