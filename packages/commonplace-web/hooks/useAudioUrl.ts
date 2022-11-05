import { s3Url } from "commonplace-utilities/lib/def/urls";

export const useAudioUrl = (sourceUrl = "") => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  // const audioRequest = JSON.stringify({
  //   bucket: "cp-aws-assets",
  //   key: sourceUrl,
  //   // edits: {
  //   //   resize: {
  //   //     // width: 800,
  //   //     // height: 800,
  //   //     fit: "contain",
  //   //     ...size,
  //   //   },
  //   // },
  // });

  // const requestData = Buffer.from(audioRequest).toString("base64");

  const audioUrl = `${s3Url}${sourceUrl}`;

  // console.info("sourceUrl", audioUrl);

  return {
    audioUrl,
  };
};
