import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env["ACCESS_TOKEN"] });

const inputs = [
    { id: '8498290957' }, { id: '8499044128' },
    { id: '8499134041' }, { id: '8499205025' },
    { id: '8499207596' }, { id: '8499353670' },
    { id: '8499409786' }, { id: '8499529386' },
    { id: '8499640736' }, { id: '8499643276' },
    { id: '8499902476' }, { id: '8499934217' },
    { id: '8499968693' }, { id: '8499968913' },
    { id: '8500006411' }, { id: '8500050539' },
    { id: '8500271696' }, { id: '8500410240' },
    { id: '8500457786' }, { id: '8500493217' },
    { id: '8500502164' }, { id: '8500522679' },
    { id: '8501281026' }
];

const batch = { properties: ["amount"], propertiesWithHistory: [], inputs: inputs };

const apiResponse = await hubspotClient.crm.objects.batchApi.read("p_bids", batch);
console.log(JSON.stringify(apiResponse));
