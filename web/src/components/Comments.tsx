import * as React from 'react';
import { CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Message, Comment } from '../types/index';
import { updateComments, dateID, fetchData } from '../utils/utils';

// define component styles
const styles = {
	commentsStyle: {
		borderTop: '0.7px solid rgba(0, 0, 0, .12)',
		hight: '300px',
		fontSize: '13px',
		boxShadow: 'inset rgba(0, 0, 0, 0.12) 0px 1px 10px',
		background: '#F5F5F5',
		color: '#757575',
		zIndex: 800,
	},
	commentStyle: {
		marginBottom: '10px',
	},
	commentsContainerStyle: {
		maxHeight: '300px',
		overflow: 'scroll' as 'scroll'
	},
	underlineStyle: {
		color: '#9E9E9E',
		borderColor: '#9E9E9E',
	},
	textFieldStyle: {
		marginTop: '0px'
	},
	submitButtonStyle: {
		right: '0%',
		bottom: '10px'
	}
};

// define interfaces
export interface Props {
	toggle?: boolean;
	id?: number;
	message?: Message;
	comments?: string[];
	updatingComments?: () => void;
	updatingCommentsSucceed?: () => void;
	updatingCommentsRejected?: () => void;
	getMessages: (message: Message[]) => void;
	isFetching: boolean;

}

export interface State {
	content: string;
	errorMsg: string;
}

class Comments extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			content: '',
			errorMsg: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.getMessages = this.getMessages.bind(this);
	}

	// fetch messages
	getMessages() {
		fetchData('messages').then((res) => {
			this.props.getMessages(res);
		});
	}

	updateComment(event: React.FormEvent<HTMLSelectElement>): void {

		// comment validator
		if (this.state.content.length > 200) {
			this.setState({
				errorMsg: 'Message should be less than 200 characters.'
			});
		} else if (this.state.content.length <= 200) {
			this.setState({
				errorMsg: null
			});
		}

		// update comment
		this.setState({
			content: event.currentTarget.value
		});
	}

	// clear comments in state
	clearComment(): void {
		this.setState({
			content: ''
		});
	}

	// comment submit handler
	handleSubmit(): void {

		let newComment: Comment = {
			content: this.state.content,
			commentID: dateID(),
			message: this.props.message.id
		};
		if (!this.state.errorMsg && this.state.content && !this.props.isFetching && this.props.comments) {
			this.props.updatingComments();
			updateComments(newComment, 'comments', this.props.message.id)
				.then((res) => {
					if (res) {
						this.props.updatingCommentsSucceed();
						this.clearComment();
						this.getMessages();
					}
				},    (error: Error) => {
					if (this.props.updatingCommentsRejected) {
						this.props.updatingCommentsRejected();
					}
				});

		}

	}

	render() {

		// populate comments
		let comments: JSX.Element[] = [];
		// check if there are any comments
		if (this.props.comments && typeof (this.props.comments) === 'object') {
			comments = this.props.comments.map(function (comment: string, index: number) {
				// check if comment is empty
				if (comment) {
					return (
						<div key={index} style={styles.commentStyle}>
							Someone Said: {comment}
						</div>
					);
				} else {
					return (<div key={index} />);
				}

			});
		}

		// check if this comments section need to be showed
		if (this.props.toggle) {
			return (
				<CardText
					style={styles.commentsStyle}
				>
					<div style={styles.commentsContainerStyle}>
						{comments}
					</div>
					<TextField
						value={this.state.content}
						onChange={this.updateComment}
						style={styles.textFieldStyle}
						underlineFocusStyle={styles.underlineStyle}
						floatingLabelStyle={styles.underlineStyle}
						hintText="Say Something"
						fullWidth={true}
						errorText={this.state.errorMsg}
						multiLine={true}
						rows={1}
						rowsMax={5}
					/>
					<RaisedButton
						style={styles.submitButtonStyle}
						label="submit"
						fullWidth={true}
						onClick={this.handleSubmit}
					/>
				</CardText>
			);

			// if not show empty div
		} else {
			return (<div />);
		}

	}
}

export default Comments;
