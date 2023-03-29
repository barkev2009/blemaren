import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenMeasure } from '../../redux/tableSlice';
import { safe_calc } from '../../utils/functions';

const HeatSquare = ({ rawItem }) => {

    const [text, setText] = useState('');

    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const dispatch = useDispatch();

    const level_high = Number(process.env.REACT_APP_LIMIT_HIGH);
    const level_low = Number(process.env.REACT_APP_LIMIT_LOW);
    // console.log(safe_calc(level_low - 0.4));

    const colorHandler = () => {
        if (rawItem.ph_level >= level_low && rawItem.ph_level <= level_high) {
            return '#00800080'; // green
        }
        switch (rawItem.ph_level) {
            case safe_calc(level_high + 0.3):
                return '#021f02';
            case safe_calc(level_high + 0.2):
                return '#032b03';
            case safe_calc(level_high + 0.1):
                return '#053705';
            case safe_calc(level_low - 0.1):
                return '#3d4909';
            case safe_calc(level_low - 0.2):
                return '#4c580b';
            case safe_calc(level_low - 0.3):
                return '#61710a';
            case safe_calc(level_low - 0.4):
                return '#80750a';
            case safe_calc(level_low - 0.5):
                return '#a19306';
            case safe_calc(level_low - 0.6):
                return '#a17f06';
            case safe_calc(level_low - 0.7):
                return '#a16506';
            case safe_calc(level_low - 0.8):
                return '#a13b06';
            case safe_calc(level_low - 0.9):
                return '#a10606';
            case safe_calc(level_low - 1):
                return '#6e0000';
            default:
                return '#520101'; // red
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
        <div
            onClick={clickHandler}
            onMouseOver={() => setText(rawItem.ph_level)}
            onMouseLeave={() => setText('')}
            className={`heat_square ${activeHandler()}`}
            style={{ backgroundColor: colorHandler() }}
        >
            {text}
            {rawItem.ph_level >= level_low && rawItem.ph_level <= level_high && <i className="bi bi-bookmark-check"></i>}
        </div>
    )
}

export default HeatSquare