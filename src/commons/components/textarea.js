import { Input } from 'antd';

const { TextArea } = Input;

const BCTextArea = ({ value, onChange, placeholder, ...props }) => {
	return (
		<TextArea
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...props}
		/>
	);
};

export default BCTextArea;
