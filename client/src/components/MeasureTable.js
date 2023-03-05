import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeasures, deleteMeasure } from './../redux/tableSlice';
import CycleContainer from './containers/CycleContainer'

const MeasureTable = () => {

  const dispatch = useDispatch();
  const measures = useSelector(state => state.measures.raw);
  const dateSplitData = useSelector(state => state.measures.structuredData);
  const chosenMeasure = useSelector(state => state.measures.chosenMeasure);

  useEffect(
    () => {
      dispatch(getMeasures())
    }, []
  );

  const deleteHandler = () => {
    dispatch(deleteMeasure(chosenMeasure))
  }

  return (
    <div>
      <button type="button" className="btn btn-danger" disabled={chosenMeasure === null} onClick={deleteHandler}>Удалить измерение</button>
      <div className='measure_table_container'>{dateSplitData.map(item => <CycleContainer key={`cycle_${item.cycle}`} cycle={item.cycle} cycleData={item.cycleData} />)}</div>
    </div>

  )
}

export default MeasureTable