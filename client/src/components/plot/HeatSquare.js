import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenMeasure } from '../../redux/tableSlice';

const HeatSquare = ({ rawItem }) => {

    const [text, setText] = useState('');

    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const dispatch = useDispatch();

    const colorHandler = () => {
        if (rawItem.ph_level >= 6.8 && rawItem.ph_level <= 7.2) {
            return '#00800080'; // green
        }
        switch (rawItem.ph_level) {
            case 7.5:
                return '#021f02';
            case 7.4:
                return '#032b03';
            case 7.3:
                return '#053705';
            case 6.7:
                return '#3d4909';
            case 6.6:
                return '#4c580b';
            case 6.5:
                return '#61710a';
            case 6.4:
                return '#80750a';
            case 6.3:
                return '#a19306';
            case 6.2:
                return '#a17f06';
            case 6.1:
                return '#a16506';
            case 6:
                return '#a13b06';
            case 5.9:
                return '#a10606';
            case 5.8:
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
            {rawItem.ph_level >= 7 && rawItem.ph_level <= 7.2 && <i className="bi bi-bookmark-check"></i>}
        </div>
    )
}

export default HeatSquare