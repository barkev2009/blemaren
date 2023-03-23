import {React, useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteMeasure, getMeasures } from '../redux/tableSlice';
import MeasureInput from './MeasureInput'
import MeasureTable from './MeasureTable'

const Main = () => {
    const dispatch = useDispatch();
    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);

    const params = useParams();

    const detectKeyDown = (e) => {
        if (e.key === 'Delete' && chosenMeasure !== null) {
            dispatch(deleteMeasure(chosenMeasure))
        }
    }

    const initialGetMeasures = useCallback(
        () => {
          dispatch(getMeasures(params.id))
        }, [dispatch, params.id]
      )
  
      useEffect(
        () => {
          initialGetMeasures();
        }, [initialGetMeasures]
      );

    return (
        <div className='App' onKeyDown={detectKeyDown} tabIndex='0'>
            <MeasureInput />
            <MeasureTable />
        </div>
    )
}

export default Main