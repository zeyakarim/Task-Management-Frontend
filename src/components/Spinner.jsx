import { CircularProgress } from "@mui/material";

const Spinner = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f5f5f566',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 1400,
			}}
		>
            <CircularProgress />
		</div>
	);
};

export default Spinner;
