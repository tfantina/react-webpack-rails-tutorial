import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { AppContainer } from "react-hot-loader";
import { render } from "react-dom";

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

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
  const store = ReactOnRails.getStore('commentsStore');
  renderApp(NonRouterCommentsContainer, store, _props, _railsContext, _domNode);

  if (module.hot) {
    module.hot.accept(['../containers/NonRouterCommentsContainer'], () => {
      renderApp(HelloWorldContainer, store, _props, _railsContext, _domNode);
    })
  }
};
