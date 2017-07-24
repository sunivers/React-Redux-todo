import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/:filterName" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
