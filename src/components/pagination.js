import React from 'react';
import PropTypes from 'prop-types';
import PageButton from './page-button';

const Pagination = (props) => {
    let buttons = [<PageButton key='prev' label="Prev" disabled={props.currentPage===1} onClick={props.onPrevClick} />]; 
    if(props.pages > 10) {  // Only show a limited amount of buttons
        let i0 = props.currentPage,
            iN = props.currentPage;
        while(i0 > 1 && props.currentPage-i0 < 5) { i0--; }
        while(iN < props.pages && iN - props.currentPage < 5) { iN++; }
        for(let i=i0; i<=iN; i++) {
            buttons.push(<PageButton key={i} label={`${i}`} active={i===props.currentPage} onClick={props.onPageClick.bind(null,i)} page={i} />);
        }
    } else {  // Show all the buttons
        for(let i=1; i<=props.pages; i++) {
            buttons.push(<PageButton key={i} label={`${i}`} active={i===props.currentPage} onClick={props.onPageClick.bind(null,i)} page={i} />);
        }
    }
    buttons.push(<PageButton key='next' label="Next" disabled={props.currentPage===props.pages} onClick={props.onNextClick} />);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-sm" style={{display:'flex',justifyContent:'flex-end'}}>
                {buttons}
            </ul>
        </nav> 
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onPageClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func
};

export default Pagination;