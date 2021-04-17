exports.formatResponse = (id, result, startDate) => {
  let startDayOfWeek=new Date(startDate).getDay();
  const updatedResult = [...result];
  const formattedResult = {[id]: {},};
  for(let i=0;i<5; i+=1){
    if(startDayOfWeek+i===7){
      startDayOfWeek=-1;
    }
    formattedResult[id][startDayOfWeek+i]=[];
   
  }
  updatedResult.forEach((response) => {
    formattedResult[id][response.dayOfWeek].push(response);
  });
  return formattedResult;
};
