//
// think about state shape
// refer to IDs instead of nested arrays
//
import React from 'react';
import ReactDOM from 'react-dom';
//import * as Redux from 'redux';
import {createStore, combineReducers} from 'redux' //--just pulls in objects needed
import {Provider} from 'react-redux';  //passes store around to other components
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;
import App from './components/App';
import Sidebar from'./components/Sidebar';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import * as localStore from './localStore';

const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/deck/:deckId' component={VisibleCards}>
          <Route path='/deck/:deckId/new' component={NewCardModal} />
          <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
        </Route>
      </Route>
    </Router>
  </Provider>), document.getElementById('root'));
}

run();
store.subscribe(run);
