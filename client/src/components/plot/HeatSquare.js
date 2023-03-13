import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenMeasure } from '../../redux/tableSlice';

const HeatSquare = ({ rawItem }) => {

    const [text, setText] = useState('');

    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const dispatch = useDispatch();

    const colorHandler = () => {
        if (rawItem.ph_level >= 7 && rawItem.ph_level <= 7.2) {
            return '#00800080'; // green
        } else if ((rawItem.ph_level >= 6.4 && rawItem.ph_level <= 6.9) || (rawItem.ph_level >= 7.2 && rawItem.ph_level <= 7.4)) {
            return '#ffc1078a'; // yellow
        } else {
            return '#ff000069'; // red
        }
    }

    const activeHandler = () => {
        return chosenMeasure === rawItem.id ? 'active' : ''
    }

    const clickHandler = () => {
        if (chosenMeasure === rawItem.id) {
            dispatch(setChosenMeasure(null))
        } else {
            dispatch(setChosenMeasure(rawItem.id))
        }
    }

    return (
        <div onClick={clickHandler} onMouseOver={() => setText(rawItem.ph_level)} onMouseLeave={() => setText('')} className={`heat_square ${activeHandler()}`} style={{backgroundColor: colorHandler()}}>{text}</div>
    )
}

export default HeatSquare