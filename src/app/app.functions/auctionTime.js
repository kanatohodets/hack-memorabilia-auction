const hubspot = require("@hubspot/api-client");

exports.main = getRemainingTime = (context = {}, sendResponse) => {
  const hubspotClient = new hubspot.Client({ accessToken: process.env.PRIVATE_APP_ACCESS_TOKEN });

  const { hs_object_id } = context.propertiesToSend;

  const objectType = "Auction";
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;
  const idProperty = undefined;

  try {
    hubspotClient.crm.objects.basicApi.getById(objectType, hs_object_id, properties, propertiesWithHistory, associations, archived, idProperty).then(apiResponse => {
      console.log(JSON.stringify(apiResponse, null, 2));
      sendResponse(10000);
    })

  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
      sendResponse(3000);
  }

};
