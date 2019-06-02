import React, {Component} from 'react';
import { Container } from "reactstrap";

class teamxpWidget2 extends React.Component {


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
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default teamxpWidget2
