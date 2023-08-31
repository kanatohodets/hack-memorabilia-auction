const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  const PRIVATE_APP_TOKEN = process.env["PRIVATE_APP_ACCESS_TOKEN"];
  const hubspotClient = new hubspot.Client({ accessToken: PRIVATE_APP_TOKEN });

  const { start_time, end_time, hs_object_id } = context.propertiesToSend;
  const { bid, userId } = context.parameters;

  const currentDate = new Date();
  const timestamp = currentDate.getTime;

  console.log({ context });
  console.log("Test");
  console.log(bid);
  console.log(userId);
  console.log(hs_object_id);

  const properties = {
    bid_id: 21,
    amount: Number(bid),
  };

  const SimplePublicObjectInputForCreate = {
    properties,
    associations: [
      {
        to: { id: userId },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 118 },
        ],
      },
      {
        to: { id: hs_object_id },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 110 },
        ],
      },
      {
        to: { id: userId },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 115 },
        ],
      },
      {
        to: { id: hs_object_id },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 108 },
        ],
      },
    ],
  };
  const objectType = "bids";
  try {
    const apiResponse = await hubspotClient.crm.objects.basicApi.create(
      objectType,
      SimplePublicObjectInputForCreate,
    );
    console.log(JSON.stringify(apiResponse, null, 2));

    // const fromObjectType = "bids";
    // const fromObjectId = apiResponse.properties.hs_object_id;
    // const toObjectType = "auctions";
    // const toObjectId = hs_object_id;

    // console.log(fromObjectId);
    // console.log(fromObjectType);
    // console.log(toObjectType);
    // console.log(toObjectId);

    // try {
    //   const apiResponse =
    //     await hubspotClient.crm.associations.v4.basicApi.createDefault(
    //       fromObjectType,
    //       fromObjectId,
    //       toObjectType,
    //       toObjectId,
    //     );
    //   console.log(JSON.stringify(apiResponse, null, 118));
    // } catch (e) {
    //   e.message === "HTTP request failed"
    //     ? console.error(JSON.stringify(e.response, null, 118))
    //     : console.error(e);
    // }

    const ret = "Submitted bid successfully!";

    try {
      sendResponse(ret);
    } catch (error) {
      sendResponse(error);
    }
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};
