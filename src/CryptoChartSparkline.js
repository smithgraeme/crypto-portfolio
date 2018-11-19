import React from 'react';
import $ from "jquery";
import Highcharts from "highcharts/highstock";

class CryptoChartSparkline extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      uuid: Math.random().toString().slice(-7),
      data: [],
      loaded: false
    }
  }

  render() {
    if (this.state.loaded===false) {
      return (
        <div id={this.state.uuid} style={{height: "100%"}}>
          {/* <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/0_KqJAcnl8J.gif"
            alt=""
          /> */}
        </div>)
          } else {
            return (
              <div id={this.state.uuid} style={{height: "100%"}}></div>
      );
    }
  }

  componentDidMount(){
    this.loadChartData()
  }

  componentDidUpdate(){
    if (this.state.chart)
      this.state.chart.series[0].setData(this.state.data);
  }

  loadChartData() {
    const url = 'https://j8xyoalc6l.execute-api.us-east-2.amazonaws.com/dev/cryptoGetData_RDS';
    const pastHours = 24*(2);

    const params = {
      coinID: this.props.identifier,
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

      this.runHighcharts()

      this.setState({data: parsedData, loaded: false})
    });
  }

  runHighcharts(){
    const highchartOptions = {
      credits: {enabled: false},
      navigator: {enabled: false},
      scrollbar: {enabled: false},
      xAxis: {visible: false, crosshair: false},
      yAxis: {
        visible: false,
        crosshair: false,
        maxPadding: 0.0,
        minPadding: 0.0,
        startOnTick: false,
        endOnTick: false,
      },
      rangeSelector: {enabled: false},

      chart: {
        margin: [0, 0, 0, 0 ],
        backgroundColor:'rgba(255, 255, 255, 0.0)'
      },

      tooltip: {
        enabled:false
      },


      series: [{
        data: this.state.data,
        lineWidth: 2
      }],

      colors: [this.state.color || "#c1c1c1"]
    }

    const chart = Highcharts.stockChart(this.state.uuid, highchartOptions)

    this.setState({chart: chart});
  }
}

export default CryptoChartSparkline;
