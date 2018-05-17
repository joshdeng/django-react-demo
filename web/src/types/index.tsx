
export interface StoreState {
	messages: MessageStoreState;
	addMessageModal: MessageModalState;
}

export interface MessageStoreState {
	messages: {
		content:  Message[];
	};
	isFetching: boolean;

}

export interface Message {
	id?: number;
	messageID: string;
	username: string;
	content: string;
	fireID?: string;
	comments?: string[];
}

export interface MessageModalState {
	show: boolean;
}

export interface Comment {
	commentID: number;
	content: string;
	// tslint:disable-next-line
	message?: any;
}
