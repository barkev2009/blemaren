import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeasures, deleteMeasure } from './../redux/tableSlice';
import CycleContainer from './containers/CycleContainer'

const MeasureTable = memo(
  () => {

    const dispatch = useDispatch();
    const dateSplitData = useSelector(state => state.measures.structuredData);
    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);

    useEffect(
      () => {
        dispatch(getMeasures());
      }, []
    );

    const deleteHandler = () => {
      dispatch(deleteMeasure(chosenMeasure))
    }

    return (
      <div>
        <button type="button" className="btn btn-outline-danger" disabled={chosenMeasure === null} onClick={deleteHandler}><i className="bi bi-trash"></i>{`  Удалить измерение`}</button>
        <div className='measure_table_container'>{dateSplitData.map(item => <CycleContainer key={`cycle_${item.cycle}`} cycle={item.cycle} cycleData={item.cycleData} />)}</div>
      </div>

    )
  }
)

export default MeasureTable