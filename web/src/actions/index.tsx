import * as constants from '../constants';
import {  Message } from '../types/index';

// define action interfaces
export interface AddMessage {
	type: constants.ADD_MESSAGE;
	message: Message;
}

export interface GetMessages {
	type: constants.GET_MESSAGES;
	messages: object;
}

export interface UpdatingComments {
	type: constants.UPDATEING_COMMENTS;
}

export interface UpdatingCommentsSucceed {
	type: constants.UPDATEING_COMMENTS_SUCCEED;
}

export interface UpdatingCommentsRejected {
	type: constants.UPDATEING_COMMENTS_REJECTED;
}

export interface ShowAddMessageModal {
	type: constants.SHOW_ADD_MESSAGE_MODAL;
}

export interface HideAddMessageModal {
	type: constants.HIDE_ADD_MESSAGE_MODAL;
}

// defin action of types
export type AllActions = MessageAction| MessageModalAction;

export type MessageAction = AddMessage|GetMessages|UpdatingComments|UpdatingCommentsSucceed|UpdatingCommentsRejected;
export type MessageModalAction = ShowAddMessageModal| HideAddMessageModal;

// message and comment actions
export function addMessage(message: Message): AddMessage {
	return {
		type: constants.ADD_MESSAGE,
		message: message
	};
}

export function getMessages(messages: object ): GetMessages {
	return {
		type: constants.GET_MESSAGES,
		messages: messages
	};
}

export function updatingComments(): UpdatingComments {
	return {
		type: constants.UPDATEING_COMMENTS,
	};
}

export function updatingCommentsSucceed(): UpdatingCommentsSucceed {
	return {
		type: constants.UPDATEING_COMMENTS_SUCCEED,
	};
}

export function updatingCommentsRejected(): UpdatingCommentsRejected {
	return {
		type: constants.UPDATEING_COMMENTS_REJECTED,
	};
}
// modal controll actions
export function showAddMessageModal(): ShowAddMessageModal {
	return{
		type: constants.SHOW_ADD_MESSAGE_MODAL,
	};
}

export function hideAddMessageModal(): HideAddMessageModal {
	return{
		type: constants.HIDE_ADD_MESSAGE_MODAL,
	};
}
