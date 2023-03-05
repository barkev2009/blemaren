import { useDispatch, useSelector } from "react-redux";
import MeasureInput from "./components/MeasureInput";
import MeasureTable from "./components/MeasureTable";
import {deleteMeasure} from './redux/tableSlice';

function App() {

  const dispatch = useDispatch();
  const chosenMeasure = useSelector(state => state.measures.chosenMeasure);

  const detectKeyDown = (e) => {
    if (e.key === 'Delete' && chosenMeasure !== null) {
      dispatch(deleteMeasure(chosenMeasure))
    }
  }

  return (
    <div className="App" onKeyDown={detectKeyDown} tabIndex='0'>
      <MeasureInput />
      <MeasureTable />
    </div>
  );
}

export default App;
