exports.main = getRemainingTime = (context = {}, sendResponse) => {
  const { end_time } = context.propertiesToSend;
  const endDate = Date.parse(end_time);

  const diff_seconds = Math.round((endDate - Date.now()) / 1000);
  sendResponse(diff_seconds > 0 ? diff_seconds : 0);
};
