import React, {Component} from 'react';
import CountyMap from './county-map';
import BarChart from './bar-chart';
import DataTable from './../components/data-table';
import Widget from './../components/widget';
import { tableColumns, barChartSeries, xAxisField, countyColorBy } from './../constants/dataSettings';
import './../styles/dashboard.css';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCounty: props.selectedCounty,
            chartWidth: 500
        };
        
        // Bind functions
        this.handleCountyClick = this.handleCountyClick.bind(this);
        this.handleDeselectCounty = this.handleDeselectCounty.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    handleCountyClick(event) {
        event.stopPropagation();
        let data = event.target.id.split("-");
        this.setState({selectedCounty: data[0]});
        let offsetX = event.nativeEvent.offsetX;
        let offsetY = event.nativeEvent.offsetY;

        let div = document.getElementById('county-label');
        div.style.left = (offsetX) + "px";
        div.style.top = (offsetY) + "px";
        div.innerHTML = data[1];
    }
    
    handleDeselectCounty() {
    	this.setState({selectedCounty: null});
    	let div = document.getElementById('county-label');
        div.style.left = "-150px";
        div.style.top = "-150px";
        div.innerHTML = "";
    }
    
    updateDimensions() {
    	let mapDiv = document.getElementById('county-map').getElementsByClassName("widget-content")[0];
    	let style = mapDiv.currentStyle || window.getComputedStyle(mapDiv);
    	let availableWidth = mapDiv.offsetWidth - style.paddingLeft.replace(/[^0-9]/g,'') - style.paddingRight.replace(/[^0-9]/g,'');
    	this.setState({chartWidth: availableWidth});
    }
    
    componentDidMount() {
    	this.updateDimensions();
    	window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    render() {
    	const dataset = this.state.selectedCounty ? this.props.data[this.state.selectedCounty].data : [];
        const countyName = this.state.selectedCounty ? this.props.data[this.state.selectedCounty].countyName : '';
        const countyMap = this.props.usState ? 
    			<CountyMap 
	            	stateAbbr={this.props.usState} 
	        		colorBy={countyColorBy}
	            	width={this.chartWidth} 
	            	countyData={this.props.data} 
	            	activeCounty={this.state.selectedCounty} 
	            	onClick={this.handleCountyClick} 
	            	onDeselect={this.handleDeselectCounty}
	            />
        		:
        			null;
    	return (
            <div className="dashboard">
                <p className="App-intro">
                    Select county from map to view data.
                </p>
                <div className="row">
                    <div className="col-sm-12 col-md-6" style={{marginBottom:'1.5rem'}}>
                        <Widget title={this.props.usState} elementId="county-map">
                            {countyMap}
                        </Widget>
                    </div>
                    <div className="col-sm-12 col-md-6" style={{marginBottom:'1.5rem'}}>
                        <Widget title={countyName} elementId="countermeasure-chart">
                            <BarChart 
                                series={barChartSeries} 
                                dataset={dataset} 
                                xAxisField={xAxisField}
                                showBarLabels={false}  
                                width={this.chartWidth} 
                                showBorder={false} 
                            />
                        </Widget>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Widget title={countyName} elementId="countermeasure-table">
                            <DataTable columns={tableColumns} rows={dataset} pagination={false} displayRowTotal={false} />
                        </Widget>
                    </div>
                </div>
            </div>
        );
    }
}