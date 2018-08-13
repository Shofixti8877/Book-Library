import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Grid, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';


class EditBook extends React.Component {

  state = {
   data: {
      id: this.props.currentBook.id,
      title: this.props.currentBook.volumeInfo.title,
      authors: this.props.currentBook.volumeInfo.authors,
      publishedDate: this.props.currentBook.volumeInfo.publishedDate,
      index: this.props.index
   },
  loading:false,
  modalOpen: false,
  errors: {}
};

handleOpen = () => this.setState({ modalOpen: true })

handleClose = () => this.setState({ modalOpen: false })

titleFilter = (title) =>{
  title = title.replace(/[^ a-z]/gi, '');
  return title.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

componentWillReceiveProps(props){
  this.setState({
    data: {
      id: props.currentBook.id,
      title: props.currentBook.volumeInfo.title,
      authors: props.currentBook.volumeInfo.authors,
      publishedDate: props.currentBook.volumeInfo.publishedDate,
      index: props.index
    }
  })
}

onChange = e =>
  this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value}
  });

onSubmit = () => {
  const errors = this.validate(this.state.data);
  this.setState({ errors });
  if(Object.keys(errors).length === 0){
    this.setState({ loading : true})
    this.props.updateBooks(this.state.data);
    this.setState({ loading : false, modalOpen: false});
  }
};

validate = (data) =>{
    const errors = {};
    if(!data.title){
      errors.title = "Can't be blank";
    }
    if(!data.authors){
       errors.authors = "Can't be blank";
     }
     if(!data.publishedDate){
       errors.publishedDate = "Can't be blank";
     }
     return errors;
  }

  render(){
      const { data, errors, loading } = this.state;

      return (
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={<Button onClick={this.handleOpen}
                   icon = 'edit outline'/>}>
          <Modal.Header>Edit Book Information</Modal.Header>
          <Modal.Content>
            <Form onSubmit ={this.onSubmit} loading={loading}>
              <Grid columns={1} >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field error={!!errors.title}>
                      <label htmlFor="title">Book Title</label>
                      <input
                        type ="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={this.titleFilter(data.title)}
                        onChange={this.onChange}
                      />
                      {errors.title && <InlineError text={errors.title} />}
                    </Form.Field>

                    <Form.Field error={!!errors.authors}>
                      <label htmlFor="authors">Book Authors</label>
                      <input
                        type ="text"
                        id="authors"
                        name="authors"
                        placeholder="Authors"
                        value={data.authors}
                        onChange={this.onChange}
                      />
                      {errors.authors && <InlineError text={errors.authors} />}
                    </Form.Field>

                    <Form.Field error={!!errors.publishedDate}>
                      <label htmlFor="publishedDate"> Published Date </label>
                      <input
                        type ="date"
                        id="publishedDate"
                        name="publishedDate"
                        value={data.publishedDate}
                        onChange={this.onChange}
                      />
                      {errors.publishedDate && <InlineError text={errors.publishedDate} />}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                  <Button primary>Save</Button>
                  <Button negative type='button' onClick ={this.handleClose} >Cancel</Button>
                </Grid.Column>
                </Grid.Row>
              </Grid>
              { errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.global}</p>
              </Message>}
            </Form>
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
    updateBooks: (data) => {
      dispatch({
        type: "UPDATE_BOOKS",
        payload: data
      })
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditBook);
