import {useState, useEffect, createContext} from 'react';
import {cloudfrontUrl} from '../defs/urls';
const Buffer = require('buffer').Buffer;

export const useImageUrl = (sourceUrl = '', size = {width: 800} as any) => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  const imageRequest = JSON.stringify({
    bucket: 'cp-aws-assets',
    key: sourceUrl,
    edits: {
      resize: {
        // width: 800,
        // height: 800,
        fit: 'contain',
        ...size,
      },
    },
  });

  const requestData = Buffer.from(imageRequest).toString('base64');

  const imageUrl = `${cloudfrontUrl}${requestData}`;

  return {
    imageUrl,
  };
};