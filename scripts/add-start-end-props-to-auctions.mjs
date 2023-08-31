import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env['ACCESS_TOKEN'] });


const PropertyUpdate = { 
  label: "End Time", 
  type: "datetime",
  fieldType: "date", 
  groupName: "auctions_information", 
  displayOrder: 2, 
  hidden: false 
};

const objectType = "p_auctions";
const propertyName = "end_time";

try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.update(objectType, propertyName, PropertyUpdate);
    console.log(JSON.stringify(apiResponse, null, 2));
} catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
}
