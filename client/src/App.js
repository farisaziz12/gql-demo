import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import "./App.css";
import { QUERIES } from "./api";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const AppWrapper = (Component) => () =>
  (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );

function App() {
  const { loading, error, data } = useQuery(QUERIES.GET_MOVIE_BY_ID, {
    id: 268,
  });

  return (
    <div className="App">
      <h1>Demo</h1>

      {error && <p>Error: {error.message}</p>}

      {loading ? <p>Loading...</p> : JSON.stringify(data)}
    </div>
  );
}

export default AppWrapper(App);
