const hubspot = require("@hubspot/api-client");

exports.main = establishPresence = (context = {}, sendResponse) => {
  const { presence, hs_object_id } = context.propertiesToSend;
  const userId = context.parameters.userId;
  const newRecord = "userId=" + userId + ",timestamp=" + Date.now();

  let newPresence = presence;
  if (presence && presence.includes(userId)) {
    // presence record already established. Update timestamp
    newPresence = presence.replace(new RegExp("userId=" + userId + ",timestamp=[0-9]+"), newRecord);
  } else {
    newPresence = (presence || "") + "\n" + newRecord;
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env["PRIVATE_APP_ACCESS_TOKEN"] });

  const properties = {
    "presence": newPresence

  };
  const SimplePublicObjectInput = { properties };
  const objectType = "auctions";
  const objectId = hs_object_id;
  const idProperty = undefined;

  hubspotClient.crm.objects.basicApi.update(objectType, objectId, SimplePublicObjectInput, idProperty).then(res => {
    sendResponse(res);
  }).catch(err => {
    console.error(err);
    sendResponse(err);
  });
};
