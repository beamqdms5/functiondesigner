import { Input } from 'antd';

const { TextArea } = Input;

const BCTextArea = ({ ...props }) => {
	return <TextArea {...props} />;
};

export default BCTextArea;
