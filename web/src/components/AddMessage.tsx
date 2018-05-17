
import * as React from 'react';
import {  Message } from '../types/index';
import { dateID , postData, fetchData } from '../utils/utils';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

// define component styles
var styles = {
	container: {
		top : '20%', 
		width: '70%',
		height: 'auto',
		position: 'fixed' as 'fixed' ,
		marginLeft: '15%',
		zIndex: 1000,
		overflow: 'scroll' as 'scroll',
		maxHeight: '70%'
	},
	confirmButton: {
		float: 'right' as 'right'
	},
	darkPanel: {
		position: 'fixed' as 'fixed',
		zIndex: 970,
		height: '100%',
		width: '100%',
		background: 'rgba(0,0,0,0.5)',
		top: '0px'
	},
	underlineStyle: {
		color: '#9E9E9E',
		borderColor: '#9E9E9E',
	}

};

// define interfaces
export interface Props {
	addMessage?: (message: Message ) => void;
	modalStatus?: boolean;
	hideModal?: () => void;
	getMessages?: (message: Message[]) => void;
}

export interface State {
	username: string;
	content: string;
	messageID: number;
	NameErrText: string;
	ContentErrText: string;
	showPop: boolean;

}

// add message component
class AddMessage extends React.Component<Props, State> {
	constructor(props: Props) {

		// init states
		super(props);
		this.state = {
			messageID: -1,
			username: '',
			content: '',
			NameErrText: null,
			ContentErrText: null,
			showPop: false,
		};

		// bind functions
		this.addMessage = this.addMessage.bind(this);
		this.updateMessage = this.updateMessage.bind(this);
		this.updateName = this.updateName.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.clearData = this.clearData.bind(this);
		this.handelPopClose = this.handelPopClose.bind(this);
		this.getMessages = this.getMessages.bind(this);
	}

	// fetch messages
	getMessages() {
		fetchData('messages').then((res) => {
			this.props.getMessages(res);
		});
	}

	// update name from text field to state
	updateName(event: React.FormEvent<HTMLSelectElement>): void {
		// name validator
		if (this.state.username.length > 20) {
			this.setState({
				NameErrText: 'Name should be less than 20 character.'
		});
		} else if (this.state.username.length <= 20) {
			this.setState({
				NameErrText: null
			});
		}

		// update username in state
		this.setState({
			username: event.currentTarget.value
		});
	}	

	// update message content to state
	updateMessage(event: React.FormEvent<HTMLSelectElement>): void {

		// message validator
		if (this.state.content.length > 200) {
			this.setState({
				ContentErrText: 'Content should be less than 200 char.'
			});
		} else if (this.state.username.length <= 200) {
			this.setState({
				ContentErrText: null
			});
		}

		// update content in state
		this.setState({
			content: event.currentTarget.value
		});
	}

	// submit message 
	addMessage() {

		// get message from states
		let message: Message = {
			messageID: dateID().toString(),
			username: this.state.username, 
			content: this.state.content,

		};
		// tslint:disable-next-line
		console.log(message);
		// validate the text fields
		if (this.state.content && this.state.username && !(this.state.ContentErrText || this.state.NameErrText)) {

			// post data to database
			postData(message, 'messages').then((res) => {
				if (res.name) {
					this.props.addMessage(message);
					this.getMessages();
				}
			});

			// clear modal data
			this.clearData();

			// hide modal
			this.props.hideModal();

			// show pop up bar
			this.setState({
				showPop: true,
			});

			// refresh
			// window.location.reload();
		}	

	}

	// close add message modal
	closeModal() {

		// cear modal data
		this.clearData();

		// hide modal
		this.props.hideModal();
	}

	// clear modal data
	clearData() {
		this.setState({
			username: '',
			content: '',
		});
	}

	// close bottom pop-up bar
	handelPopClose() {
		this.setState({
			showPop: false,
		});
	}

	render() {

		// check modal states before showing modal
		const modalStatus = this.props.modalStatus;		
		if (modalStatus) {
			return (
				<div >
					<div style={styles.darkPanel} onClick={this.closeModal} /> 
					<Card style={styles.container} >
						
						<Divider/>
						<div>
							<CardText>
								<TextField 
									id="name"
									value={this.state.username}
									onChange={this.updateName} 
									fullWidth={true}
									hintText="Your Name"
									floatingLabelText="Your Name" 
									multiLine={true}
									rows={1}
									rowsMax={1}
									errorText={this.state.NameErrText}
									underlineFocusStyle={styles.underlineStyle}
									floatingLabelStyle={styles.underlineStyle}

								/>
							</CardText>
							<CardText>
								<TextField 
									value={this.state.content} 
									onChange={this.updateMessage} 
									fullWidth={true}
									hintText="Say Something..."
									floatingLabelText="Say Something..."
									multiLine={true}
									rows={1}
									errorText={this.state.ContentErrText}
									rowsMax={5}
									underlineFocusStyle={styles.underlineStyle}
									floatingLabelStyle={styles.underlineStyle}
								/>
							</CardText>
						</div>
						<CardText>
							<RaisedButton
								label="Redo"
								onClick={this.clearData}
							/>
							<RaisedButton
								style={styles.confirmButton} 
								onClick={this.addMessage} 
								label="Submit" 
								backgroundColor="rgb(158,158,158)"
								labelColor={fullWhite}
								disableTouchRipple={true}
							/>
						</CardText>						
					</Card>						
				</div>
			);
		} else {
			return(
				<div>
					<Snackbar
						open={this.state.showPop}
						message="Message has been updated"
						autoHideDuration={4000}
						onRequestClose={this.handelPopClose}
					/>
				</div>

			);
		}
	}
}

// export component AddMessage
export default AddMessage;
