import { Form } from 'antd';

const BCForm = ({ formItems, ...props }) => {
	return (
		<Form {...props}>
			{formItems.map((item, index) => (
				<Form.Item
					key={index}
					label={item.label}
					name={item.name}
					rules={item.rules}
					valuePropName={item.valuePropName}
				>
					{item.component}
				</Form.Item>
			))}
		</Form>
	);
};

export default BCForm;
