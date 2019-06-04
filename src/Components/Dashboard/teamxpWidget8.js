import React, {Component} from 'react';
import { Container } from "reactstrap";

//For now generate a random number for input, just to look cool.
var random = Math.random() * 100 + 1;
var color = 'black'; //Default value if something goes wrong...
var textColor = 'black'; //Set this in the div in the render.
var batteryLife = -1; //Default value if something goes wrong.
var lastCall = -1;

class teamxpWidget8 extends React.Component {


    constructor(props) {
        super(props);

        //TODO insert logic for handling the api request here.
        //Name the length lastCall
        //Name the variable recieved batteryLife.

        //Testing variable replace with actual battery life later
        //Dependency injection good for testing??


        batteryLife = Math.round(Math.random() * 100 + 1);
        lastCall = '10:29am';

        if(batteryLife   < 15) {
          //Battery should display a red background
          var color = '#E15050';
        } else if(batteryLife < 50) {
          //Battery should display a yellow background
          var color = '#ffffc7'
        } else {
          //Battery should display a green background
          var color = '#7CFC00'
        }

        // Create inline styles to make grid elements span multiple rows/columns
        this.spanStyles = {};
        this.spanStyles.backgroundColor = color;
        this.spanStyles.color = textColor;
        this.spanStyles.textAlign = 'center';

        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;

        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }
    }

    render() {
        //{backgroundColor: 'red'},
        //Pull in the text color from above...
        return (

           <div style={this.spanStyles } className="Widget">
                <div className="header">
                    <h2 style={{color: textColor}}>
                        {this.props.heading}
                    </h2>
                    {/* Conditionally show the loading spinner */}
                    {/* {this.props.loading ? <Loading /> : ""} */}
                </div>
                <div className="content">
                    <h1>
                      {this.props.children}
                      {batteryLife}%

                    </h1>
                    <h3 style={{color: textColor, fontSize: '10px'}}>
                      last updated: {lastCall}
                    </h3>
                </div>
            </div>
        );
    }
}

export default teamxpWidget8
