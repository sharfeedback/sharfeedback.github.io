// import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { useData } from "./DataContent";
import { useAppBarTitle } from "./ButtonAppBar";
import React, { useState, useRef } from "react";
const MarkdownPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTitle } = useAppBarTitle();
  const { data, loading, error } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const highlightedRefs = useRef([]);

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    highlightedRefs.current = []; // Clear refs before rendering
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          ref={(el) => highlightedRefs.current.push("1")}
          style={{
            backgroundColor: currentIndex === highlightedRefs.current.length ? "orange" : "yellow",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleNext = () => {
    if (highlightedRefs.current.length === 0) return;
    const nextIndex = (currentIndex + 1) % highlightedRefs.current.length;
    setCurrentIndex(nextIndex);
    scrollToResult(nextIndex);
  };

  const handlePrevious = () => {
    if (highlightedRefs.current.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + highlightedRefs.current.length) % highlightedRefs.current.length;
    setCurrentIndex(prevIndex);
    scrollToResult(prevIndex);
  };

  const scrollToResult = (index) => {
    highlightedRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const content = data[id]?.content || "Content not found.";
  setTitle(data[id]?.title);

  // Custom renderer for links
  const renderer = {
    link(href, title, text) {
      if (href.href.startsWith("myapp://")) {
        const targetTitle = href.href.replace("myapp://", "");
        return `<span style="color:hotpink;" class="custom-link" data-target="${targetTitle}">${href.text}</span>`;
      }
      return `<a href="${href}" title="${title || ''}">${text}</a>`;
    },
  };

  // Integrate renderer with marked
  marked.use({ renderer });

  const handleLinkClick = (event) => {
    const target = event.target;
    if (target.classList.contains("custom-link")) {
      const targetTitle = target.getAttribute("data-target");
      const targetIndex = data.findIndex((item) => item.title === targetTitle);
      if (targetIndex !== -1) {
        navigate(`/content/${targetIndex}`);
      } else {
        alert("Target not found.");
      }
    }
  };

  return (
    <div
      style={{ padding: "20px", minWidth: "80%", wordWrap: "break-word" }}
      onClick={handleLinkClick}
      // dangerouslySetInnerHTML={{ __html: marked(content) }}
    >
 <div>
    
     {/*
       <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentIndex(-1); // Reset index when search changes
        }}
      />
     {<div style={{ marginTop: "10px", border: "1px solid black", padding: "10px", height: "200px", overflow: "auto" }}>
        {getHighlightedText(content, searchTerm)}
      </div>}
 */}
      { <div
      style={{ padding: "20px", minWidth: "80%", wordWrap: "break-word" }}
      onClick={handleLinkClick}
      dangerouslySetInnerHTML={{ __html: getHighlightedText(marked(content), searchTerm) }}
    ></div> }
      {/* <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrevious} disabled={!highlightedRefs.current.length}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!highlightedRefs.current.length}>
          Next
        </button>
      </div> */}
      {highlightedRefs.current.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          Match {currentIndex + 1} of {highlightedRefs.current.length}
        </div>
      )}
    </div>


    </div>
  );
};

export default MarkdownPage;
