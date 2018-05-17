import * as React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// define component styles
const styles = {
	floatButton: {
		position: 'fixed' as 'fixed',
		right: '16px',
		bottom: '16px',
		zIndex: 960
	} 
};

// define interfaces
export interface Props {
	showModal?: () => void;
	hideModal?: () => void;
	modalStatus?: boolean;
}

class FloatButton extends React.Component<Props, object> {

	// initialize class
	constructor(props: Props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	// handle button click
	handleButtonClick() {
		if (this.props.modalStatus) {
			this.props.hideModal();
		} else {
			this.props.showModal();
		}
	}

	render() {
		return (
			<FloatingActionButton  style={styles.floatButton} backgroundColor="#E0E0E0" onClick={this.handleButtonClick}>
			 	<ContentAdd/>
			</FloatingActionButton>
		);
	}
}

export default FloatButton;
