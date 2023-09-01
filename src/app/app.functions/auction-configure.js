const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  let start = Date.parse(context.parameters.start);
  let end = Date.parse(context.parameters.end);

  const hubspotClient = new hubspot.Client({ accessToken: process.env["ACCESS_TOKEN"] });

  const objectType = "p_auctions";

  let now = new Date();
  const properties = {
    name: "SERVERLESS TEST AUCTION", //context.propertiesToSend.name + " auction " + context.parameters.start + "-" + context.parameters.end,
    /*
    start_time: start,
    end_time: end,
    minimum_required_bids: context.parameters.minBids,
    sale_minimum: context.parameters.minSalePrice,
    */
  };

  /*
  const associations = [{to: {id: context.propertiesToSend.hs_object_id},
    types:[{
      associationCategory:"USER_DEFINED",
      associationTypeId:"112"
    }]
  }];
  */

  const associations = [
    {
      to: { id: "8449029453" },
      types: [
        {
          associationCategory: "USER_DEFINED",
          // 112 is the value for the 'item being auctioned' label when read FROM
          // auctions TO items.
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
