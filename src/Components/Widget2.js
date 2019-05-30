import React, {Component} from 'react';
import { Container } from "reactstrap";
import {curveCatmullRom} from 'd3-shape';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

//Attempting to autofill the size with these flexible imports
//https://github.com/uber/react-vis/blob/master/docs/flexible-plots.md
import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';


export default class Widget2 extends React.Component {


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

      //Constants from for setting up canvas
      //const {useCanvas} = this.state;
      //const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
      //const Line = useCanvas ? LineSeriesCanvas : LineSeries;

      //Style of this will default to fill.  To fix this bug, look at
      //https://github.com/uber/react-vis/issues/757

      //This plot is from this tutorial
      //https://medium.com/dailyjs/data-visualization-with-react-vis-bd2587fe1660

        return (
           <div style={this.spanStyles} className="Widget">
                <div className="header">
                    <h2>
                        {this.props.heading}
                    </h2>

                    <FlexibleXYPlot
                      width={300}
                        height={300}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <LineSeries
                          data={[
                              {x: 1, y: 4},
                              {x: 5, y: 2},
                              {x: 15, y: 6}
                          ]}/>
                    </FlexibleXYPlot>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
