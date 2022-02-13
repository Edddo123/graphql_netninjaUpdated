import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`;

// getting input valies and also ! means its required
const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
