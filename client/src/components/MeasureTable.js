import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeasures, deleteMeasure, setAvgOnly } from './../redux/tableSlice';
import CycleContainer from './containers/CycleContainer'

const MeasureTable = memo(
  () => {

    const dispatch = useDispatch();
    const dateSplitData = useSelector(state => state.measures.structuredData);
    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const avgOnly = useSelector(state => state.measures.avgOnly);

    const initialGetMeasures = useCallback(
      () => {
        dispatch(getMeasures())
      }, [dispatch]
    )

    useEffect(
      () => {
        initialGetMeasures();
      }, [initialGetMeasures]
    );

    const deleteHandler = () => {
      dispatch(deleteMeasure(chosenMeasure))
    }

    const toggleHandler = () => {
      dispatch(setAvgOnly(!avgOnly))
    }

    return (
      <div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={toggleHandler} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Только средние показатели</label>
        </div>
        <button type="button" className="btn btn-outline-danger" disabled={chosenMeasure === null} onClick={deleteHandler}><i className="bi bi-trash"></i>{`  Удалить измерение`}</button>
        <div className='measure_table_container'>{dateSplitData.map(item => <CycleContainer key={`cycle_${item.cycle}`} cycle={item.cycle} cycleData={item.cycleData} />)}</div>
      </div>

    )
  }
)

export default MeasureTable