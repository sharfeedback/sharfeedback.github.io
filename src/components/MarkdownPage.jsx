import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
import data from "../data/data.json";

const MarkdownPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = data[id]?.content || "Content not found.";

  // Custom renderer for links
  const renderer = {
    link(href, title, text) {
      console.log(href.href)
      if (href.href.startsWith("myapp://")) {
        const targetTitle = href.href.replace("myapp://", "");
        return `<a href="#" onclick="navigateTo('${targetTitle}')">${href.text}</a>`;
      }
      return `<a href="${href}" title="${title || ''}">xsss${text}</a>`;
    },
  };

  // Integrate renderer with marked
  marked.use({ renderer });

  // Handle custom navigation
  const navigateTo = (targetTitle) => {
    const targetIndex = data.findIndex((item) => item.title === targetTitle);
    if (targetIndex !== -1) {
      navigate(`/content/${targetIndex}`);
    } else {
      alert("Target not found.");
    }
  };

  // Expose navigateTo to the global scope for onclick events
  window.navigateTo = navigateTo;

   return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Home
      </button>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );

};

export default MarkdownPage;
