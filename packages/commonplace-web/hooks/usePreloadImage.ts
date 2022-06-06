import React, { useState, useEffect, createContext } from "react";

export const usePreloadImage = (url = "") => {
  const [json, setJson] = useState({});

  useEffect(() => {
    console.info("Preload Image", url);
    var img = new Image();
    img.src = url;

    setJson({ url });
  }, []);

  return {
    json,
  };
};
