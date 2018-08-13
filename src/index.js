import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';



const store = createStore(rootReducer);

ReactDOM.render(

    <Provider store= {store}>
      <App />
    </Provider>,
 document.getElementById('root')
);
registerServiceWorker();
