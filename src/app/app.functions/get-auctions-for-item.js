const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  console.log("get auctions for item", context);
  const ret = `get auctions for item`;
  try {
    sendResponse(ret);
  } catch (error) {
    sendResponse(error);
  }
};
