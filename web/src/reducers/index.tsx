import { MessageAction, MessageModalAction } from '../actions';
import { MessageStoreState, MessageModalState } from '../types/index';
import * as Constants from '../constants/index';
import { objToArray } from '../utils/utils';
import { combineReducers } from 'redux';

// message reducer
export function messages (state: MessageStoreState, action: MessageAction): MessageStoreState {
	switch (action.type) {

		case Constants.ADD_MESSAGE:
			return { ...state, messages: { content: [...state.messages.content, action.message] }};
		case Constants.GET_MESSAGES:
			return {...state, messages: { content: objToArray(action.messages).reverse()}};
		case Constants.UPDATEING_COMMENTS:
			return {...state, isFetching: true};
		case Constants.UPDATEING_COMMENTS_SUCCEED:
			return {...state, isFetching: false};
		case Constants.UPDATEING_COMMENTS_REJECTED:
			return {...state, isFetching: false};
		default:
			return { ...state};
		
	}
}

// modal reducer
export function addMessageModal (state: MessageModalState, action: MessageModalAction): MessageModalState {
	switch (action.type) {

		case Constants.SHOW_ADD_MESSAGE_MODAL:
			return {...state, show: true};
		case Constants.HIDE_ADD_MESSAGE_MODAL:
			return {...state, show: false};
		default:
			return { ...state};
		
	}
}

// conbine reducers
const rootReducer = combineReducers({
	messages,
	addMessageModal
});

export default rootReducer;