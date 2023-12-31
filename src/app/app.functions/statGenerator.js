const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  const PRIVATE_APP_TOKEN = process.env["PRIVATE_APP_ACCESS_TOKEN"];
  const client = new hubspot.Client({ accessToken: PRIVATE_APP_TOKEN });

  const { hs_object_id } = context.propertiesToSend;

  let foo = await client.crm.objects.basicApi.getPage(
    "2-16772576",
    undefined,
    undefined,
    ["bats", "throws", "height", "weight", "birthYear", "birthMonth"],
  );
  foo.results.map((result) => {
    console.log(result.properties);
  });

  const ret = `This is coming from a serverless function!`;
  try {
    sendResponse(ret);
  } catch (error) {
    sendResponse(error);
  }
};
