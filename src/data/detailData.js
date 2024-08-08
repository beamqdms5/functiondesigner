import { v4 as uuidv4 } from 'uuid';

export const initialData = [
	{
		title: 'Column 1',
		key: uuidv4(),
		type: `column`,
		name: 'column1',
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
			},
			{
				title: 'Tab Menu',
				key: uuidv4(),
				type: 'tabs',
				name: 'tabmenu'
			}
		]
	},
	{
		title: 'Column 2',
		key: uuidv4(),
		type: `column`,
		name: 'column2',
		children: [
			{
				title: 'Category',
				key: uuidv4(),
				type: 'select',
				name: 'category'
			},
			{
				title: 'Description',
				key: uuidv4(),
				type: 'text',
				name: 'description'
			},
			{
				title: 'Group 1',
				key: uuidv4(),
				type: 'group',
				name: 'group1'
			},
			{
				title: 'Grid 1',
				key: uuidv4(),
				type: 'grid',
				name: 'grid1'
			}
		]
	}
];

export const allowedChildTypes = {
	column: ['text', 'number', 'boolean', 'date', 'select', 'file', 'group', 'grid', 'tabs'],
	tabs: ['tab'],
	tab: ['text', 'number', 'boolean', 'date', 'select', 'file', 'group', 'grid'],
	group: ['text', 'number', 'boolean', 'date', 'select', 'file'],
	grid: ['gridColumn']
};
