import { Input } from 'antd';

const BCInput = ({ placeholder, value, onChange, ...props }) => {
	return (
		<Input
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
};

export default BCInput;
