import $ from "jquery";

let dataCache = {}

function getCryptoData(params,callback){
  const url = 'https://j8xyoalc6l.execute-api.us-east-2.amazonaws.com/dev/cryptoGetData_RDS';
  const pastHours = 24*(7);

  const queryParams = {
    coinID: params.coinIdentifier,
    from: new Date(Date.now() - pastHours*60*60 * 1000).toISOString(),
    to: new Date().toISOString(),
    unixEpochTimestamp: "true"
  };

  const cacheID = params.coinIdentifier;
  const cachedCopy = dataCache[cacheID];
  //
  // console.log(cacheID);
  // console.log(dataCache);

  if (cachedCopy) {

    console.log("Returning cached copy");
    callback(cachedCopy);

  }else{

    $.getJSON(url, queryParams, (data) => {
      const parsedData = [];

      for (const entry of data) {
        parsedData.push([entry.timestamp, entry.priceUSD]);
      }

      dataCache[cacheID] = parsedData;

      callback(parsedData);
    });

  }
}

export default getCryptoData
