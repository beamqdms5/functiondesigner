import { Select } from 'antd';

const { Option } = Select;

const BCSelect = ({ options, ...props }) => {
	return (
		<Select {...props}>
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

export { Select };
