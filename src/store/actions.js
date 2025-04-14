import { reset as ra } from './authSlice';

const resetState = (dispatch) => {
	dispatch(ra());
};

export default resetState;
