import React from 'react';
import PropTypes from 'prop-types';
import Axis from './axis';

const ColorGradientLegend = (props) => {
    const x = props.xScale;
    const points = props.colorScale.range().map(d => {
        d = props.colorScale.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
    });
    const rects = points.map((d,i) => {
        return <rect
                x={x(d[0])}
                width={x(d[1]) - x(d[0])}
                height={8}
                fill={props.colorScale(d[0])}
                key={i}
                />
    });
    const title = <text 
                    x={x.range()[0]}
                    y={-6}
                    fill="#787878"
                    textAnchor="start"
                    fontWeight="bold"
                    fontSize="0.8rem"
                  >
                    {props.title}
                </text>;
   
    return (
        <g transform={props.translate} >
            {rects}
            {title}
            <Axis scale={x} orient="bottom" translate={`translate(0,8)`} tickFormat={function(x,i) { return x+"%"; }}/>
        </g>
    );
}

ColorGradientLegend.propTypes = {
    xScale: PropTypes.func.isRequired,
    colorScale: PropTypes.func.isRequired,
    translate: PropTypes.string,
    title: PropTypes.string
};

export default ColorGradientLegend;