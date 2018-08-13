import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';


class DeleteBook extends React.Component {

  state = {
   data: {
      index: this.props.index
   }
};

handleOpen = () => this.setState({ modalOpen: true })

handleClose = () => this.setState({ modalOpen: false })

handleDelete = () => {
  this.props.deleteBooks(this.props.index);
  this.handleClose();
}

titleFilter = (title) =>{
  title = title.replace(/[^ a-z]/gi, '');
  return title.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

  render(){
      return (
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={<Button onClick={this.handleOpen}
                   icon = 'delete'/>}>
          <Modal.Header>Delete Book</Modal.Header>
          <Modal.Content>
            <p>Are you sure?</p>
            <Button primary onClick = {this.handleDelete}>Yes</Button>
            <Button primary onClick = {this.handleClose}>No</Button>
          </Modal.Content>
        </Modal>
        )
      }
}

function mapStateToProps(state){
  return {
    books: state.books
  };
};

function mapDispatchToProps(dispatch){
  return {
    deleteBooks: (data) => {
      dispatch({
        type: "DELETE_BOOK",
        payload: data
      })
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DeleteBook);
