import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
    console.log('tr rendered - ', rowIndex, rowData);

    return (
        <tr>
            {rowData.map((td, i) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} key={"key-"+rowIndex+"-"+i}>{''}</Td>))}
        </tr>
    );
});

export default Tr;