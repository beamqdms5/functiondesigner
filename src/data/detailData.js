import { v4 as uuidv4 } from 'uuid';

export const initialData = [
	{
		title: 'Column 1',
		key: uuidv4(),
		type: `column-${uuidv4()}`,
		name: 'column',
		children: [
			{
				title: 'Name',
				key: uuidv4(),
				type: 'text',
				name: 'name'
			},
			{
				title: 'Code',
				key: uuidv4(),
				type: 'number',
				name: 'code'
			}
		]
	},
	{
		title: 'Category',
		key: uuidv4(),
		type: 'select',
		name: 'category',
		children: []
	}
];
