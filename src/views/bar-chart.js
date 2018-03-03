import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Axis from './../components/axis';
import ChartLegend from './../components/chart-legend';

const d3 = require('d3');

const BarChart = (props) => {

    const dataset = props.dataset;
    const labelField = props.labelField;
    const w = props.width; 
    const h = w * 0.8;  
    const barPadding = w * 0.02; 
    const xPadding = w * 0.15;  
    const yPadding = w * 0.1; 
//    const fillColor = props.fillColor;
    const series = props.series; 

    const seriesWidth = (w - 2 * xPadding) / dataset.length - barPadding;
    const xScale = d3.scaleBand()
    	.domain(dataset.map(d => {
    		return d[labelField];
    		}))
    	.rangeRound([xPadding,w-xPadding]);
    const yScale = d3.scaleLinear()
        .domain([0,d3.max(dataset,d => { 
            return d3.max(series.map(s => {
                return d[s.dataField]; 
            }));
        })])
        .rangeRound([h-yPadding,yPadding]);
    
    const bars = dataset.map((d,i) => {
        return series.map((s,m) => {
            return <rect 
                    x={xScale(d[labelField]) + (seriesWidth/series.length)*m + barPadding} 
                    y={yScale(d[s.dataField ])}
                    width={seriesWidth/series.length} 
                    height={h - yPadding - yScale(d[s.dataField])} 
                    fill={s.fillColor} 
                    key={(i,m)}
                />;
        });
    });
    const title = <text 
                x={w/2}
                y={yPadding/2}
                fill="black"
                fontSize="1rem"
                textAnchor="middle"
                >
                    {props.title}
                </text>;
    const labels = props.barLabels ?
        dataset.map((d,i) => {
            return series.map((s,m) => {
                const y = (yScale(d[s.dataField]) + 14) > h-yPadding ? yScale(d[s.dataField]) : yScale(d[s.dataField])+14;
                return <text 
	                    x={xScale(d[labelField]) + (seriesWidth/series.length/2) + (seriesWidth/series.length)*m + barPadding}
	                    y={y}
	                    fill="black"
	                    fontSize="11px"
	                    key={(i,m)}
	                    textAnchor="middle"
	                    >
	                        {d[s.dataField]}
	                    </text>
            })
        }) : null;
    return (
        <div>
            <div style={props.showBorder ? {borderWidth:1,borderStyle:'solid',borderColor:'grey'} : {}} className="text-xs-center chart-wrapper">
                <svg width={w} height={h} className="responsive-svg" viewBox={`0 0 ${w} ${h}`} >
                    {title}
                    {bars}
                    {labels}
                    <Axis scale={yScale} orient="left" translate={`translate(${xPadding},0)`} />
                    <Axis scale={xScale} orient="bottom" translate={`translate(0,${h-yPadding})`} />
                </svg>
                <ChartLegend series={props.series} inline={true} />
            </div>
        </div>
    );
};

BarChart.propTypes = {
    dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
    labelField: PropTypes.string.isRequired,
    width: PropTypes.number,
    fillColor: PropTypes.string,
    title: PropTypes.string,
    barLabels: PropTypes.bool,
    showBorder: PropTypes.bool,
};

BarChart.defaultProps = {
    dataset: [],
    labelField: "",
    width: 500,
    fillColor: "#0275d8",
    title: "",
    barLabels: true,
    showBorder: true
};

export default BarChart;