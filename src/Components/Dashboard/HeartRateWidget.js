import React, {Component} from 'react';
import { Container } from "reactstrap";
import {curveCatmullRom} from 'd3-shape';

import {
  DiscreteColorLegend,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

//Testing code wrote before we inject actual data into the graphs.
//Learnings are that we can just set in tuples, either as a list,
//or by themselves to get the data to graph.

//We can offload this work to a different function to allow for a
//good datapipeline once we connect the backend.
var testPoint = {x: 1, y: 12};

var time = 1;
var time2 = 1;

//Test just putting in a function
function genData() {
  return {x: time++, y: Math.random()*15 + 10}
}

function genData2() {
  return {x: time2++, y: Math.random()*30 + 30}
}

//Test putting in an array...
var testArr = [genData2(), genData2(), genData2(), genData2()];

//fixed
const legendItems = [
  {
    title: 'Loren Ipdog',
    color: 'blue'
  },
  {
    title: 'sample text',
    color: 'orange'
  }
];

class HeartRateWidget extends React.Component {


    constructor(props) {
        super(props);

        // Create inline styles to make grid elements span multiple rows/columns
        this.spanStyles = {};
        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;
        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }
    }

    render() {
        return (
           <div style={this.spanStyles} className="Widget">
                <div className="header">
                    <h2>
                        {this.props.heading}
                    </h2>
                    {/* Conditionally show the loading spinner */}
                    {/* {this.props.loading ? <Loading /> : ""} */}
                </div>
                <div className="content">
                <XYPlot width={300} height={300}>
                  <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                  <VerticalGridLines style={{stroke: '#B7E9ED'}} />
                  <XAxis
                    title="Time"
                    style={{
                      line: {stroke: '#ADDDE1'},
                      ticks: {stroke: '#ADDDE1'},
                      text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                    }}
                  />
                  <YAxis title="Beats per minute" />
                  <LineSeries className="second-series" data={null} />
                  <LineSeries
                    className="third-series"
                    curve={'curveMonotoneX'}
                    data={testArr}
                    color="orange"
                  />
                  <LineSeries
                    className="fourth-series"
                    curve={curveCatmullRom.alpha(0.5)}
                    data={[genData(), genData(), genData(), genData()]}
                  />
                  <DiscreteColorLegend
                    items={legendItems}
                    orientation='horizontal'
                  />

                </XYPlot>
                </div>
            </div>
        );
    }
}

export default HeartRateWidget
