import { Col, Row } from 'antd';

const BCRow = ({ columns, gutter = [16, 16], ...props }) => {
	return (
		<Row
			gutter={gutter}
			{...props}
		>
			{columns.map((col, index) => (
				<Col
					key={index}
					span={col.span}
				>
					{col.content}
				</Col>
			))}
		</Row>
	);
};

export default BCRow;
