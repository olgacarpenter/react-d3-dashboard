import React from 'react';

const Widget = (props) => {
    const { elementId, title, children } = props;
    return (
        <div  className="card db-widget" id={elementId}>
            <div className="card-block">
                <div className="card-title widget-title">{title}</div>
                <div className="widget-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Widget;