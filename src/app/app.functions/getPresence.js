const hubspot = require("@hubspot/api-client");

exports.main = getPresence = async (context = {}, sendResponse) => {
  const { presence, hs_object_id } = context.propertiesToSend;

  if (!presence || presence == "") {
    sendResponse([]);
  }
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.PRIVATE_APP_ACCESS_TOKEN,
  });

  console.log({ presence });
  const array = presence.split("\n");
  const presentUsers = [];
  for (const line of array) {
    console.log({ line });
    if (!line.includes("userId")) {
      continue;
    }

    const p = line.replace("userId=", "").replace("timestamp=", "");
    console.log({ p });
    const [userId, timestamp] = p.split(",");
    console.log({ userId });
    console.log({ timestamp });
    if (Date.now() - timestamp < 10000) {
      const res = await hubspotClient.settings.users.usersApi.getById(
        userId,
        undefined,
      );
      presentUsers.push(res.email || userId);
    }
  }

  sendResponse(presentUsers);
};
