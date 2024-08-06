import { v4 as uuidv4 } from 'uuid';

export const initialData = [
	{
		title: 'Department',
		key: '0-0',
		type: 'select',
		name: 'department',
		children: [
			{
				title: 'Column',
				key: '0-0-0',
				type: `column-${uuidv4()}`,
				name: 'column',
				children: [
					{
						title: 'Name',
						key: '0-0-0-0',
						type: 'text',
						name: 'name'
					},
					{
						title: 'Code',
						key: '0-0-0-1',
						type: 'number',
						name: 'code'
					}
				]
			}
		]
	}
];
