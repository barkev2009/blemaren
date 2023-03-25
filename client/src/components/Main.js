import {React, useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCourse } from '../redux/courseSlice';
import { deleteMeasure, getMeasures } from '../redux/tableSlice';
import { AUTH_ROUTE } from '../utils/consts';
import MeasureInput from './MeasureInput'
import MeasureTable from './MeasureTable'

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chosenMeasure = useSelector(state => state.measures.chosenMeasure);
    const isAuth = useSelector(state => state.app.isAuth);

    const params = useParams();

    const detectKeyDown = (e) => {
        if (e.key === 'Delete' && chosenMeasure !== null) {
            dispatch(deleteMeasure(chosenMeasure))
        }
    }

    const initialGetMeasures = useCallback(
        () => {
          if (!isAuth) {
            navigate(AUTH_ROUTE, {replace: true})
          }
          dispatch(getMeasures(params.id));
          dispatch(setCourse(params.id));
        }, [dispatch, params.id, navigate, isAuth]
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