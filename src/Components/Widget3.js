import React, { Component } from 'react';
import { Container, Spinner } from "reactstrap";
import { curveCatmullRom } from 'd3-shape';

const ReactVis = require('react-vis');
const legendItems = [
    {
      title: 'Loren Ipdog',
      color: 'blue'
    }
  ];

class Widget3 extends React.Component {


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
        const { riderData, isLoaded } = this.props.data;
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
                <ReactVis.XYPlot height={300} width={300}>
                    <ReactVis.DiscreteColorLegend items={legendItems} orientation='horizontal' />
                    <ReactVis.HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                    <ReactVis.VerticalGridLines style={{stroke: '#B7E9ED'}} />
                    <ReactVis.XAxis 
                        title="Time"
                        style={{line: {stroke: '#ADDDE1'}, ticks: {stroke: '#ADDDE1'},
                            text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 } }} />
                    <ReactVis.YAxis title="Beats per minute" />
                    <ReactVis.LineSeries color="orange" curve={curveCatmullRom.alpha(0.5)} data={[
                        {x: 1, y: 4},
	                    {x: 5, y: 2},
	                    {x: 15, y: 6}
                    ]} />
                    </ReactVis.XYPlot>:
                <Spinner type="grow" color="primary"></Spinner>
            }
            </div>
        </div>
        );
    }
}

export default Widget3