import React, {Component} from 'react';
import $ from "jquery";

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {Button} from 'react-bootstrap';
import * as BS from 'react-bootstrap';

import './CryptoPortfolioBuilder.css';

import CryptoChartPortfolio from './CryptoChartPortfolio';
import CryptoChartSparkline from './CryptoChartSparkline';

import getCryptoData from './DataProvider';

import rootReducer from './reducers'

const store = createStore(rootReducer);

class CryptoPortfolioBuilder extends Component {
  constructor(props){
    super(props)

    this.state = {
      coinList: [],
      displayCount: 50,
      inPortfolio: [],
      portfolioOverviewDataEachCoin: {},
    }

    this.handleClickAddPortfolioButton = this.handleClickAddPortfolioButton.bind(this);
  }

  render(){
    console.log("Render CryptoPortfolioBuilder")

    const data = this.getPortfolioOverviewData();
    console.log(data)

    var shouldRenderChart = (this.state.inPortfolio.length > 0) && (data !== null);

    var chart = null;
    if (shouldRenderChart) {
      chart = <CryptoChartPortfolio data={data}/>
    }

    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="mainPortfolioChart">
            {chart}
          </div>
          <PortfolioCoinList {...this.state} onClickAddToPortfolio={this.handleClickAddPortfolioButton}/>
        </React.Fragment>
      </Provider>
    )
  }

  componentDidMount(){
    const url = 'https://j8xyoalc6l.execute-api.us-east-2.amazonaws.com/dev/coins';

    $.getJSON(url, (data) => {
      // console.log("API call from CryptoPortfolioBuilder to get default coin list done")
      this.setState({coinList: data})
    });
  }

  componentDidUpdate() {
    console.log("Updated CryptoPortfolioBuilder")

    for (let coin of this.state.inPortfolio) {

      if (!this.state.portfolioOverviewDataEachCoin[coin]) {
        console.log("No data found for "+coin)

        getCryptoData({coinIdentifier: coin},(data) => this.setState(
          {
            portfolioOverviewDataEachCoin: {
              ...this.state.portfolioOverviewDataEachCoin,
              [coin]: data
            }
          }
        ))
      }
    }
  }

  getPortfolioOverviewData(){
    var summaryData = null

    for (let coin of this.state.inPortfolio) {
      //console.log("getPortfolioOverviewData coin: "+coin)

      const coinData = this.state.portfolioOverviewDataEachCoin[coin]

      if (coinData) {
        if (!summaryData) {
          summaryData = coinData.slice()
          //console.log(summaryData)
        }else {
          for (var i = 0; i < summaryData.length; i++) {
            if (coinData[i]) {
              const valueToAdd = coinData[i][1]
              const oldDataPoint = summaryData[i]

              //console.log(oldDataPoint[1]+valueToAdd)

              summaryData[i] = [oldDataPoint[0],oldDataPoint[1]+valueToAdd]
            }
          }
        }
      }
    }

    console.log(summaryData)
    return summaryData
  }

  handleClickAddPortfolioButton(coinID){
    // console.log("Callback from CryptoPortfolioBuilder - Button clicked for "+coinID)

    var inPortfolioUpdated = this.state.inPortfolio.slice();

    if (this.state.inPortfolio.includes(coinID)) {
      inPortfolioUpdated = inPortfolioUpdated.filter(e => e !== coinID);
    } else {
      inPortfolioUpdated.push(coinID);
    }

    this.setState({inPortfolio: inPortfolioUpdated})

    console.log("Coins in portfolio: "+inPortfolioUpdated)
  }
}

//TODO: migrate this class into it's own file
class PortfolioCoinList extends Component {
  render(){
    // console.log("Invoke render of PortfolioCoinList")

    const coinList = this.props.coinList.slice(0,this.props.displayCount).map((coin) => {

      return <PortfolioCoinListEntry
        {...coin}
        key={coin.name}
        onClickAddToPortfolio={() => this.props.onClickAddToPortfolio(coin.identifier)}
        inPortfolio={this.props.inPortfolio.includes(coin.identifier)}/>

      }
    )

    return (
      <div className="coinListTable">
        <BS.Table striped hover>

          <tbody>
            {coinList}
          </tbody>

        </BS.Table>
      </div>
    );
  }
}

//TODO: migrate this class into it's own file
class PortfolioCoinListEntry extends Component {
  render(){
    //console.log("Invoke render of PortfolioCoinListEntry: "+this.props.name)

    //TODO: refactor this into another file
    var icon = null
    if (this.props.iconURL){
      icon = <img
        src={this.props.iconURL}
        width="50px"
        height="50px"
        className="coinListEntryIcon"
        alt="The icon for the coin."
      />
    }

    return (
      <tr>
        <td>
          <div className="coinListEntry">

            <div className="addToPortfolioButton">
              <AddToPortfolioButton {...this.props} onClick={this.props.onClickAddToPortfolio}/>
            </div>

            <div className="coinListEntryIconDiv">
              {icon}
            </div>

            <div className="coinListEntryNameContainer">
              <p className="coinListEntryNameText">
                {this.props.name}
              </p>
            </div>

            <div className="coinListEntryChart">
              <CryptoChartSparkline {...this.props}/>
            </div>

          </div>
        </td>
      </tr>
    );
  }

  shouldComponentUpdate(nextProps,nextState){
    if (this.props.inPortfolio !== nextProps.inPortfolio) {
      return true;
    }
    return false;
  }
}

class AddToPortfolioButton extends Component{
  render() {
    const buttonWidth = "120px"

    // if (this.state.inPortfolio===false){
    if (!(this.props.inPortfolio)){
      return (
        <Button bsSize="small" block onClick={this.props.onClick} style={{width: buttonWidth}}>
          Add To Portfolio
        </Button>
      );
    } else {
      return (
        <Button bsSize="small" block onClick={this.props.onClick} style={{width: buttonWidth}} bsStyle="success" active>
          Added To Portfolio
        </Button>
      );
    }
  }
}

export default CryptoPortfolioBuilder;
