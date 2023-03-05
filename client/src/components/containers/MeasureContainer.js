import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from './../../enums';
import {setChosenMeasure} from './../../redux/tableSlice';

const MeasureContainer = ({ measureData }) => {

    const chosen = useSelector(state => state.measures.chosenMeasure);
    const dispatch = useDispatch();

    const styleHandler = () => {
        return measureData.id === chosen ? 'pink' : 'white'
    }

    const chooseMeasure = () => {
        dispatch(setChosenMeasure(measureData.id))
    }

    return (
        <div style={ {backgroundColor: styleHandler()}} onClick={chooseMeasure}>
            <h6>{enums[measureData.day_time]}</h6>
            <div>{measureData.ph_level}</div>
            <div>{measureData.pill_quantity}</div>
        </div>
    )
}

export default MeasureContainer