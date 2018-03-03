import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import RowEditButtons from './row-edit-buttons';

export default class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: (props.onEdit || props.onDelete),
        	pages: Math.ceil(props.rows.length/props.rowsPerPage),
            pageNo: 1,
            tableCols: props.columns,
            tableRows: this.getMappedRows(this.props.rows),
            tableSortBy: '',
            tableSortOrder: '' // asc/desc
        }
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.sortData = this.sortData.bind(this);
        this.handleColumnSort = this.handleColumnSort.bind(this);
    }
    
    getMappedRows(rows) {
    	let mappedRows = rows.map((item,i) => {
        	return {index: i, value: item};
        });
    	return mappedRows;
    }
    
    componentWillReceiveProps(nextProps) {
        // Check if there is actually a change in props
        if(this.props.rows!==nextProps.rows || nextProps.rowsPerPage!==this.props.rowsPerPage) {
            this.setState({
                pages: Math.ceil(nextProps.rows.length/nextProps.rowsPerPage),
                pageNo: 1,
                tableCols: nextProps.columns,
                tableRows: this.getMappedRows(nextProps.rows),
                tableSortBy: '',
                tableSortOrder: ''
            });
        }
    }

    handleColumnSort(col) {
        if(!col.path) return;
        this.setState(
            prevState => {
                let sortBy = col.path
                let order = 'asc';
                if(prevState.tableSortBy===col.path) {
                    if(prevState.tableSortOrder === 'asc') order = 'desc';
                    else {
                        sortBy = '';
                        order = '';
                    }
                }
                let sortedData = this.getMappedRows(this.props.rows);
                if(sortBy) sortedData = this.sortData(sortedData,sortBy,order);
                return {
                    tableRows: sortedData,
                    tableSortBy: sortBy,
                    tableSortOrder: order
                };
            }
        );
    }

    sortData(data,sortBy,sortOrder) {
        let sortedRows = data;
        sortedRows.sort((a,b) => {
            let valueA = a.value[sortBy];
            let valueB = b.value[sortBy];
            if(sortOrder === 'desc') {
                if(valueA > valueB) return -1;
                if(valueA < valueB) return 1;
                return 0;
            } else {
                if(valueA > valueB) return 1;
                if(valueA < valueB) return -1;
                return 0;
            }
            
        });
        return sortedRows;
    }

    handlePageClick(page) {
        this.setState({pageNo: page});
    }

    handlePreviousClick() {
        if(this.state.pageNo > 1) {
            this.setState({pageNo: this.state.pageNo -1});
        }
    }

    handleNextClick() {
        if(this.state.pageNo < this.state.pages) {
            this.setState({pageNo: this.state.pageNo + 1});
        }
    }

    render() {
        const columns = this.state.tableCols.map((col,i) => {
            let sortIcon = this.state.tableSortBy === col.path ? <i className={`fa fa-sort-${this.state.tableSortOrder}`} aria-hidden="true"></i> : null;
            return <th key={i} className="sortable-column" onClick={this.handleColumnSort.bind(null,col)} >{col.label ? col.label: col.path} {sortIcon}</th>;
        });
        if(this.state.editable) {
        	columns.push(<th key={'edit'}>Actions</th>);
        }
        let rows;
        let pagination = null;
        if(this.props.pagination && this.state.pages>1) {  // If pagination is used, divide the rows shown
            rows = [];
            let row;
            let rowIdx;
            let lastIndex = this.state.pageNo === this.state.pages ? (this.state.tableRows.length % this.props.rowsPerPage) : this.props.rowsPerPage;
            for(let i=0; i < lastIndex; i++) {
                row = this.state.tableRows[i + ((this.state.pageNo - 1) * this.props.rowsPerPage)].value;
                rowIdx = this.state.tableRows[i + ((this.state.pageNo - 1) * this.props.rowsPerPage)].index;
                let rowCols = this.state.tableCols.map((col,colIndex) => {
                    return <td key={colIndex}>{row[col.path]}</td>;
                });
                if(this.state.editable) {
                	rowCols.push(<td key={'edit'}><RowEditButtons index={rowIdx} onEdit={this.props.onEdit} onDelete={this.props.onDelete} /></td>);
                }
                rows.push(<tr key={i}>{rowCols}</tr>);
            }
            pagination = (
                <Pagination 
                    currentPage={this.state.pageNo} 
                    pages={this.state.pages} 
                    onPageClick={this.handlePageClick}
                    onPrevClick={this.handlePreviousClick}
                    onNextClick={this.handleNextClick}
                />
            );
        } else {
        	let row;
            let rowIdx;
            let rowCols;
            rows = this.state.tableRows.map((rowObj,i) => {
            	row = rowObj.value;
            	rowIdx = rowObj.index;
                rowCols = this.state.tableCols.map((col,colIndex) => {
                    return <td key={colIndex}>{col.component ? <col.component datum={row} /> : row[col.path]}</td>;
                });
                if(this.state.editable) {
                	rowCols.push(<td key={'edit'}><RowEditButtons index={rowIdx} onEdit={this.props.onEdit} onDelete={this.props.onDelete} /></td>);
                }
                return (
                    <tr key={i}>
                        {rowCols}
                    </tr>
                );
            });
        }
        let rowTotals = null;
        if(this.props.displayRowTotal) {
            const totalRows = this.state.tableRows.length;
            const firstDisplay = (this.state.pageNo - 1) * this.props.rowsPerPage + 1;
            const lastDisplay = this.state.pages===this.state.pageNo ? totalRows : this.state.pageNo * this.props.rowsPerPage;
            rowTotals = (
                <div className="row">
                    <div className="col-md-6"><p>Displaying {firstDisplay} to {lastDisplay} of {totalRows}</p></div>
                </div>
            );
        }
        return (
            <div>
                {rowTotals}
                <table className='table table-striped'>
                    <thead>
                        <tr>{columns}</tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                {pagination}
            </div>
            
        );
    }
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string
    })).isRequired,
    rows: PropTypes.array.isRequired,
    pagination: PropTypes.bool,
    displayRowTotal: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}

DataTable.defaultProps = {
    columns: null,
    rows: null,
    pagination: true,
    displayRowTotal: true,
    rowsPerPage: 10,
    onEdit: null,
    onDelete: null
}