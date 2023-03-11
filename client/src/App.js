import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import { check } from './http/userAPI';
import { setIsAuth, setUser } from './redux/appSlice';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkAuth = useCallback(
    () => {
      check().then(
        user => {
          dispatch(setUser(user));
          dispatch(setIsAuth(true));
        }
      ).finally(setLoading(false));
    }, [dispatch]
  )

  useEffect(
    () => {
      checkAuth()
    }, [checkAuth]
  )

  if (loading) {
    return <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
