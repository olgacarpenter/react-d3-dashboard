import React from 'react';
import PropTypes from 'prop-types';
//require('src/styles/components/row-edit-buttons.less');

//const btnStyle = {
//	border:'none',
//	boxShadow:'none',
//	backgroundColor:'transparent',
//	cursor:'pointer'
//};


const RowEditButtons = (props) => {
	const editButton = props.onEdit ?
		<button type="button" className="row-edit-btn btn btn-sm btn-secondary " onClick={props.onEdit.bind(null,props.index)} >
        	<img style={{width:'auto',height:'auto'}} src="img/icon-pencil.svg" />
        </button>
        	: null;
    const deleteButton = props.onDelete ? 
    	<button type="button" className="row-edit-btn btn btn-sm btn-secondary " onClick={props.onDelete.bind(null,props.index)} >
        	<img style={{width:'auto',height:'auto'}} src="img/close-o.svg" />
        </button>
        	: null;
    
    return (
		<div className="btn-group" role="group" aria-label="Edit buttons" >
        	{editButton}
        	{deleteButton}
	    </div>
    );
    
};

RowEditButtons.propTypes = {
    index: PropTypes.number,
	onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default RowEditButtons;