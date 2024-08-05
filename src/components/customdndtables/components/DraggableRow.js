import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemType } from '../functions/helper';

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
			<td>{record.header}</td>
		</tr>
	);
};

export default DraggableRow;
