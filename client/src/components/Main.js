import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeasure } from '../redux/tableSlice';
import MeasureInput from './MeasureInput'
import MeasureTable from './MeasureTable'

const Main = () => {
    const dispatch = useDispatch();
    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);

    const detectKeyDown = (e) => {
        if (e.key === 'Delete' && chosenMeasure !== null) {
            dispatch(deleteMeasure(chosenMeasure))
        }
    }
    return (
        <div className='App' onKeyDown={detectKeyDown} tabIndex='0'>
            <MeasureInput />
            <MeasureTable />
        </div>
    )
}

export default Main