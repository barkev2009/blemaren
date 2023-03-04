import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getMeasures, addYearGroup} from './../redux/tableSlice';
import SimpleContainer from './containers/SimpleContainer';
import DateContainer from './containers/DateContainer';

const MeasureTable = () => {

    const dispatch = useDispatch();
    const measures = useSelector(state => state.measures.raw);
    const dateSplitData = useSelector(state => state.measures.dateSplitData);

    useEffect(
        () => {
            dispatch(getMeasures())
            // dispatch(addYearGroup({date: '2023-04-04', data: {a: 1}}))
        }, []
    );

  return (
    <div className='measure_table_container'>{dateSplitData.map(item => <DateContainer dateData={item}/>)}</div>
  )
}

export default MeasureTable