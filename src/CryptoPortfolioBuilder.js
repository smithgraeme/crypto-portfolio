import React, {Component} from 'react';
// import $ from "jquery";

import {ListGroup,ListGroupItem,Grid,Row,Col} from 'react-bootstrap';
import * as BS from 'react-bootstrap';

import './CryptoPortfolioBuilder.css';

import CryptoChartPortfolio from './CryptoChartPortfolio';

class CryptoPortfolioBuilder extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <div className="mainPortfolioChart">
          <CryptoChartPortfolio title="Crypto Portfolio" coin="ripple" days="2"/>

        </div>
        {/* <PortfolioCoinList2 /> */}
        <PortfolioCoinList />
      </div>
    )
  }

  componentDidMount(){

  }
}

class PortfolioCoinList extends Component {
  render(){
    return (
      <div className="coinListTable">
        <BS.Table striped hover>
          <tbody>
            <PortfolioCoinListEntry coin="Ripple" iconUrl="https://chasing-coins.com/api/v1/std/logo/BTC"/>
            <PortfolioCoinListEntry coin="Ethereum"/>
            <PortfolioCoinListEntry coin="Bitcoin"/>
            <PortfolioCoinListEntry coin="ripple"/>
          </tbody>
        </BS.Table>
      </div>
    );
  }
}

class PortfolioCoinListEntry extends Component {
  render(){
    var icon = null
    if (this.props.iconUrl){
      icon = <img
        src={this.props.iconUrl}
        width="50px"
        height="50px"
        className="coinListEntryIcon"
             />
    }

    return (
      <tr>
        <td>
          <div className="coinListEntry">

            <div className="addToPortfolioButton">
              <BS.Button bsSize="small" block>
                Add To Portfolio
              </BS.Button>
            </div>

            <div className="coinListEntryIconDiv">
              {icon}
            </div>

            <div className="coinListEntryNameContainer">
              <p className="coinListEntryNameText">
                {this.props.coin}
              </p>
            </div>

            <div className="coinListEntryChart">

            </div>

          </div>
        </td>
      </tr>
    );
  }
}

class PortfolioCoinList2 extends Component {
  render(){
    return (
      <Grid >
        <Row className="show-grid">
          <Col>
            <p> hi </p>
          </Col>
          <Col>
            <p> hi </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CryptoPortfolioBuilder;
