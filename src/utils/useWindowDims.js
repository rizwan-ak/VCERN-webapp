import React, { useEffect, useState } from "react";

export function useWindowDims() {
  // Initialize state with undefined width/height so server and client renders match

  const [windowDims, setWindowDims] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowDims((prev) => ({
      ...prev,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  const handleChanges = () => {
    handleResize();
  };

  useEffect(() => {
    window.addEventListener("resize", handleChanges);

    handleChanges();

    return () => {
      window.removeEventListener("resize", handleChanges);
    };
  }, []);

  return windowDims;
}
