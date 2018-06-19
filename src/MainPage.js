import React from 'react';

import CryptoChartSpecificCoin from './CryptoChartSpecificCoin';
import CryptoPortfolioBuilder from './CryptoPortfolioBuilder';

class MainPage extends React.Component {

  render() {
    if (this.getParam("coins")) {

      var allColors = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
      '#492970', '#f28f43', '#77a1e5', '#000000', '#a6c96a','#DC143C']
      var colorIndex = 0;

      const charts = this.getCoinsArray().map((coin) => {
        colorIndex++;
        if (colorIndex===allColors.length)
        colorIndex=0;

        return (
          <CryptoChartSpecificCoin key={coin} title={coin} coin={coin} days="7" color={allColors[colorIndex]}/>
        )

      })

      return (
        <div>
          {charts}
        </div>
      );

    }

    if(this.getParam("portfolio")) {
      return (
        <CryptoPortfolioBuilder title="ripple" coin="ripple" days="7" />
      )
    }


    return (
      <div>
        <CryptoChartSpecificCoin title="Litecoin" coin="litecoin" days="100"/>
        <CryptoChartSpecificCoin title="Ripple" coin="ripple" days="2"/>
        <CryptoChartSpecificCoin title="Bitcoin" coin="bitcoin"/>
        <CryptoChartSpecificCoin title="Ethereum" coin="ethereum"/>
        <CryptoChartSpecificCoin title="NOTACOIN" coin="NOTACOIN"/>

      </div>
    );
  }

  getCoinsArray(){
    const coins = this.getParam("coins").split(",")
    console.log(coins)
    return coins
  }

  componentDidMount(){
    console.log(this.constructor.name+" did mount")
  }

  getParam(queryParameter){
    const paramsString = window.location.search.split("?")[1]||""

    const params = {}

    for (const paramString of paramsString.split("&")){
      const paramStringSplit = paramString.split("=")
      params[paramStringSplit[0]] = paramStringSplit[1]
    }

    return params[queryParameter];
  }
}

export default MainPage;
