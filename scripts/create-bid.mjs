import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env["ACCESS_TOKEN"] });

const objectType = "p_bids";

const properties = {
  amount: "20543",
};

const associations = [];

const apiResponse = await hubspotClient.crm.objects.basicApi.create(
  objectType,
  { properties: properties, associations: associations },
);
console.log(JSON.stringify(apiResponse));
