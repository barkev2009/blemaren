import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getCoursesByLogin, setCourse } from '../redux/courseSlice';
import CourseContainer from './containers/CourseContainer';

const Courses = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.user);
    const courses = useSelector(state => state.course.courses);

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
        </div>
    )
}

export default Courses