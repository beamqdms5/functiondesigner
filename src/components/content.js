import { Tree } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { data } from '@/data/functions';

const Content = () => {
	return (
		<Container
			fluid
			className="vh-100 d-flex flex-column content"
		>
			<Row className="vh-100">
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
							<Tree
								defaultExpandedKeys={['0-0', '0-0-1', '0-0-2-0']}
								treeData={data}
							/>
						</Col>
					</Row>
				</Col>
				<Col md={9}>
					<Row>
						<Col>CONTENT</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Content;
