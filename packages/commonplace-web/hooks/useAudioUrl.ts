import React, { useState, useEffect, createContext } from "react";
import { cloudfrontUrl } from "../def/urls";

export const useAudioUrl = (sourceUrl = "") => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  const audioRequest = JSON.stringify({
    bucket: "cp-aws-assets",
    key: sourceUrl,
    // edits: {
    //   resize: {
    //     // width: 800,
    //     // height: 800,
    //     fit: "contain",
    //     ...size,
    //   },
    // },
  });

  const requestData = Buffer.from(audioRequest).toString("base64");

  const audioUrl = `${cloudfrontUrl}/${requestData}`;

  return {
    audioUrl,
  };
};
