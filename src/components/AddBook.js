import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = (props) => {
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState({});
  const { loading, error, data } = useQuery(getAuthorsQuery);

  // so when refetching loading parameter doesnt get changed
  const [mutateFunction, { mutateData, load, err }] = useMutation(
    addBookMutation,
    {
      refetchQueries: [{ query: getBooksQuery }],
    }
  );
  // call mutation function to exec mutation
  const display = () => {
    if (loading) {
      setAuthors(<option disabled>Loading author list</option>);
    } else {
      const authorList = data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
      setAuthors(authorList);
    }
  };

  useEffect(() => {
    display();
  }, [loading]);

  const submitForm = async(e) => {
    e.preventDefault();
    console.log(book);
    mutateFunction({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => setBook({ ...book, authorId: e.target.value })}
        >
          {authors}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
