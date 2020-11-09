exports.formatResponse = (id, result) => {
  const updatedResult = [...result];
  const formattedResult = {
    [id]: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
  };
  updatedResult.forEach((response) => {
    formattedResult[id][response.dayOfWeek].push(response);
  });
  return formattedResult;
};
