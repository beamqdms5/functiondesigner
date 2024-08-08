import { BCButton, BCTable } from '@/commons/components';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddColumnDrawer from './components/AddColumnDrawer';
import DraggableRow from './components/DraggableRow';
import DroppableBody from './components/DroppableBody';
import { moveRow } from './functions/helper';

const CustomDndTables = ({ initialColumns, onColumnsChange }) => {
	const [columns, setColumns] = useState(initialColumns);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const visibleColumn = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);
	const hiddenColumn = columns.filter(col => !col.visible).sort((a, b) => a.order - b.order);

	useEffect(() => {
		setColumns(initialColumns);
	}, [initialColumns]);

	useEffect(() => {
		onColumnsChange(columns);
	}, [columns, onColumnsChange]);

	const addColumn = newColumn => {
		const newId = (columns.length + 1).toString();
		setColumns([
			...columns,
			{ id: newId, ...newColumn, order: columns.length + 1, visible: false }
		]);
	};

	const renderTable = (data, fromTable) => (
		<BCTable
			columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
			dataSource={data}
			pagination={false}
			rowKey="id"
			components={{
				body: {
					wrapper: props => (
						<DroppableBody
							{...props}
							data={data}
							fromTable={fromTable}
							moveRow={(fromIndex, toIndex, fromTable, toTable) =>
								moveRow(
									fromIndex,
									toIndex,
									fromTable,
									toTable,
									visibleColumn,
									hiddenColumn,
									setColumns
								)
							}
						/>
					),
					row: DraggableRow
				}
			}}
		/>
	);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
				{renderTable(visibleColumn, 'visibleColumn')}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{renderTable(hiddenColumn, 'hiddenColumn')}
					<BCButton
						type="dashed"
						onClick={() => setDrawerOpen(true)}
						style={{ marginTop: 16, width: '100%' }}
					>
						<PlusOutlined /> Add Column
					</BCButton>
				</div>
			</div>
			<AddColumnDrawer
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				onAddColumn={addColumn}
			/>
		</div>
	);
};

export default CustomDndTables;
