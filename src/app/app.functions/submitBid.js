const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  const PRIVATE_APP_TOKEN = process.env["PRIVATE_APP_ACCESS_TOKEN"];
  const hubspotClient = new hubspot.Client({ accessToken: PRIVATE_APP_TOKEN });

  const { start_time, end_time, hs_object_id } = context.propertiesToSend;
  const { bid, userId } = context.parameters;

  const properties = {
    amount: bid,
  };

  const associations = [
    {
      to: { id: hs_object_id},
      types: [
        {
          associationCategory: "USER_DEFINED",
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
