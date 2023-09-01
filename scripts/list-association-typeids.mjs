import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env["ACCESS_TOKEN"] });

const fromObjectType = "bids";
const toObjectType = "auctions";

const apiResponse =
  await hubspotClient.crm.associations.v4.schema.definitionsApi.getAll(
    fromObjectType,
    toObjectType,
  );
console.log(JSON.stringify(apiResponse));
