const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  let start = Date.parse(context.parameters.start);
  let end = Date.parse(context.parameters.end);

  const hubspotClient = new hubspot.Client({
    accessToken: process.env["PRIVATE_APP_ACCESS_TOKEN"],
  });

  const objectType = "p_auctions";

  const ownerApiResponse = await hubspotClient.crm.owners.ownersApi.getById(
    context.parameters.creatorUserId,
    "userId",
  );

  console.dir(context);
  let now = new Date();
  const properties = {
    name:
      context.propertiesToSend.name +
      " @ $" +
      context.parameters.saleMinimum +
      " starting " +
      context.parameters.start,
    start_time: start,
    end_time: end,
    state: "inactive",
    minimum_required_bids: context.parameters.minBids,
    sale_minimum: context.parameters.saleMinimum,
    hubspot_owner_id: ownerApiResponse.id,
  };

  console.dir(context);
  const associations = [
    {
      to: { id: context.propertiesToSend.hs_object_id },
      types: [
        {
          associationCategory: "USER_DEFINED",
          associationTypeId: "112",
        },
      ],
    },
  ];

  const apiResponse = await hubspotClient.crm.objects.basicApi.create(
    objectType,
    { properties: properties, associations: associations },
  );

  console.dir(apiResponse);
  try {
    sendResponse(apiResponse);
  } catch (error) {
    sendResponse(error);
  }
};
