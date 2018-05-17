import { messages, addMessageModal } from '../reducers/index';
import * as constants from '../constants/index';
import { MessageStoreState, MessageModalState } from '../types/index';

// define variables for tests
const testData = {
	username: 'test-name',
	content: 'test-content',
	messageID: 10
};

const initMessageState: MessageStoreState = {
	messages: {
		content: [{messageID: 0, username: 'loading ...', content: 'loading ...'}]
	},
	isFetching: false
};

const initModalState: MessageModalState = {
	show: false
};

// test message reducer
describe('Testing Message Reducer', function() {

	// add message
	it('should add new message', function() {
		expect(messages(initMessageState, {
			type: constants.ADD_MESSAGE,
			message: testData
		})).toEqual({
			messages: {
				content: [
					{
						messageID: 0, 
						username: 'loading ...', 
						content: 'loading ...'
					},
					{
						messageID: 10,
						username: 'test-name',
						content: 'test-content'
						
					}

				]
			},
			isFetching: false
		});
	});

	// get messages
	it ('should get messages', function() {
		expect(messages(initMessageState, {
			type: constants.GET_MESSAGES,
			messages: {
				'a': {
					username: 'test-name-1',
					content: 'test-content-1',
					messageID: 0
				},
				'b': {
					username: 'test-name-2',
					content: 'test-content-2',
					messageID: 1
				},
				'c': {
					username: 'test-name-2',
					content: 'test-content-2',
					messageID: 2
				},
			}
		})).toEqual(
			{
				messages: {
					content: [
						{
							username: 'test-name-2',
							content: 'test-content-2',
							messageID: 2,
							fireID: 'c'
						},
						{
							username: 'test-name-2',
							content: 'test-content-2',
							messageID: 1,
							fireID: 'b'
						},
						{
							username: 'test-name-1',
							content: 'test-content-1',
							messageID: 0,
							fireID: 'a'
						},
						
					]
				},
				isFetching: false
			}
		);
	});
});

// test comments reducer
describe('Test comments reducer', function() {

	// update comments request
	it('Should change state to fetching while updating comments to a message', function() {
		expect(messages(initMessageState, {
			type: constants.UPDATEING_COMMENTS
		})).toEqual({
			messages: {
				content: [{messageID: 0, username: 'loading ...', content: 'loading ...'}]
			},
			isFetching: true
		});
	});

	// update comments succeed
	it('Should change state to fetching if updating comments to a message succeed', function() {
		expect(messages(initMessageState, {
			type: constants.UPDATEING_COMMENTS_SUCCEED
		})).toEqual({
			messages: {
				content: [{messageID: 0, username: 'loading ...', content: 'loading ...'}]
			},
			isFetching: false
		});
	});
});

// test add message modal reducer
describe('Test add message modal reducer', function() {

	// test show modal
	it('Should change state hide to true', function() {
		expect(addMessageModal(initModalState, {
			type: constants.SHOW_ADD_MESSAGE_MODAL
		})).toEqual({
				show: true
		});
	});

	// test hide modal
	it('Should change state hide to true', function() {
		expect(addMessageModal(initModalState, {
			type: constants.HIDE_ADD_MESSAGE_MODAL
		})).toEqual(
			{
				show: false
			}
		);
	});

});