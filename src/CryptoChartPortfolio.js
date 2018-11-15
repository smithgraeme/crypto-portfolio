import React from 'react';
import Highcharts from "highcharts/highstock";

class CryptoChartPortfolio extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      uuid: Math.random().toString().slice(-7),
    }
  }

  render() {
    console.log("Render CryptoChartPortfolio")
    return (
      <div id={this.state.uuid}></div>
    );
  }

  componentDidMount() {
    const highchartOptions = {
      credits: {enabled: false},

      yAxis: {
        maxPadding: 0.0,
        minPadding: 0.0,
        startOnTick: true,
        endOnTick: true,
      },
      rangeSelector: {enabled: false},

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

    this.setState({chart: chart});
  }

  componentDidUpdate(){
    console.log("componentDidUpdate CryptoChartPortfolio")
    this.state.chart.series[0].setData(this.props.data);
    //this.componentDidMount();
  }
}

export default CryptoChartPortfolio;
