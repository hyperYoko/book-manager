import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books()
{
    const [books,setBooks] = useState([]);
    useEffect( () => {
        const fetchAllBooks = () => {
            fetch("http://localhost:8080/books")
                .then((response) => response.json())
                .then((data) => setBooks(data)) //response format?
                .catch((error) => console.log(error));
        }
        fetchAllBooks();
        
    }, [] );

    function handleDelete(id)
    {
        fetch(`http://localhost:8080/books/${id}`,{method: "DELETE"})
            .then(res=> window.location.reload())
            .catch(err => console.log(err));
    }

    return (
    <>
        <h1>Book Manager</h1>
        <div className="books">
            {books.map((book) => (
                <div key={book.id} className="book">
                    <img src={book.cover} alt="" />
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>${book.price}</span>
                    <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${book.id}`}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <button className="addHome">
            <Link to="/add">Add Book</Link>
        </button>
    </>
        
    )
}

export default Books;