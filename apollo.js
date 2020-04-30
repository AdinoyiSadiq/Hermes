import { AsyncStorage } from 'react-native';
import { split, ApolloLink, Observable } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const request = async (operation) => {
  const token = await AsyncStorage.getItem('authToken') || '';
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let handle;
  Promise.resolve(operation)
    .then((oper) => request(oper))
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

const cache = new InMemoryCache();

const createClient = (authToken) => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log(graphQLErrors);
        }
        if (networkError) {
          console.log(networkError);
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          isAuth: !!authToken,
          isConnected: true
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache: newCache }) => {
              newCache.writeData({ data: { isConnected } });
              return null;
            }
          }
        },
        cache
      }),
      link,
    ]),
    cache,
  });

  return client;
};


export default createClient;
