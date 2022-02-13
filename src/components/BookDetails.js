import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(<p>Output book details here</p>);

  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  let myBook;
  const display = () => {
    if (data) {
      myBook = data.book;
    }
    if (myBook) {
      setBook(
        <div>
          <h2>{myBook.name}</h2>
          <p>{myBook.genre}</p>
          <ul className="other-books">
            {myBook.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  };
  useEffect(() => {
    display();
  }, [data]);

  return <div id="book-details">{book}</div>;
};

export default BookDetails;
