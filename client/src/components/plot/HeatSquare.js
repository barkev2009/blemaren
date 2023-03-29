import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenMeasure } from '../../redux/tableSlice';

const HeatSquare = ({ rawItem }) => {

    const [text, setText] = useState('');

    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const dispatch = useDispatch();

    const colorHandler = () => {
        if (rawItem.ph_level >= process.env.REACT_APP_LIMIT_LOW && rawItem.ph_level <= process.env.REACT_APP_LIMIT_HIGH) {
            return '#00800080'; // green
        }
        switch (rawItem.ph_level) {
            case process.env.REACT_APP_LIMIT_HIGH + 0.3:
                return '#021f02';
            case process.env.REACT_APP_LIMIT_HIGH + 0.2:
                return '#032b03';
            case process.env.REACT_APP_LIMIT_HIGH + 0.1:
                return '#053705';
            case process.env.REACT_APP_LIMIT_LOW - 0.1:
                return '#3d4909';
            case process.env.REACT_APP_LIMIT_LOW - 0.2:
                return '#4c580b';
            case process.env.REACT_APP_LIMIT_LOW - 0.3:
                return '#61710a';
            case process.env.REACT_APP_LIMIT_LOW - 0.4:
                return '#80750a';
            case process.env.REACT_APP_LIMIT_LOW - 0.5:
                return '#a19306';
            case process.env.REACT_APP_LIMIT_LOW - 0.6:
                return '#a17f06';
            case process.env.REACT_APP_LIMIT_LOW - 0.7:
                return '#a16506';
            case process.env.REACT_APP_LIMIT_LOW - 0.8:
                return '#a13b06';
            case process.env.REACT_APP_LIMIT_LOW - 0.9:
                return '#a10606';
            case process.env.REACT_APP_LIMIT_LOW - 1:
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
            {rawItem.ph_level >= process.env.REACT_APP_LIMIT_LOW && rawItem.ph_level <= process.env.REACT_APP_LIMIT_HIGH && <i className="bi bi-bookmark-check"></i>}
        </div>
    )
}

export default HeatSquare