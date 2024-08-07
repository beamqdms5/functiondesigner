import { Select } from 'antd';

const { Option } = Select;

const BCSelect = ({ options, value, onChange, placeholder, ...props }) => {
	return (
		<Select
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...props}
		>
			{options?.map((option, index) => (
				<Option
					key={index}
					value={option.value}
				>
					{option.label}
				</Option>
			))}
		</Select>
	);
};

export default BCSelect;
