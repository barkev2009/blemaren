import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getMeasures} from './../redux/tableSlice';

const MeasureTable = () => {

    const dispatch = useDispatch();
    const measures = useSelector(state => state.measures);

    useEffect(
        () => {
            dispatch(getMeasures())
        }, []
    );

  return (
    <div className='measure_table_container'>{measures.map(item => <div key={item.id}>{JSON.stringify(item)}</div>)}</div>
  )
}

export default MeasureTable