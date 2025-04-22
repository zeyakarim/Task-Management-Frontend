import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuth } from '../store/authSlice';
import axiosInstance from '../utility/axios-instance';

const Auth = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const getMe = () => {

		axiosInstance
			.get('/users/getMe')
			.then((res) => {
				dispatch(
					setAuth({
						authenticated: true,
						user: res.data.data,
						loading: false,
					})
				);
			})
			.catch((error) => {
				dispatch(setAuth({ loading: false }));

                console.error('Auth check failed:', error?.response || error);

				if (location.pathname !== '/signin') {
					navigate('/signin');
				}
			});
	};

	useEffect(() => {
		getMe();
	}, []);

	return (
		<div className="d-flex justify-content-center align-items-center vw-100 vh-100">
			<div
				className="spinner-border"
				style={{ width: '3rem', height: '3rem' }}
				role="status"
			></div>
		</div>
	);
};

export default Auth;