import { AutoComplete } from 'antd';

const BCAutoComplete = ({ options, value, onChange, placeholder, ...props }) => {
	return (
		<AutoComplete
			options={options}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...props}
		/>
	);
};

export default BCAutoComplete;
