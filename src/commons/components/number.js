import { Input } from 'antd';

const BCInputNumber = ({ ...props }) => {
	return (
		<Input
			type="number"
			{...props}
		/>
	);
};

export default BCInputNumber;
