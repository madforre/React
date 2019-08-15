import React from 'react';
import Td from './Td';

const Tr = ({ rowIndex, rowData, dispatch }) => {
    return (
        <tr>
            {rowData.map((td, i) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} key={"key-"+rowIndex+"-"+i}>{''}</Td>))}
        </tr>
    );
};

export default Tr;