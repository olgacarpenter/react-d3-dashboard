import React from 'react';
import stateCodes from './../data/statecodes.json';

const StateSelect = (props) => {
    const options = Object.entries(stateCodes).map((state) => {
        return <option key={state[0]} value={state[0]}>{state[1].state_name}</option>
    })
    return (
        <select className="form-control" value={props.currentState} onChange={props.onChange} >
            {options}
        </select>
    );
}

export default StateSelect;