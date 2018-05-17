
import * as React from 'react';
import * as actions from '../actions/';
import {  Message, StoreState } from '../types/index';
import Messages from '../components/Messages';
import AddMessage from '../components/AddMessage';
import FloatButton from '../components/FloatButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect, Dispatch } from 'react-redux';

// define props for app
export interface Props {

	content?: Message[];
	modalStatus: boolean;
	isFetching: boolean;

	addMessage?: (message: Message) => void;
	getMessages?: (message: Message[]) => void;
	showAddMessageModal?: () => void;
	hideAddMessageModal?: () => void;
	updatingComments?: () => void;
	updatingCommentsSucceed?: () => void;
	updatingCommentsRejected?: () => void;

}

class App extends React.Component<Props, object> {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Messages 
						messages={this.props.content}
						getMessages={this.props.getMessages}
						updatingComments={this.props.updatingComments}
						updatingCommentsSucceed={this.props.updatingCommentsSucceed}
						updatingCommentsRejected={this.props.updatingCommentsRejected}
						isFetching={this.props.isFetching}
					/>
					<AddMessage 
						addMessage={this.props.addMessage}
						modalStatus={this.props.modalStatus}
						hideModal={this.props.hideAddMessageModal}
						getMessages={this.props.getMessages}
					/>
					<FloatButton
						modalStatus={this.props.modalStatus}
						showModal={this.props.showAddMessageModal}
						hideModal={this.props.hideAddMessageModal}
					/>
				</div>
			</MuiThemeProvider>
		
		);
	}
}

// define function for mapping redux states to app props
export function mapStateToProps( store: StoreState ) {
	return {
		content: store.messages.messages.content,
		modalStatus: store.addMessageModal.show,
		isFetching: store.messages.isFetching,
	};
}

// define function for mapping redux action dispatch to ap props
export function mapDispatchToProps(dispatch: Dispatch<actions.AllActions>) {
	return {
		addMessage: (message: Message) => dispatch(actions.addMessage(message)),
		getMessages: (messages: Message[]) => dispatch(actions.getMessages(messages)),

		updatingComments: () => dispatch(actions.updatingComments()),
		updatingCommentsSucceed: () => dispatch(actions.updatingCommentsSucceed()),
		updatingCommentsRejected: () => dispatch(actions.updatingCommentsRejected()),

		showAddMessageModal: () => dispatch(actions.showAddMessageModal()),
		hideAddMessageModal: () => dispatch(actions.hideAddMessageModal()) 

	};
}

// connect redux state and dispatch to app
export default connect<Props>(mapStateToProps, mapDispatchToProps)(App);
