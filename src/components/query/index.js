import { BCButton, BCTree, BCInput } from '@/commons/components';
import CustomDndTables from '@/components/customdndtables';
import { queries as initialQueries } from '@/data/queries';
import { Drawer } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

const Query = () => {
	const [queries, setQueries] = useState(initialQueries);
	const [selectedQueryId, setSelectedQueryId] = useState(initialQueries[0].id);
	const [columns, setColumns] = useState(initialQueries[0].columns);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [newQueryName, setNewQueryName] = useState('');

	const handleQuerySelect = useCallback(
		selectedKeys => {
			const selectedQuery = queries.find(query => query.id === selectedKeys[0]);
			if (selectedQuery && selectedQuery.id !== selectedQueryId) {
				setSelectedQueryId(selectedQuery.id);
				setColumns(selectedQuery.columns);
			}
		},
		[selectedQueryId, queries]
	);

	const handleColumnsChange = useCallback(updatedColumns => {
		setColumns(updatedColumns);
	}, []);

	const handlePrintColumns = useCallback(() => {
		console.log(columns);
	}, [columns]);

	const handleDeleteQuery = useCallback(() => {
		setQueries(prevQueries => prevQueries.filter(query => query.id !== selectedQueryId));
		const newSelectedQuery = queries.find(query => query.id !== selectedQueryId);
		if (newSelectedQuery) {
			setSelectedQueryId(newSelectedQuery.id);
			setColumns(newSelectedQuery.columns);
		} else if (queries.length > 1) {
			setSelectedQueryId(queries[0].id);
			setColumns(queries[0].columns);
		} else {
			setSelectedQueryId(null);
			setColumns([]);
		}
	}, [selectedQueryId, queries]);

	const handleSetAsDefault = useCallback(() => {
		setQueries(prevQueries =>
			prevQueries.map(query => ({
				...query,
				isDefault: query.id === selectedQueryId
			}))
		);
	}, [selectedQueryId]);

	const handleAddNewQuery = () => {
		const newQuery = {
			id: uuidv4(),
			name: newQueryName,
			columns: []
		};
		setQueries([...queries, newQuery]);
		setIsDrawerVisible(false);
		setNewQueryName('');
	};

	const treeData = useMemo(() => {
		return queries.map(item => ({
			title: item.name,
			key: item.id,
			children: []
		}));
	}, [queries]);

	return (
		<Container>
			<Row className="my-5">
				<Col>
					<Row>
						<Col>
							<BCButton
								type="dashed"
								danger
								onClick={handleDeleteQuery}
								disabled={queries.length < 2}
							>
								Delete
							</BCButton>
						</Col>
						<Col>
							<BCButton
								type="dashed"
								onClick={handleSetAsDefault}
							>
								Set as Default
							</BCButton>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<BCButton
						type="dashed"
						onClick={() => setIsDrawerVisible(true)}
						className="mb-4"
					>
						Add New Query
					</BCButton>
					<BCTree
						treeData={treeData}
						defaultExpandAll
						onSelect={handleQuerySelect}
					/>
				</Col>
				<Col md={8}>
					<DndProvider backend={HTML5Backend}>
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
					</DndProvider>
				</Col>
			</Row>
			<Drawer
				title="Add New Query"
				visible={isDrawerVisible}
				onClose={() => setIsDrawerVisible(false)}
				footer={
					<div style={{ textAlign: 'right' }}>
						<BCButton
							onClick={handleAddNewQuery}
							type="primary"
						>
							Add Query
						</BCButton>
					</div>
				}
			>
				<BCInput
					value={newQueryName}
					onChange={e => setNewQueryName(e.target.value)}
					placeholder="Query Name"
				/>
			</Drawer>
		</Container>
	);
};

export default Query;
