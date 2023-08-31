import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env["ACCESS_TOKEN"] });

const fromObjectType = "p_bids";
const toObjectType = "contacts";

const apiResponse =
  await hubspotClient.crm.associations.v4.schema.definitionsApi.getAll(
    fromObjectType,
    toObjectType,
  );
console.log(JSON.stringify(apiResponse));
