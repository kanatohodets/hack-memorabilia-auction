const hubspot = require('@hubspot/api-client')
const { getRemainingTime } = require("auctionTime.js")

exports.main = async (context = {}, sendResponse) => {
  const PRIVATE_APP_TOKEN = process.env['PRIVATE_APP_ACCESS_TOKEN'];
  const client = new hubspot.Client({ accessToken: PRIVATE_APP_TOKEN });

  const { hs_object_id } = context.propertiesToSend['hs_object_id'];
  const { state } = context.propertiesToSend['state'];

  const { bid } = context.parameters['bid'];
  const { userId } = context.parameters['userId'];

  const remainingTime = getRemainingTime(client, hs_object_id)
  console.log({remainingTime});

  let foo = await client.crm.objects.basicApi.getPage("2-16772576", undefined, undefined, ['bats', 'throws', 'height', 'weight', 'birthYear', 'birthMonth'])
  foo.results.map(result => { console.log(result.properties) } );

  const ret = `This is coming from a serverless function!`;
  try {
    sendResponse(ret);
  } catch (error) {
    sendResponse(error);
  }
};
