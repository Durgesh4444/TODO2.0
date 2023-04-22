import React from "react";
import "../assets/style.css";
import { useState } from "react";

const CreateTodo = () => {
  const [inputdata, setInputdata] = useState("");

  const [cl, setCl] = useState("btn");

  const [items, setItems] = useState([]);

  const[toggle, setToggle] =useState(true)

  const [edititem, setEdititem] =useState()

  //add items

  const addItems = () => {
    if (!inputdata) {
      alert("Please Enter Some Data");
    }
    else if(inputdata && !toggle){
        setItems(
            items.map((elem)=>{
                if(elem.id === edititem){
                    return{...elem, name:inputdata}
                }
                return elem;
            })
        )
        setToggle(true)

    setInputdata("")

    setEdititem()
    }
    else {
        const allinput ={id: new Date().getTime().toString(), name:inputdata}
      setItems([...items, allinput]);
      setInputdata("");
      setCl("show-btn");
    }
  };

  //delete item

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    // if (index === items[0].id) {
    //   setCl("btn");
    // }
    setItems(updatedItems);
  };

  const editItem = (id) =>{
    let newEditItem = items.find((elem)=>{
        return elem.id === id
    })
    console.log(newEditItem);
    setToggle(false)

    setInputdata(newEditItem.name)

    setEdititem(id)
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h1>Todo-List</h1>
          <p>Add Your List here......</p>
        </div>

        <div className="add-item">
          <input
            type="text"
            placeholder="Add items......"
            value={inputdata}
            onChange={(e) => setInputdata(e.target.value.substring(0, 28))}
          ></input>
          <button type="button" onClick={addItems}>
            {toggle ? "Add" : <i className="fa-solid fa-pen-to-square" title="Edit-item"></i> }

          </button>
        </div>

        <div className="show-item">
          {items.map((elem) => {
            return (
              <div className="each-item" key={elem.id}>
                <h3>{elem.name}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  <i className="fa-solid fa-pen-to-square" title="Edit-item" onClick={()=>{editItem(elem.id)}}></i>
                  <i
                    className="fa-solid fa-trash" title="Delete item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="show-item">
          <button
            className={cl}
            data-sm-link-text="Remove All"
            onClick={() => {
              setItems([], setCl("btn"));
            }}
          >
            REMOVE ALL
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
