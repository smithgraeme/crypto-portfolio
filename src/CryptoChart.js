import React from 'react';
import Highcharts from "highcharts/highstock";

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

export default CryptoChart;
