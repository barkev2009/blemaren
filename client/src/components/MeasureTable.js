import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getMeasures, addYearGroup} from './../redux/tableSlice';
import CycleContainer from './containers/CycleContainer'

const MeasureTable = () => {

    const dispatch = useDispatch();
    const measures = useSelector(state => state.measures.raw);
    const dateSplitData = useSelector(state => state.measures.structuredData);

    useEffect(
        () => {
            dispatch(getMeasures())
        }, []
    );

  return (
    <div className='measure_table_container'>{dateSplitData.map(item => <CycleContainer key={`cycle_${item.cycle}`} cycle={item.cycle} cycleData={item.cycleData}/>)}</div>
  )
}

export default MeasureTable