import { React, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from './../../enums';
import { setChosenMeasure } from './../../redux/tableSlice';

const MeasureContainer = memo(
    ({ measureData }) => {

        const chosen = useSelector(state => state.measures.chosenMeasure);
        const dispatch = useDispatch();

        const styleHandler = () => {
            return measureData.id === chosen ? 'pink' : '#121212'
        }

        const chooseMeasure = () => {
            if (chosen === measureData.id) {
                dispatch(setChosenMeasure(null))
            } else {
                dispatch(setChosenMeasure(measureData.id))
            }
        }

        return (
            <div className='measure_item' style={{ backgroundColor: styleHandler() }} onClick={chooseMeasure}>
                <h6>{enums[measureData.day_time]}</h6>
                <div>{measureData.ph_level}</div>
                <div>{measureData.pill_quantity}</div>
            </div>
        )
    }
)

export default MeasureContainer