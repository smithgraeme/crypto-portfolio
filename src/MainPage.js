import React from 'react';

import CryptoPortfolioBuilder from './CryptoPortfolioBuilder';

class MainPage extends React.Component {

  render() {
    console.log("portfolio parameter: " + this.getParam("portfolio"));

    return (
      <CryptoPortfolioBuilder/>
    )
  }

  componentDidMount(){
    console.log(this.constructor.name+" did mount")
  }

  getParam(queryParameter){
    console.log("Getting query parameter: " + queryParameter);

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
