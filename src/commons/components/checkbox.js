import { Checkbox } from 'antd';

const BCCheckbox = ({ checked, onChange, children, ...props }) => {
	return (
		<Checkbox
			checked={checked}
			onChange={onChange}
			{...props}
		>
			{children}
		</Checkbox>
	);
};

export default BCCheckbox;
