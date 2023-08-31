const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  console.log("wharblgarbl", context);
  const ret = `This is coming from a serverless function!`;
  try {
    sendResponse(ret);
  } catch (error) {
    sendResponse(error);
  }
};
