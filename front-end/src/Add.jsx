import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() 
{
    const [book,setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:""
    })
    function handleChange(e) {
        setBook((prevState) => ({...prevState, [e.target.name]: e.target.value}));
    }

    const navigate = useNavigate();
    function handleClick(e) {
        e.preventDefault();
        fetch("http://localhost:8080/books", {
			method: "POST", 
            mode: "cors",
			body: JSON.stringify(book), 
			headers: { "Content-Type": "application/json" } 
		})
			.then(res=> navigate("/"))
			.catch(err => console.log(err))
    }
    
    return (
        <div className="form">
            <h1>Add Book</h1>
            <input
                type="text"
                placeholder="Book Title"
                name="title"
                onChange={handleChange}
            />
            <textarea
                rows={5}
                type="text"
                placeholder="Book Desc"
                name="desc"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Book Price"
                name="price"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Book Cover"
                name="cover"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;
