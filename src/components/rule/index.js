import { Container, Row, Col } from 'react-bootstrap';
import CustomTree from '@/commons/components/customTree';
import { initialData } from '@/data/detailData';

const Rule = () => {
	return (
		<Container>
			<Row>
				<Col>
					<CustomTree initialData={initialData[0]} />
				</Col>
				<Col>
					<CustomTree initialData={initialData[1]} />
				</Col>
			</Row>
		</Container>
	);
};

export default Rule;
