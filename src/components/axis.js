import React, {Component} from 'react';

const d3 = require('d3');

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;
    var axis; 
    switch(this.props.orient) {
        case 'bottom':
            axis = d3.axisBottom(this.props.scale);
            break;
        case 'top':
            axis = d3.axisTop(this.props.scale);
            break;
        case 'right':
            axis = d3.axisRight(this.props.scale);
            break;
        default: // left axis
        	axis = d3.axisLeft(this.props.scale);
        	break;
    }
    axis.ticks(this.props.ticks);
    if(this.props.tickSize) { 
    	axis.tickSize(this.props.tickSize); 
    }
    if(this.props.tickFormat) { 
    	axis.tickFormat(this.props.tickFormat); 
    }
    if(this.props.tickValues) { 
    	axis.tickValues(this.props.tickValues); 
    }
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}

Axis.defaultProps = {
    ticks: 5,
    tickSize: null,
    tickValues: null,
    tickFormat: null,
    orient: 'left'
}