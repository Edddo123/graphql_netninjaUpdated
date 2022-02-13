import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // prev apollo-boost
 // prev react-apollo
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninjas reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
