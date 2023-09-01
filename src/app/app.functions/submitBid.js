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
    amount: bid,
  };

  const associations = [
    {
      to: { id: "8467752480"},
      types: [
        {
          associationCategory: "USER_DEFINED",
          // 112 is the value for the 'item being auctioned' label when read FROM
          // auctions TO items.
          associationTypeId: "148",
        },
      ],
    },
  ];

  const SimplePublicObjectInputForCreate = {
    properties: properties,
    associations: associations
  };
  const objectType = "p_bids";
  try {
    const apiResponse = await hubspotClient.crm.objects.basicApi.create(
      objectType,
      {
        properties: properties,
        associations: associations
      },
    );
    console.dir(apiResponse);

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
