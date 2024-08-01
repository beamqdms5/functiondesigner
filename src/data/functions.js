export const data = [
	{
		title: 'Functions',
		key: '0-0',
		expanded: true,
		children: [
			{
				title: 'Work Order',
				key: '0-0-0',
				type: 'grid',
				children: [
					{
						title: 'Statuses',
						key: '0-0-1-0',
						type: 'status'
					},
					{
						title: 'Queries',
						key: '0-0-2-0',
						type: 'query'
					},
					{
						title: 'Detail Page',
						key: '0-0-3-0',
						type: 'detail',
						children: [
							{
								title: 'Rules',
								key: '0-0-3-1',
								type: 'rule'
							}
						]
					}
				]
			},
			{
				title: 'Work Request',
				key: '0-0-2',
				type: 'grid',
				children: [
					{
						title: 'Statuses',
						key: '0-0-2-0',
						type: 'status'
					},
					{
						title: 'Queries',
						key: '0-0-2-1',
						type: 'query'
					},
					{
						title: 'Detail Page',
						key: '0-0-2-3',
						type: 'detail',
						children: [
							{
								title: 'Rules',
								key: '0-0-2-4',
								type: 'rule'
							}
						]
					}
				]
			}
		]
	}
];
