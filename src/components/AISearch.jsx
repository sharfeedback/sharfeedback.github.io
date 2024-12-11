import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { marked } from "marked";
// import data from "../data/data.json";
import { useData } from "./DataContent";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useAppBarTitle } from './ButtonAppBar';
import { Button } from "@mui/material";

const AISearch = () => {
  const { setTitle } = useAppBarTitle();
  const { data, loading, error } = useData();
  const [searchGem, setSearchgem] = useState("");
  const [loadingGem, setLoading] = React.useState(false);
  // setLoading(true);
  setTitle("Gemini")
  // Custom renderer for links


  // Expose navigateTo to the global scope for onclick events
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA7rt2dOm5I419SKExn-TdHtYKQthnkFbM"
  );

  const [promptResponses, setpromptResponses] = useState([]);

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

  const getResponseForGivenPrompt = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
      const context_search = "Use only the below data to answer the question. Here is the data " + JSON.stringify(data) + "and here is the question: " + searchGem + ". Try to include the titles from which you got this answer at the end";
      const result = await model.generateContent(context_search);
      const response = await result.response;
      const text = await response.text();
      let titles = []
      data.forEach(element => {
        titles.push(element.title)
      });

      let newtext = formatContent(text, titles)
      // setpromptResponses([])

      setpromptResponses([newtext]);
      setPromptResp(newtext)
      setLoading(false);
    } catch (error) {
      setpromptResponses("Something went wrong");
      setLoading(false);
     
    }
  };
  const navigate = useNavigate();

  const navigateTo = (targetTitle) => {
    const targetIndex = data.findIndex((item) => item.title === targetTitle);
    if (targetIndex !== -1) {
      navigate(`/content/${targetIndex}`);
    } else {
      alert("Target not found.");
    }
  };
  window.navigateTo = navigateTo;
  const location = useLocation()
  const [promptResp, setPromptResp] = useLocalStorage("promptResp", "");
  // setpromptResponses([...promptResponses, promptResp]);
  useEffect(() => {
    // setPromptResp(promptResp)
    setpromptResponses([])
    setpromptResponses([...promptResponses, promptResp])
  }, [location])

  const renderer = {
    link(href, title, text) {
      if (href.href.startsWith("myapp://")) {
        const targetTitle = href.href.replace("myapp://", "");
        return `<a href="" onclick="navigateTo('${targetTitle}')">${href.text}</a>`;
      }
      return `<a href="${href}" title="${title || ''}">xsss${text}</a>`;
    },
  };

  marked.use({ renderer });
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };
   return (
    <div style={{ padding: "20px", minWidth:"80%", wordWrap: "break-word" }}>
     <Box >
          <SearchBar value={searchGem} onChange={setSearchgem} />
          <div className="col-auto">
        <Button onClick={getResponseForGivenPrompt} className="btn btn-primary">Send</Button>
        {loadingGem &&
        <CircularProgress /> }
      </div>

          {promptResponses.map((promptResponse, index) => (
             <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: marked(promptResponse) }} />
          ))}
        </Box>
    </div>
  );

};

export default AISearch;
