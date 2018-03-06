import React from 'react';
import PropTypes from 'prop-types';

const ChartLegend = (props) => {
    const { series, inline } = props;
    const labels = series.map((s,i) => {
        return (
            <li key={i} className="legend-item" >
                <i className="fa fa-square" aria-hidden="true" style={{color:s.fillColor,marginRight:2}}></i>
                {s.label}
            </li>
        );
    });
    return (
        <ul className={`chart-legend ${inline ? 'inline-legend' : ''}`}>
            {labels}
        </ul>
    );
};

ChartLegend.propTypes = {
    series: PropTypes.arrayOf(
        PropTypes.shape({
            dataField: PropTypes.string,
            label: PropTypes.string,
            fillColor: PropTypes.string
        })
    ).isRequired,
    inline: PropTypes.bool 
};

ChartLegend.defaultProps = {
    series: null,
    inline: false
};

export default ChartLegend;