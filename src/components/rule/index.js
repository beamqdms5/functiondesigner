import { BCButton, BCDrawer, BCInput, BCSelect, BCTree, Select } from '@/commons/components';
import { rules as initialRules } from '@/data/ruleData';
import { useCallback, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const Rule = () => {
	const [rules, setRules] = useState(initialRules);
	const [selectedRuleId, setSelectedRuleId] = useState(initialRules[0].id);
	const [selectedRule, setSelectedRule] = useState(initialRules[0]);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [newRuleName, setNewRuleName] = useState('');

	const handleRuleSelect = useCallback(
		selectedKeys => {
			const selectedRule = rules.find(rule => rule.id === selectedKeys[0]);
			if (selectedRule && selectedRule.id !== selectedRuleId) {
				setSelectedRuleId(selectedRule.id);
				setSelectedRule(selectedRule);
			}
		},
		[selectedRuleId, rules]
	);

	const handleAddCondition = () => {
		const newCondition = {
			id: `${selectedRule.conditions.length + 1}`,
			when: '',
			condition: ''
		};
		const updatedConditions = [...selectedRule.conditions, newCondition];
		updateSelectedRule({ ...selectedRule, conditions: updatedConditions });
	};

	const handleAddAction = () => {
		const newAction = { id: `${selectedRule.actions.length + 1}`, then: '', action: '' };
		const updatedActions = [...selectedRule.actions, newAction];
		updateSelectedRule({ ...selectedRule, actions: updatedActions });
	};

	const updateSelectedRule = updatedRule => {
		const updatedRules = rules.map(rule => (rule.id === updatedRule.id ? updatedRule : rule));
		setRules(updatedRules);
		setSelectedRule(updatedRule);
	};

	const handleSave = () => {
		console.log(rules);
	};

	const treeData = useMemo(() => {
		return rules.map(item => ({
			title: item.name,
			key: item.id,
			children: []
		}));
	}, [rules]);

	const handleAddNewRule = () => {
		const newRule = {
			id: uuidv4(),
			name: newRuleName,
			conditions: [],
			actions: []
		};
		setRules([...rules, newRule]);
		setIsDrawerVisible(false);
		setNewRuleName('');
	};

	return (
		<Container>
			<Row className="my-5">
				<Col md={4}>
					<BCButton
						type="dashed"
						onClick={() => setIsDrawerVisible(true)}
						className="mb-4"
					>
						Add New Rule
					</BCButton>
					<BCTree
						treeData={treeData}
						defaultExpandAll
						onSelect={handleRuleSelect}
					/>
				</Col>
				<Col md={8}>
					<Row className="mb-3">
						<Col>
							<BCInput
								value={selectedRule.name}
								onChange={e =>
									updateSelectedRule({ ...selectedRule, name: e.target.value })
								}
								placeholder="Name"
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Conditions</h5>
						</Col>
					</Row>
					{selectedRule.conditions.map(condition => (
						<Row
							key={condition.id}
							className="mb-3"
						>
							<Col>
								<BCSelect
									value={condition.when}
									onChange={value => {
										const updatedConditions = selectedRule.conditions.map(
											cond =>
												cond.id === condition.id
													? { ...cond, when: value }
													: cond
										);
										updateSelectedRule({
											...selectedRule,
											conditions: updatedConditions
										});
									}}
									placeholder="When"
									style={{ width: '45%', marginRight: '10%' }}
								>
									<Option value="option1">Option 1</Option>
									<Option value="option2">Option 2</Option>
								</BCSelect>
								<BCSelect
									value={condition.condition}
									onChange={value => {
										const updatedConditions = selectedRule.conditions.map(
											cond =>
												cond.id === condition.id
													? { ...cond, condition: value }
													: cond
										);
										updateSelectedRule({
											...selectedRule,
											conditions: updatedConditions
										});
									}}
									placeholder="Condition"
									style={{ width: '45%' }}
								>
									<Option value="option1">Option 1</Option>
									<Option value="option2">Option 2</Option>
								</BCSelect>
							</Col>
						</Row>
					))}
					<Row className="mb-3">
						<Col>
							<BCButton onClick={handleAddCondition}>Add New Condition</BCButton>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Actions</h5>
						</Col>
					</Row>
					{selectedRule.actions.map(action => (
						<Row
							key={action.id}
							className="mb-3"
						>
							<Col>
								<BCSelect
									value={action.then}
									onChange={value => {
										const updatedActions = selectedRule.actions.map(act =>
											act.id === action.id ? { ...act, then: value } : act
										);
										updateSelectedRule({
											...selectedRule,
											actions: updatedActions
										});
									}}
									placeholder="Then"
									style={{ width: '45%', marginRight: '10%' }}
								>
									<Option value="option1">Option 1</Option>
									<Option value="option2">Option 2</Option>
								</BCSelect>
								<BCSelect
									value={action.action}
									onChange={value => {
										const updatedActions = selectedRule.actions.map(act =>
											act.id === action.id ? { ...act, action: value } : act
										);
										updateSelectedRule({
											...selectedRule,
											actions: updatedActions
										});
									}}
									placeholder="Action"
									style={{ width: '45%' }}
								>
									<Option value="option1">Option 1</Option>
									<Option value="option2">Option 2</Option>
								</BCSelect>
							</Col>
						</Row>
					))}
					<Row className="mb-3">
						<Col>
							<BCButton onClick={handleAddAction}>Add New Action</BCButton>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
							<BCButton
								type="primary"
								onClick={handleSave}
							>
								Save
							</BCButton>
						</Col>
					</Row>
				</Col>
			</Row>
			<BCDrawer
				title="Add New Rule"
				visible={isDrawerVisible}
				onClose={() => setIsDrawerVisible(false)}
				footer={
					<div style={{ textAlign: 'right' }}>
						<BCButton
							onClick={handleAddNewRule}
							type="primary"
						>
							Add Rule
						</BCButton>
					</div>
				}
			>
				<BCInput
					value={newRuleName}
					onChange={e => setNewRuleName(e.target.value)}
					placeholder="Rule Name"
				/>
			</BCDrawer>
		</Container>
	);
};

export default Rule;
