import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCourse, getCoursesByLogin, setCourse } from '../redux/courseSlice';
import { AUTH_ROUTE } from '../utils/consts';
import CourseContainer from './containers/CourseContainer';

const Courses = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.user);
    const courses = useSelector(state => state.course.courses);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!!user.login) {
                dispatch(getCoursesByLogin(user.login));
            }
        }, [user, dispatch]
    );

    const clickHandler = () => {
        const courseData = {
            start_date: new Date(),
            userId: user.id
        }
        dispatch(createCourse(courseData));
    }

    return (
        <div className='courses_container'>
            {
                courses.length !== 0 && courses.map(
                    course => <CourseContainer key={course.id} course={course} />
                )
            }
            <button className="btn btn-outline-primary" onClick={clickHandler}>Добавить курс</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate(AUTH_ROUTE, {replace: true})}>К авторизации</button>
        </div>
    )
}

export default Courses