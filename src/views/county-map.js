import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorGradientLegend from './../components/color-gradient-legend';
import usGeoData from './../data/us-10m.v1.json';
import stateCodes from './../data/statecodes.json';
const topojson = require('topojson');
const d3 = require('d3');



export default class CountyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateAbbr: props.stateAbbr,
            stateCode: stateCodes[props.stateAbbr].state_code,
            stateName: stateCodes[props.stateAbbr].state_name,
            countyData: props.data,
            activeCounty: null,
        }
        this.path = d3.geoPath();
        this.colorScale = this.colorScaleGenerator([0,10,20,30,40,50,60,70,80,90,100],
            ['#ff4500','#f85b03','#f16e07','#e97c0c','#e18b12','#d89717','#cea21d','#c3ae22','#b7b927','#aac22c','#9acd32']);
        this.filterCounties = this.filterCounties.bind(this);
    }

    xScaleGenerator(domainValues,rangeValues) {
        let fn = d3.scaleLinear()
            .domain(domainValues)
            .rangeRound(rangeValues);
        return fn;
    }

    colorScaleGenerator(domainValues,rangeValues) {
        let fn = d3.scaleThreshold()
            .domain(domainValues)
            .range(rangeValues);
        return fn;
    }

    calcAvgCMField(data,field) {
        let percentSum = 0;
        data.countermeasures.forEach(cm => {
            percentSum += cm[field] / data.population;
        });
        return (percentSum / data.countermeasures.length) * 100;
    }

    filterCounties(topoJsonObject, stateID) {
        const filteredObject = Object.assign({},topoJsonObject);
        const filteredCounties = filteredObject.geometries.filter(item => {
            return item.id.startsWith(stateID); 
        });
        filteredObject.geometries = filteredCounties;
        return filteredObject;
    }

    render() {
    	let width = this.props.width;
        let height = 0.8 * this.props.width;
        let bottomPadding = width * 0.06; //30;  // space between map and legend
        let legendHeight = width * 0.08; //40;
        let mapHeight = height - bottomPadding - legendHeight;
        let data = this.props.countyData ? this.props.countyData : {};
        this.xScale = this.xScaleGenerator([0, 100],[0, Math.round(width / 2)]);
        
        let state = topojson.feature(usGeoData,this.filterCounties(usGeoData.objects.counties,this.state.stateCode));
        let b = this.path.bounds(state); // Get bounding coordinates of state
        let scale = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / (mapHeight));  // Calculate scale to fit in given width x height
        let stateHeight = (b[1][1] - b[0][1]) * scale;  // Calculate final height of state
        let stateWidth = (b[1][0] - b[0][0]) * scale;  // Calculate final width of state
        let xTranslate = (width - stateWidth) / scale;  // Translate in order to center map
        

        let counties = state.features.map((d,i) => {
            let name = data[d.id] ? data[d.id].county_name : "";
            let adm = data[d.id] ? Math.round(this.calcAvgCMField(data[d.id],this.props.colorBy)) : null;
            let color = adm ? this.colorScale(adm) : this.props.fillColor;
            return (
                <path id={d.id+"-"+name} d={this.path(d)} fill={color} className={`counties ${this.props.activeCounty===d.id ? "active" : ""}`} key={i} onClick={this.props.onClick} >
                    <title>{name} {adm}%</title>
                </path>
            );
        });
        const legend = Object.keys(data).length ? 
            <ColorGradientLegend 
                xScale={this.xScale} 
                colorScale={this.colorScale} 
                translate={`translate(10,${stateHeight+bottomPadding})`} 
                title="Administered" 
            /> 
            :
            null;


        return (
            <div style={{width:'100%'}}>
                <svg className="svg" width={width} height={stateHeight+bottomPadding+legendHeight} viewBox={`0 0 ${width} ${stateHeight+bottomPadding+legendHeight}`} preserveAspectRatio="xMinYMin meet" onClick={this.props.onDeselect}>
                    {legend}
                    <g transform={`translate(${xTranslate},0)`}>
	                    <g className="boundary" transform={`scale(${scale}) translate(-${b[0][0]},-${b[0][1]})`}>
	                        {counties}
	                    </g>
	                </g>
                </svg>
                <div id="county-label"></div>
            </div>
        );
    }
}


CountyMap.propTypes = {
    stateAbbr: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    fillColor: PropTypes.string,
    countyData: PropTypes.object,
    onClick: PropTypes.func,
    onDeselect: PropTypes.func,
    activeCounty: PropTypes.string,
    colorBy: PropTypes.string
};

CountyMap.defaultProps = {
    stateAbbr: 'GA',
    height: 500,
    width: 500,
    fillColor: "#678564",
    countyData: null,
    onClick: null,
    onDeselect: null,
    activeCounty: null,
    colorBy: "administered"
};