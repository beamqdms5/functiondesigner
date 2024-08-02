import { InputNumber } from 'antd';

const BCInputNumber = ({ value, onChange, ...props }) => {
	return (
		<InputNumber
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
};

export default BCInputNumber;
