export default class Helpers {
  constructor() {}

  isDefinedWithContent(item) {
    if (typeof item !== "undefined" && item && item !== "" && item !== null) {
      if (item.constructor === Array && item.length > 0) {
        return true;
      } else if (item.constructor === Array && item.length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
