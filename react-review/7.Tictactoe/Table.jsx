import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => { // props를 구조분해 할당으로 각각 따로 받음.
    return (
        <table>
            <tbody>
                {tableData.map((tr, i) => {
                    return (<Tr dispatch={dispatch} rowIndex={i} key={"key-"+i} rowData={tableData[i]} />)})
                }   
            </tbody>
        </table>
    );
};

export default Table;