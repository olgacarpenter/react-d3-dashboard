import React from 'react';
import PropTypes from 'prop-types';
import Axis from './axis';

const ColorGradientLegend = (props) => {
    const { xScale:x, colorScale, title, translate } = props;
    const points = colorScale.range().map(d => {
        d = colorScale.invertExtent(d);
        if (!d[0]) 
            d[0] = x.domain()[0];
        if (!d[1]) 
            d[1] = x.domain()[1];
        return d;
    });
    // Rectangles with color points
    const rects = points.map((d,i) => {
        return <rect
                x={x(d[0])}
                width={x(d[1]) - x(d[0])}
                height={8}
                fill={colorScale(d[0])}
                key={i}
                />
    });
    const titleHeader = <text 
                    x={x.range()[0]}
                    y={-6}
                    fill="#787878"
                    textAnchor="start"
                    fontWeight="bold"
                    fontSize="0.8rem"
                  >
                    {title}
                </text>;
   
    return (
        <g transform={translate} >
            {rects}
            {titleHeader}
            <Axis scale={x} orient="bottom" translate={`translate(0,8)`} tickFormat={function(x,i) { return x/1000+"K"; }}/>
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