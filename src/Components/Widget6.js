import React, { Component } from 'react';
import { Container, Spinner, Button } from "reactstrap";
import { curveCatmullRom } from 'd3-shape';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
  } from 'react-vis';

const ReactVis = require('react-vis');
const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];
const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];
const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y)
}));

const legendItems = [
    {
      title: 'Time',
      color: 'blue'
    }
  ];

  const myDATA = [
    {id: '00036', y: 200400, x: 1504121437},
    {id: '00036', y: 200350, x: 1504121156},
    {id: '00036', y: 200310, x: 1504120874},
    {id: '00036', y: 200260, x: 1504120590},
    {id: '00036', y: 200210, x: 1504120306},
    {id: '00036', y: 200160, x: 1504120024},
    {id: '00036', y: 200120, x: 1504119740},
    {id: '00036', y: 200070, x: 1504119458},
    {id: '00036', y: 200020, x: 1504119177},
    {id: '00036', y: 199980, x: 1504118893},
    {id: '00036', y: 199930, x: 1504118611},
    {id: '00036', y: 199880, x: 1504118330},
    {id: '00036', y: 199830, x: 1504118048},
    {id: '00036', y: 199790, x: 1504117763},
    {id: '00036', y: 199740, x: 1504117481}
  ];

  const yDomain = myDATA.reduce(
    (res, row) => {
      return {
        max: Math.max(res.max, row.y),
        min: Math.min(res.min, row.y)
      };
    },
    {max: -Infinity, min: Infinity}
  );

class Widget6 extends React.Component {
    state = {timeSeries: []}

    constructor(props) {
        super(props);
        this.spanStyles = {};
        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;
        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }
    }

    DisplayState = () => {
        console.log(this.state);
    }
    
    render() {
        const { riderData, isLoaded } = this.props.data;
        let holder = this.props.data.riderData[0];
        setInterval(() => {
            if(typeof(holder) != 'undefined'){
                let curr = {
                    time: new Date().toUTCString(),
                    riderTime: holder.rider.watchSpeed
                };
                this.state.timeSeries.push(curr);
                if(this.state.timeSeries.length == 6) {
                    this.state.timeSeries.splice(0,1);
                }
            }
        }, 2000);
        return (
        <div style={this.spanStyles} className="Widget">
            <div className="header">
                <h2>
                    {this.props.heading}
                </h2>
            </div>
            <div className="content">
            {
                isLoaded ? 
                <XYPlot xType="time" width={this.props.widthPx} height={this.props.heightPx} yDomain={[yDomain.min, yDomain.max]}>
                    <VerticalBarSeries className="vertical-bar-series-example" data={myDATA} />
                    <ReactVis.HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                    <ReactVis.VerticalGridLines style={{stroke: '#B7E9ED'}} />
                    <XAxis title="Time"
                        style={{line: {stroke: '#ADDDE1'}, ticks: {stroke: '#ADDDE1'},
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 } }} />
                    <YAxis title="Stress"/>
                </XYPlot>:
                <Spinner type="grow" color="primary"></Spinner>
            }
            </div>
            <Button color="primary" onClick={this.DisplayState}>Click Me!</Button>
        </div>
        );
    }
}

export default Widget6