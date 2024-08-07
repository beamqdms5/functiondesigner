import { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Tree } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BCButton from '@/commons/components/button';
import CustomDndTables from '@/components/customdndtables';
import { queries as initialQueries } from '@/data/queries';

const Query = () => {
	const [queries, setQueries] = useState(initialQueries);
	const [selectedQueryId, setSelectedQueryId] = useState(initialQueries[0].id);
	const [columns, setColumns] = useState(initialQueries[0].columns);

	useEffect(() => {
		console.log(queries);
	}, [queries]);

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
								disabled={queries.length < 2 ? true : false}
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
					<Tree
						treeData={treeData}
						defaultExpandAll
						onSelect={handleQuerySelect}
					/>
				</Col>
				{queries.length > 0 ? (
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
				) : null}
			</Row>
		</Container>
	);
};

export default Query;
