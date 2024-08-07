import { useState, useEffect, useCallback, useMemo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Tree } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BCButton from '@/commons/components/button';
import CustomDndTables from '@/components/customdndtables';
import { queries } from '@/data/queries';

const Query = () => {
	const [selectedQueryId, setSelectedQueryId] = useState(queries[0].id);
	const [columns, setColumns] = useState(queries[0].columns);

	const handleQuerySelect = useCallback(
		selectedKeys => {
			const selectedQuery = queries.find(query => query.id === selectedKeys[0]);
			if (selectedQuery && selectedQuery.id !== selectedQueryId) {
				setSelectedQueryId(selectedQuery.id);
				setColumns(selectedQuery.columns);
			}
		},
		[selectedQueryId]
	);

	const handleColumnsChange = useCallback(updatedColumns => {
		setColumns(updatedColumns);
	}, []);

	const handlePrintColumns = useCallback(() => {
		console.log(columns);
	}, [columns]);

	const treeData = useMemo(() => {
		return queries.map(item => ({
			title: item.name,
			key: item.id,
			children: []
		}));
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<Container>
				<Row>
					<Col span={4}>
						<Tree
							treeData={treeData}
							defaultExpandAll
							onSelect={handleQuerySelect}
						/>
					</Col>
					<Col span={8}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
							<CustomDndTables
								initialColumns={columns}
								onColumnsChange={handleColumnsChange}
							/>
							<div className="d-flex align-items justify-content">
								<BCButton onClick={handlePrintColumns}>
									Print Columns to Console
								</BCButton>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</DndProvider>
	);
};

export default Query;
