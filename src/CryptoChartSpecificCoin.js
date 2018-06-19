import React from 'react';
import $ from "jquery";

import CryptoChart from './CryptoChart';

class CryptoChartSpecificCoin extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: []}
  }

  render(){
    return (
      <CryptoChart {...this.props} data={this.state.data}/>
    )
  }

  componentDidMount(){
    const url = 'https://j8xyoalc6l.execute-api.us-east-2.amazonaws.com/dev/cryptoGetData_RDS';
    const pastHours = 24*(this.props.days||1);

    const params = {
      coinID: this.props.coin,
      from: new Date(Date.now() - pastHours*60*60 * 1000).toISOString(),
      to: new Date().toISOString(),
      unixEpochTimestamp: "true"
    };

    $.getJSON(url, params, (data) => {
      const parsedData = [];

      for (const entry of data) {
        parsedData.push([entry.timestamp, entry.priceUSD]);
      }
      if (parsedData.length === 0)
      console.log(`No datapoints for ${this.props.coin}`)

      this.setState({data: parsedData})
    });
  }
}

export default CryptoChartSpecificCoin;
