import React from 'react';
import $ from "jquery";

import CryptoChart from './CryptoChart';

class CryptoChartPortfolio extends React.Component {
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

  }
}

export default CryptoChartPortfolio;
