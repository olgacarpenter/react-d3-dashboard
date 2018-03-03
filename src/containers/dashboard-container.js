import {connect} from 'react-redux';
import Dashboard from 'src/views/dashboard';
import { handleCountyClick } from 'src/actions/dashboard-actions';

const mapStateToProps = (state) => {
  return {
    usState: state.dashboard.stateAbbr,
    data: state.dashboard.countyData,
    selectedCounty: state.dashboard.selectedCounty
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCountyClick: (event) => {
    	dispatch(handleCountyClick(event));
    },
    dispatch
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;