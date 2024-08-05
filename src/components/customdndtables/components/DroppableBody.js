import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableRow from './DraggableRow';
import { ItemType } from '../functions/helper';

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

export default DroppableBody;
