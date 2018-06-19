import React from 'react';
import $ from "jquery";

import './CryptoPortfolioBuilder.css';

import CryptoChart from './CryptoChart';

//temporarily hear to build the main portfolio page
import CryptoChartSpecificCoin from './CryptoChartSpecificCoin';


class CryptoPortfolioBuilder extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="mainPortfolioChart">
        <CryptoChartSpecificCoin title="Crypto Portfolio" coin="ripple" days="2"/>
      </div>
    )
  }

  componentDidMount(){

  }
}

export default CryptoPortfolioBuilder;
