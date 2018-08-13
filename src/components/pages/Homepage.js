import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import axios from 'axios';

import EditBook from '../modals/EditBook';
import DeleteBook from '../modals/DeleteBook';
import AddBookPage from './AddBookPage';

class HomePage extends React.Component {

  titleFilter = (title) =>{
    title = title.replace(/[^ a-z]/gi, '');
    return title.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }

  state = {
    loading:false,
    books: []
  };

componentDidMount(){
  this.setState({ loading: true });
   axios
   .get(`https://www.googleapis.com/books/v1/volumes?q=harry_potter`)
   .then(res => res.data.items)
    .then( books => {
      this.setState({loading: false, books });
      this.props.initBooks(this.state.books);
    });
}

componentWillReceiveProps(props){
  if(props.books){
    this.setState({
      books: props.books.books
    });
  }
}

render(){
  const { loading, books } = this.state;
  return (
    <Segment basic loading = {loading}>
      <Header as='h1'>My book library</Header>
      <Card.Group>
        { books.map((book, index) => {
          return <Card key={ index } centered raised={true}>
            <Image style={{minHeight: '350px'}} src={ book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''} />
            <Card.Content textAlign="center">
              <Card.Header>{ this.titleFilter(book.volumeInfo.title) }</Card.Header>
              <Card.Meta>{ book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Unknown Publication Date' }</Card.Meta>
              <Card.Description>{ book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author' }</Card.Description>
              <EditBook currentBook = {book} index = {index} ></EditBook>
              <DeleteBook index = {index} submit={() => console.log('del')} ></DeleteBook>
            </Card.Content>
          </Card>
        })}
        <AddBookPage />
      </Card.Group>
    </Segment>
  )
}
};

function mapStateToProps(state){
  return {
    books: state.books
  };
};

function mapDispatchToProps(dispatch){
  return {
    initBooks: (data) => {
      dispatch({
        type: "INIT_BOOKS",
        payload: data
      })
    }
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
