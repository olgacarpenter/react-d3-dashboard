import React from 'react';

const Widget = (props) => {
    return (
        <div  className="card db-widget" id={props.elementId}>
            <div className="card-block">
                <div className="card-title widget-title">{props.title}</div>
                <div className="widget-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Widget;