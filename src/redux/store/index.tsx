import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import { rootReducer } from '../reducer/rootReducer';
import { History } from 'history';

interface InitialState {}

export const rootStore = (initialState: InitialState, history: History): Store<any> => {
  const middleware: any = [process.env.NODE_ENV === 'development' ? reduxFreeze : null, thunk, routerMiddleware(history)];
  const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));
  store.subscribe(() => console.log('[THE STORE VALUE]:', store.getState()));
  return store;
};
