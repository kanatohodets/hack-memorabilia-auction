import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env['ACCESS_TOKEN'] });

const objectType = "2-18114550";
const objectId = "8454099551";
const toObjectType = "p_auctions";
const after = undefined;
const limit = 500;

const apiResponse = await hubspotClient.crm.objects.associationsApi.getAll(objectType, objectId, toObjectType, after, limit);
const batch = {
  properties: ["id", "name"],
  inputs: apiResponse.results.map((r) => { return { 'id': r.id } })
};

const res = await hubspotClient.crm.objects.batchApi.read("p_auctions", batch);
console.log(JSON.stringify(res));
