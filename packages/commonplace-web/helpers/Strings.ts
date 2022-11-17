export default class Strings {
  constructor() {}

  getPostUrl(post) {
    let slug1 = post?.interest?.generatedInterestSlug;
    slug1 = typeof slug1 !== "undefined" ? slug1.toLowerCase() : slug1;
    let slug2 = post?.generatedTitleSlug;
    // slug2 = typeof slug2 !== "undefined" ? slug2.toLowerCase() : slug2;

    const postUrl = "/post/" + slug1 + "/" + slug2;

    return postUrl;
  }
}
