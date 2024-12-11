import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
// import data from "../data/data.json";
import { useData } from "./DataContent";

import { useAppBarTitle } from './ButtonAppBar';

const MarkdownPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTitle } = useAppBarTitle();
  const { data, loading, error } = useData();
  const content = data[id]?.content || "Content not found.";
  setTitle(data[id]?.title)
  // Custom renderer for links
  let titles = []
  data.forEach(element => {
    titles.push(element.title)
  });

  let formatcontent = formatContent(content, titles)
  
  function formatContent(content, wordList) {
    // Sort the word list by length in descending order
    const sortedList = wordList.sort((a, b) => b.length - a.length);
  
    // Build the regex to find and replace the words/phrases
    const regex = new RegExp(
      sortedList.map((word) => `(?<!\\[)${word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?!\\]\\(myapp://)`).join("|"),
      "g"
    );
  
    // Replace matches with the desired format
    return content.replace(regex, (match) => `[${match}](<myapp://${match}>)`);
  }

  const renderer = {
    link(href, title, text) {
      if (href.href.startsWith("myapp://")) {
        const targetTitle = href.href.replace("myapp://", "");
        return `<a href="" onclick="navigateTo('${targetTitle}')">${href.text}</a>`;
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
    <div style={{ padding: "20px", minWidth:"80%", wordWrap: "break-word" }}>
      <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );

};

export default MarkdownPage;
