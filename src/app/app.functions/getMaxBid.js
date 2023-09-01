const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  const PRIVATE_APP_TOKEN = process.env["PRIVATE_APP_ACCESS_TOKEN"];
  const hubspotClient = new hubspot.Client({ accessToken: PRIVATE_APP_TOKEN });

  const { start_time, end_time, hs_object_id } = context.propertiesToSend;
  const { bid, userId } = context.parameters;

  console.log({ context });
  console.log("Test");
  console.log(bid);
  console.log(userId);
  console.log(hs_object_id);

const objectType = "auctions";
const objectId = hs_object_id;
const toObjectType = "p_bids";
const after = undefined;
const limit = 500;

const apiResponse = await hubspotClient.crm.objects.associationsApi.getAll(
  objectType,
  objectId,
  toObjectType,
  after,
  limit,
);
const batch = {
  properties: ["id", "name"],
  inputs: apiResponse.results.map((r) => {
    return { id: r.id };
  }),
};

const res = await hubspotClient.crm.objects.batchApi.read("p_bids", batch);
console.log("Get max bid function");
console.log(JSON.stringify(res));

};
