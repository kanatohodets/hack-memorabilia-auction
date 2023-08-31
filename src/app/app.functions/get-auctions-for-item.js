const hubspot = require("@hubspot/api-client");

// get all auctions associated with this item, return them
exports.main = async (context = {}, sendResponse) => {
  const hubspotClient = new hubspot.Client({ "accessToken": process.env['PRIVATE_APP_ACCESS_TOKEN'] })

  const objectType = "p_items";
  const objectId = context.propertiesToSend.hs_object_id;
  const toObjectType = "p_auctions";
  const after = undefined;
  const limit = 500;

  const associationsFetch = await hubspotClient.crm.objects.associationsApi.getAll(objectType, objectId, toObjectType, after, limit);
  const batch = {
    properties: ["id", "name", "state"],
    inputs: associationsFetch.results.map((r) => { return { 'id': r.id } })
  };

  const auctionsFetch = await hubspotClient.crm.objects.batchApi.read("p_auctions", batch);

  try {
    sendResponse(auctionsFetch.results);
  } catch (error) {
    sendResponse(error);
  }
};
