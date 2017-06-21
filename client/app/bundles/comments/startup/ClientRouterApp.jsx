// Compare to ../ServerRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from "react-hot-loader";
import { render } from "react-dom";

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';
import routes from '../routes/routes';

const renderApp = (Komponent, store, props, railsContext, domNodeId) => {
  const element = (
    <AppContainer>
      <Provider store={store}>
        <Komponent {...props} {...railsContext} />
      </Provider>
    </AppContainer>
  )
render(element, document.getElementById(domNodeId));
}

export default (_props, _railsContext, _domNode) => {
  const store = ReactOnRails.getStore('routerCommentsStore');

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  const StuffedRouter = <Router history={history}>{routes}</Router>

  renderApp(StuffedRouter, store, _props, _railsContext, _domNode);

  if (module.hot) {
    module.hot.accept(['../containers/NonRouterCommentsContainer'], () => {
      renderApp(StuffedRouter, store, _props, _railsContext, _domNode);
    })
  }
};
