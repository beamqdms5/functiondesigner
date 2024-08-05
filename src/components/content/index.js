import { data } from '@/data/functions';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Detail from '@/components/detail';
import Grid from '@/components/grid';
import Query from '@/components/query';
import Rule from '@/components/rule';
import Status from '@/components/status';

import BCTree from '@/commons/components/tree';

const Content = () => {
	const [selectedTab, setSelectedTab] = useState(null);

	const onSelect = (selectedKeys, info) => {
		const selectedTabName = info.node.type;
		setSelectedTab(selectedTabName);
	};

	const renderContent = () => {
		switch (selectedTab) {
			case 'grid':
				return <Grid />;
			case 'status':
				return <Status />;
			case 'query':
				return <Query />;
			case 'detail':
				return <Detail />;
			case 'rule':
				return <Rule />;
			default:
				return <div>boş</div>;
		}
	};

	return (
		<Container
			fluid
			className="vh-100 d-flex flex-column content"
		>
			<Row>
				<Col
					className="menu"
					md={3}
				>
					<Row className="justify-content-center">
						<Col
							style={{
								textAlign: 'center',
								backgroundColor: '#eeeeee',
								padding: '20px'
							}}
						>
							<b style={{ color: '#999999' }}>Function Designer</b>
						</Col>
					</Row>
					<Row>
						<Col
							style={{
								padding: '20px 5px'
							}}
						>
							<BCTree
								defaultExpandedKeys={['0-0', '0-0-1', '0-0-2-0']}
								treeData={data}
								onSelect={onSelect}
							/>
						</Col>
					</Row>
				</Col>
				<Col md={9}>
					<Row>
						<Col>{renderContent()}</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Content;
