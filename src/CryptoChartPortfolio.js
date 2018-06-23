import React from 'react';
import $ from "jquery";

import CryptoChart from './CryptoChart';

import CryptoChartSpecificCoin from './CryptoChartSpecificCoin';

class CryptoChartPortfolio extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: []}
  }

  render(){
    return (
      <CryptoChartSpecificCoin title="Crypto Portfolio" coin="ripple" days="2"/>
    )
  }

  componentDidMount(){

  }
}

export default CryptoChartPortfolio;
