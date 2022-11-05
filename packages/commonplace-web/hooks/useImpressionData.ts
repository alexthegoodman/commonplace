import * as impressionsData from "commonplace-utilities/lib/def/impressions";

export const useImpressionData = (impression) => {
  const categoryData = impressionsData.default.filter(
    (category) =>
      category.list.filter((item) => item.content === impression.content)[0]
  )[0];

  //   console.info("categoryData", categoryData);

  let impressionData;
  if (typeof categoryData !== "undefined") {
    impressionData = categoryData.list.filter(
      (item) => item.content === impression.content
    )[0];
  } else {
    impressionData = {
      content: impression.content,
      color: "#8446ff",
    };
  }

  return impressionData;
};
