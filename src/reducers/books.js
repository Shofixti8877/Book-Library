
const initialState = {
  books: []
}

const ID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default function books(state = initialState, action) {
  switch(action.type) {
    case "INIT_BOOKS":
      state = {
        ...state,
        books: action.payload
      };
      return state;
    case "UPDATE_BOOKS":
        state = {
          ...state
        };
        state.books[action.payload.index].volumeInfo.title = action.payload.title;
        state.books[action.payload.index].volumeInfo.authors = [action.payload.authors]
        state.books[action.payload.index].volumeInfo.publishedDate = action.payload.publishedDate;
        return state;
    case "NEW_BOOK":
          state = {
            ...state,
            books: [...state.books,{ volumeInfo: {title: action.payload.title, authors: [action.payload.authors], publishedDate: action.payload.publishedDate}, id: ID() }]
          };
          return state;
    case "DELETE_BOOK":
            state = {
              ...state,
              books: [...state.books.slice(0, action.payload), ...state.books.slice(action.payload + 1) ]
            };
            return state;
    default:
     return state;
  }
}
