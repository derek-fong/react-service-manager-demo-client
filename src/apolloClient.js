import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import environment from './environment';

export default new ApolloClient({
  link: new HttpLink({ uri: environment.graphql.uri }),
  cache: new InMemoryCache()
});
