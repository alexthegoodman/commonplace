import { s3Url } from "../def/urls";

export const useVideoUrl = (sourceUrl = "") => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  // const videoRequest = JSON.stringify({
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

  // const requestData = Buffer.from(videoRequest).toString("base64");

  const videoUrl = `${s3Url}${sourceUrl}`;

  return {
    videoUrl,
  };
};
