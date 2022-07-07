import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

// const authLink = setContext((request, prevContext) => ({
//   headers: { authorization: "1234" },
// }));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
