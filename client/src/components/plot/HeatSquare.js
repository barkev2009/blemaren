import React, { useState } from 'react'

const HeatSquare = ({ rawItem }) => {

    const [text, setText] = useState('')

    const colorHandler = () => {
        if (rawItem.ph_level >= 7 && rawItem.ph_level <= 7.2) {
            return '#00800080'; // green
        } else if ((rawItem.ph_level >= 6.4 && rawItem.ph_level <= 6.9) || (rawItem.ph_level >= 7.2 && rawItem.ph_level <= 7.4)) {
            return '#ffc1078a'; // yellow
        } else {
            return '#ff000069'; // red
        }
    }

    return (
        <div onMouseOver={() => setText(rawItem.ph_level)} onMouseLeave={() => setText('')} className='heat_square' style={{backgroundColor: colorHandler()}}>{text}</div>
    )
}

export default HeatSquare