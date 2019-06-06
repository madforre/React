import React from 'react';
import './Palette.css';

const Palette = ({colors}) => {

    const colorList = colors.map(
        (color) => (
            <div className='colorStyle' style={{backgroundColor : color}} key={color}></div>
        )
    )

    return (
        <div className='colorContainer'>
            {colorList}
        </div>
    );
};

export default Palette;