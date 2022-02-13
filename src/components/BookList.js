import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  

  const display = () => {
    if (loading) {
      setBooks("Loading");
    } else {
      const dataArray = data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              setBookId(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
      setBooks(dataArray);
    }
  };
  useEffect(() => {
    display();
  }, [loading, data]);
  return (
    <div>
      <ul id="book-list">{books}</ul>
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default BookList;
