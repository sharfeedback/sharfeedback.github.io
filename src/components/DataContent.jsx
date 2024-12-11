// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setData(JSON.parse(localStorage.getItem('json')) || []);
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/672ef713e41b4d34e4512c01?meta=false");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const json = await response.json();
        localStorage.setItem('json', JSON.stringify(json));
        
        setData(json);
      } catch (err) {
        setData(JSON.parse(localStorage.getItem('json')) || []);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for easy access to context
export const useData = () => useContext(DataContext);
