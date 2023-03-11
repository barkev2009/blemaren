import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../http/userAPI';
import { setIsAuth, setUser } from '../redux/appSlice';
import { MAIN_ROUTE } from '../utils/consts';

const Auth = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logIn = async () => {
        try {
            const user = await loginAPI(login, password);
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
            setError(null);
            navigate(MAIN_ROUTE);
        } catch (error) {
            setError(error.response.data.message);
        }

    }

    return (
        <div className='auth_container'>
            {error && <div className="alert alert-danger" role="alert">{`Ошибка: ${error}`}</div>}
            <div className="form-group">
                <input type="text" placeholder='Введите логин...' className="form-control mt-4" id="login_input" onChange={e => setLogin(e.target.value)} value={login} />
            </div>
            <div className="form-group">
                <input type="password" placeholder='Введите пароль...' className="form-control mt-4" id="password_input" onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <button type="button" style={{ float: 'right' }} className="btn btn-outline-primary mt-4" onClick={logIn} >{'Войти'}</button>
        </div>
    )
}

export default Auth