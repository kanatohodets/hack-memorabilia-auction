import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env["ACCESS_TOKEN"] });

const objectType = "p_items";

let now = new Date();
const properties = {
  name: "TEST AUCTION",
  image_url: "https://fanatics.frgimages.com/philadelphia-phillies/bryce-harper-philadelphia-phillies-autographed-baseball_ss5_p-4752021+pv-1+u-xbspjrztttgj3vpvgxuc+v-rhkgjys42zqupmajqobv.jpg?_hv=2&w=900"
  //start_time: start,
  //end_time: end,
  //minimum_required_bids: context.parameters.minBids,
  //sale_minimum: context.parameters.minSalePrice,
};

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
