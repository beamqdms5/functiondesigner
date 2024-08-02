import { Button } from 'antd';

const BCButton = ({ type, onClick, children, ...props }) => {
	return (
		<Button
			type={type}
			onClick={onClick}
			{...props}
		>
			{children}
		</Button>
	);
};

export default BCButton;
