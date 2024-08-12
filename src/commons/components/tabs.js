import { Tabs } from 'antd';

const { TabPane } = Tabs;

const BCTabs = ({ tabs = [], ...props }) => {
	return (
		<Tabs {...props}>
			{tabs.map(tab => (
				<TabPane
					tab={tab.title}
					key={tab.key}
				>
					{tab.content}
				</TabPane>
			))}
		</Tabs>
	);
};

export default BCTabs;
