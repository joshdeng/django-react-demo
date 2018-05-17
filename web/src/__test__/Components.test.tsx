import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Sinon from 'sinon';

import FloatButton from '../components/FloatButton';
import Messages from '../components/Messages';
import Comments from '../components/Comments';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// test components
describe('components', () => {
	// test float button for toggling add message modal
	describe('FloatButton', () => {
		// render test
		it('should render self and subcomponents', () => {
			const wrapper  = Enzyme.shallow(<FloatButton />);
			expect(wrapper.exists()).toBe(true);
			expect(wrapper.contains(<ContentAdd/>)).toBe(true);
		});

		// test on click
		it('Simulate click events', () => {
			const onButtonClick = Sinon.spy();
			const wrapper  = Enzyme.shallow(<FloatButton showModal={onButtonClick} hideModal={onButtonClick}/>);
			wrapper.find(FloatingActionButton).simulate('click');
			expect(onButtonClick.calledOnce).toEqual(true);
	});

	// test message list
	describe('Messages', () => {
		// test rendering itself and list item
		it('should render self and subcomponents', () => {
			const mockMessages = [
				{messageID: 0, username: 'test0', content: 'test0'},
				{messageID: 0, username: 'test1', content: 'test1'}
			];
			const getMessages = Sinon.spy();
			const updatingComments = Sinon.spy();
			const updatingCommentsSucceed = Sinon.spy();

			const wrapper  = Enzyme.shallow(
				<Messages 
					messages={mockMessages} 
					getMessages={getMessages} 
					updatingComments={updatingComments}
					updatingCommentsSucceed={updatingCommentsSucceed}
				/>
			);

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.contains('test0')).toBe(true);
			expect(wrapper.contains('test1')).toBe(true);
		});
	});

	// test comment list
	describe('Comments', () => {
		// test rendering it self and comment list items
		it('should render self and subcomponents', () => {
			const mockComments = [
				{commentID: 0, content: 'test0'},
				{commentID: 0, content: 'test1'}
			];
			const updatingComments = Sinon.spy();
			const updatingCommentsSucceed = Sinon.spy();

			const wrapper  = Enzyme.shallow(
				<Comments 
					isFetching={false}
					toggle={true}
					comments={mockComments}
				/>
			);

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.contains('test0')).toBe(true);
			expect(wrapper.contains('test1')).toBe(true);
		});
	});

	// test add message modal
	describe('AddMessage', () => {
		// test rendering itself
		it('should render self', () => {
			const mockComments = [
				{commentID: 0, content: 'test0'},
				{commentID: 0, content: 'test1'}
			];
			const addMessage = Sinon.spy();
			const hideModal = Sinon.spy();
			const getMessages = Sinon.spy();

			const wrapper  = Enzyme.shallow(
				<Comments 
					addMessage={addMessage}
					hideModal={hideModal}
					getMessages={getMessages}
					modalStatus={true}
				/>
			);
			expect(wrapper.exists()).toBe(true);
		});
	});
});
