import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const apiUrl = "http://localhost:8000"


    const handleSubmit = () => {
        setError("")
        //check inputs
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl + "/todos" ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    //add item to the list
                    setTodos([...todos, { title, description }]);
                    setMessage("Item added sucessfully")
                    setTimeout(() => {
                        setMessage("");
                    },3000)
                }else {
                    // set error message
                    setError("Unable to create todo item");
                    
                }
                 

            }).catch(() => {
                setError("Unable to create todo item");

            })
           
        }
    }

    useEffect(() => {
        getItems()
    },[])



const getItems = () => {
        fetch(apiUrl + "/todos")
        .then((res) =>  res.json())
        .then((res) => {
            setTodos(res)
        })   
}



    return <>
    <div className="row p-3 bg-primary text-white">
        <h1>TODO Project with MERN stack</h1>
    </div>
    <div className="row ">
        <h3>Add Item</h3>
        { message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-3">
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" />
            <input placeholder="Description" onChange={(e) => setdescription(e.target.value)} value={description} className="form-control" type="text" />
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
        {error && <p className="text-danger">{error}</p>}
    </div>

    <div className="row mt-3">
        <h3>Tasks</h3>
        <ul className="list-group">
            {
                todos.map((item) => 
                <li className="list-group-item bg-light d-flex justify-content-between align-items-center my-2">
                <div className="d-flex flex-column ">
                    <span className="fw-bold">{item.title} </span>
                    <span >{item.description}</span>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-info">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </li>
                )
            }
            
            
        </ul>
    </div>
    </>
     
}