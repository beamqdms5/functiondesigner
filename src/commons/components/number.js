import { Input } from 'antd';

const BCInputNumber = ({ value, onChange, ...props }) => {
	return (
		<Input
			type="number"
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
};

export default BCInputNumber;
