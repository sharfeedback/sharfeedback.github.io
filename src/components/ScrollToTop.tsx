import React, { useEffect } from 'react';
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // Empty dependency array to run only on mount
  return null; // This component doesn't render anything
};

export default ScrollToTop;