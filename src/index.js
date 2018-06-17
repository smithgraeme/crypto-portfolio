import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Highcharts from "highcharts/highstock";

//generic reuseable UI element that just displays a chart of data
class CryptoChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {uuid: Math.random().toString().slice(-7)}
  }

  render() {
    return (
      <div id={this.state.uuid}></div>
    );
  }

  componentDidMount() {
    const highchartOptions = {
      rangeSelector: {
        selected: 1
      },
      credits: {enabled: false},

      title: {
        text: `Price v Time (${this.props.title})`
      },

      series: [{
        name: this.props.title,
        data: this.props.data||[],
        tooltip: {
          valueDecimals: 3
        },
        lineWidth: 3
      }],

      colors: [this.props.color || '#AA4643']
    }

    const chart = Highcharts.stockChart(this.state.uuid, highchartOptions)

    this.setState({...this.state, chart: chart});
  }

  componentDidUpdate(){
    this.state.chart.series[0].setData(this.props.data);
  }
}

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

    }else {
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

ReactDOM.render(<MainPage />,document.getElementById('root'));
