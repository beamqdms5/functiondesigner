export const queries = [
	{
		id: 'query1',
		name: 'Query 1',
		columns: [
			{ id: '1', header: 'Code', name: 'code', visible: true, isPrimaryKey: false, order: 1 },
			{ id: '2', header: 'Name', name: 'name', visible: true, isPrimaryKey: false, order: 2 },
			{
				id: '3',
				header: 'Department',
				name: 'department',
				visible: true,
				isPrimaryKey: false,
				order: 3
			},
			{ id: '4', header: 'Id', name: 'id', visible: false, isPrimaryKey: true, order: 4 },
			{
				id: '5',
				header: 'Provider',
				name: 'provider',
				visible: false,
				isPrimaryKey: false,
				order: 5
			}
		]
	},
	{
		id: 'query2',
		name: 'Query 2',
		columns: [
			{
				id: '1',
				header: 'Product Code',
				name: 'productCode',
				visible: true,
				isPrimaryKey: false,
				order: 1
			},
			{
				id: '2',
				header: 'Product Name',
				name: 'productName',
				visible: true,
				isPrimaryKey: false,
				order: 2
			},
			{
				id: '3',
				header: 'Category',
				name: 'category',
				visible: true,
				isPrimaryKey: false,
				order: 3
			},
			{ id: '4', header: 'SKU', name: 'sku', visible: false, isPrimaryKey: true, order: 4 },
			{
				id: '5',
				header: 'Supplier',
				name: 'supplier',
				visible: false,
				isPrimaryKey: false,
				order: 5
			}
		]
	},
	{
		id: 'query3',
		name: 'Query 3',
		columns: [
			{
				id: '1',
				header: 'Identifier',
				name: 'identifier',
				visible: true,
				isPrimaryKey: false,
				order: 1
			},
			{
				id: '2',
				header: 'Description',
				name: 'description',
				visible: true,
				isPrimaryKey: false,
				order: 2
			},
			{
				id: '3',
				header: 'Division',
				name: 'division',
				visible: true,
				isPrimaryKey: false,
				order: 3
			},
			{ id: '4', header: 'Id', name: 'id', visible: false, isPrimaryKey: true, order: 4 },
			{
				id: '5',
				header: 'Vendor',
				name: 'vendor',
				visible: false,
				isPrimaryKey: false,
				order: 5
			}
		]
	}
];
