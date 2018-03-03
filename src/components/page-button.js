import React from 'react';
import PropTypes from 'prop-types';

const PageButton = (props) => (
    <li className={'page-item'+(props.disabled ? ' disabled':'')+(props.active ?' active':'')}>
        <a className="page-link" onClick={props.onClick} value={props.page}>
            {props.label}
        </a>
    </li>
);

PageButton.propTypes = {
    page: PropTypes.number,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func
};

PageButton.defaultProps = {
    page: null,
    label: '',
    disabled: false,
    active: false,
    onClick: null
}

export default PageButton;