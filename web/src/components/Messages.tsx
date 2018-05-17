import * as React from 'react';
import {  Message } from '../types/index';
import { fetchData } from '../utils/utils';
import Comments from './Comments';
import MailOutline from 'material-ui/svg-icons/communication/mail-outline';
import { grey500 } from 'material-ui/styles/colors';
import { Card, CardText } from 'material-ui/Card';
import LazyLoad from 'react-lazyload';

// define component styles

const styles = {
	container: {
		paddingTop: '0px'
	},
	content: {
		padding: '25px 16px 25px 16px',
	},
	tile: {
		color: '#757575',
		wordWrap: 'break-word', 
		marginBottom: '5px',
	},
	cardMid: {
		borderTop: '0.7px solid rgba(0, 0, 0, .12)',
		padding: '10px 16px 10px 16px',
		fontSize: '14px',
		color: '#9E9E9E',
	},
	commentsIcon: {
		float: 'right' as 'right'
	},
	cardBottom: {
		borderTop: '0.7px solid rgba(0, 0, 0, .12)',
		height: '24px',
		padding: '10px 16px 10px 16px' 
	}

};

// define component interfaces
export interface Props {
	messages: Message[];
	isFetching: boolean;

	getMessages: (message: Message[]) => void;
	updatingComments: () => void;
	updatingCommentsSucceed: () => void;
	updatingCommentsRejected?: () => void;
}

export interface State {
	commentsToggleList: boolean[];
}

class Messages extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			commentsToggleList: this.props.messages.map((message, index) => (false)),
		};

		this.updateMessages = this.updateMessages.bind(this);
	}

	// update messages before loading this component
	componentWillMount() {
		this.updateMessages();
	}

	// update message
	updateMessages() {
		fetchData('messages').then((res) => {
			this.props.getMessages(res);
			this.setState({
				commentsToggleList: this.props.messages.map((message, index) => (false)),
			});
		});
	}

	// haldle toggle comments section
	handleToggle(index: number) {
		let temp: boolean[] = this.state.commentsToggleList;
		temp[index] = !temp[index];
		this.setState({
			commentsToggleList: temp
		});
	}

	render() {
		var {messages} = this.props;
		const messageItems = messages.map((message, index) => (

			<div key={index}>
			<LazyLoad height={150}>
				<Card className="message">

					<div style={styles.content} onClick={this.handleToggle.bind(this, index)}>
						{message.content}
					
					</div>
					<div style={styles.cardMid} onClick={this.handleToggle.bind(this, index)}>
						Said by {message.username}			
					</div>

					<Comments
						toggle={this.state.commentsToggleList[index]}
						message={message}
						comments={message.comments}
						updatingComments={this.props.updatingComments}
						updatingCommentsSucceed={this.props.updatingCommentsSucceed}
						updatingCommentsRejected={this.props.updatingCommentsRejected}
						isFetching={this.props.isFetching}

					/>
					<div onClick={this.handleToggle.bind(this, index)}>
						<CardText style={styles.cardBottom} >
							<MailOutline style={styles.commentsIcon} color={grey500}/>
						</CardText>
					</div>
				</Card>
			</LazyLoad>
			</div>
		));

		return (
				<div style={styles.container} className="messages">
						{messageItems}
				</div>
		);
	}
}

export default Messages;
