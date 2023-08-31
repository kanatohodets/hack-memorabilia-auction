const getRemainingTime = async (hubspotClient, playerId) => {
  const BatchInputPublicFetchAssociationsBatchRequest = { inputs: [{"id": playerId }] };
  const fromObjectType = "Player";
  const toObjectType = "Item";

  try {
    const apiResponse = await hubspotClient.crm.associations.v4.batchApi.getPage(fromObjectType, toObjectType, BatchInputPublicFetchAssociationsBatchRequest);
    console.log(JSON.stringify(apiResponse, null, 2));
    return 10;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
      return 0;
  }

};

export default {
  getRemainingTime
}
