import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createBrowserHistory } from 'history';
import { History } from 'history';
import { rootStore } from './redux/store/index';
import App, { AppProps } from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface AppStoreInitialState {}

(async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
    },
  });

  const initialState: AppStoreInitialState = {};
  const history: History = createBrowserHistory({});
  const store: Store<any> = rootStore(initialState, history);
  const rootEl = document.getElementById('root');

  const render = (Component: React.FC<AppProps>, el: HTMLElement | null) => {
    ReactDOM.render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component history={history} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})();
