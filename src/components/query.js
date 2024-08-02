import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from 'antd';
import { initialColumns } from '@/data/queries';

const ItemType = 'ROW';

const DraggableRow = ({ record, index, moveRow, fromTable }) => {
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: ItemType,
		hover: draggedItem => {
			if (draggedItem.index !== index || draggedItem.fromTable !== fromTable) {
				moveRow(draggedItem.index, index, draggedItem.fromTable, fromTable);
				draggedItem.index = index;
				draggedItem.fromTable = fromTable;
			}
		}
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { index, record, fromTable },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});

	drag(drop(ref));

	return (
		<tr
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className="ant-table-row"
		>
			<td>{record.name}</td>
		</tr>
	);
};

const DroppableBody = ({ data, fromTable, moveRow }) => {
	const [, drop] = useDrop({
		accept: ItemType,
		drop: draggedItem => {
			if (data.length === 0) {
				moveRow(draggedItem.index, 0, draggedItem.fromTable, fromTable);
				draggedItem.index = 0;
				draggedItem.fromTable = fromTable;
			}
		}
	});

	return (
		<tbody
			ref={drop}
			className="ant-table-tbody"
		>
			{data.length === 0 ? (
				<tr className="ant-table-row">
					<td style={{ height: '40px' }} />
				</tr>
			) : (
				data.map((record, index) => (
					<DraggableRow
						key={record.id}
						record={record}
						index={index}
						moveRow={moveRow}
						fromTable={fromTable}
					/>
				))
			)}
		</tbody>
	);
};

const Query = () => {
	const [visibleColumn, setVisibleColumn] = useState([]);
	const [hiddenColumn, setHiddenColumn] = useState([]);

	useEffect(() => {
		const visibleCols = initialColumns.filter(col => col.visible);
		const hiddenCols = initialColumns.filter(col => !col.visible);
		setVisibleColumn(visibleCols);
		setHiddenColumn(hiddenCols);
	}, []);

	const moveRow = (fromIndex, toIndex, fromTable, toTable) => {
		const fromData = fromTable === 'visibleColumn' ? visibleColumn : hiddenColumn;
		const toData = toTable === 'visibleColumn' ? visibleColumn : hiddenColumn;

		if (fromTable === toTable) {
			const movedItem = fromData.splice(fromIndex, 1)[0];
			fromData.splice(toIndex, 0, movedItem);
			if (fromTable === 'visibleColumn') setVisibleColumn([...fromData]);
			else setHiddenColumn([...fromData]);
		} else {
			const movedItem = fromData.splice(fromIndex, 1)[0];
			toData.splice(toIndex, 0, movedItem);
			if (fromTable === 'visibleColumn') {
				setVisibleColumn([...fromData]);
				setHiddenColumn([...toData]);
			} else {
				setHiddenColumn([...fromData]);
				setVisibleColumn([...toData]);
			}
		}
	};

	const renderTable = (data, setData, fromTable) => (
		<Table
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
							setData={setData}
							fromTable={fromTable}
							moveRow={moveRow}
						/>
					),
					row: DraggableRow
				}
			}}
		/>
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
				{renderTable(visibleColumn, setVisibleColumn, 'visibleColumn')}
				{renderTable(hiddenColumn, setHiddenColumn, 'hiddenColumn')}
			</div>
		</DndProvider>
	);
};

export default Query;
