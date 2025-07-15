import React, { useState } from "react";

export default function ToDoList() {
  const [taskList, setTaskList] = useState(() => {
    const saveItem = localStorage.getItem("taskList");
    return saveItem ? JSON.parse(saveItem) : [];
  });

  function addNewItem(item) {
    const ItemList = [...taskList, item];
    setTaskList(ItemList);
    localStorage.setItem("taskList", JSON.stringify(ItemList));
  }

  function deleteItem(id) {
    const ItemList = taskList.filter(item => item.id !== id);
    setTaskList(ItemList);
    localStorage.setItem("taskList", JSON.stringify(ItemList));
  }

  function onToggler(id) {
    const updatedList = taskList.map(item =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTaskList(updatedList);
    localStorage.setItem("taskList", JSON.stringify(updatedList));
  }

  function Form({ onAddItem }) {
    const [qty, setQty] = useState("");
    const [itemName, setItemName] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      if (!qty || !itemName) {
        alert("Fill the criteria");
        return;
      }
      const newItem = {
        id: Math.floor(Math.random() * 1000),
        qty,
        itemName,
        isDone: false
      };
      onAddItem(newItem);
      setQty("");
      setItemName("");
    }

    return (
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="card mt-4">
            <div className="card-header bg-info">
              <h2>Carry Required Items To Attend Class</h2>
            </div>
            <div className="card-body text-center">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Task"
                    className="form-control"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="form-control"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div>
                  <input type="submit" className="btn btn-info" value="Add Task" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function TaskList({ taskList, onDeleteItem }) {
    if (taskList.length === 0)
      return <h2 className="text-center mt-4 text-danger">Your cart is empty</h2>;

    return (
      <section>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-4">
              <div className="card-body">
                <ol className="list-group">
                  {taskList.map((item) => (
                    <Task key={item.id} item={item} onDeleteItem={onDeleteItem} onToggle={onToggler} />
                  ))}
                </ol>
              </div>
            </div>
           
          </div>
        </div>
         <Calculation taskList={taskList} />
      </section>
    );
  }

  function Task({ item, onDeleteItem, onToggle }) {
    const { itemName, qty, isDone } = item;

    return (
      <li className="list-group-item mb-2 d-flex align-items-center justify-content-between">
        <span
          className="fw-bold"
          style={{ textDecoration: isDone ? "line-through" : "none" }}
        >
          <input
            type="checkbox"
            className="me-2"
            checked={isDone}
            onChange={() => onToggle(item.id)}
          />
          {qty} ➡ {itemName}
        </span>
        <button className="btn btn-sm" onClick={() => onDeleteItem(item.id)}>
          ❌
        </button>
      </li>
    );
  }

  return (
    <>
      <div className="container">
        <Form onAddItem={addNewItem} />
        <TaskList taskList={taskList} onDeleteItem={deleteItem} />
      </div>
    </>
  );
}

function Calculation({ taskList }) {
  const ItemLength = taskList.length;
  const ItemDone = taskList.filter(item => item.isDone).length;
  const percentage = ItemLength ? Math.trunc((ItemDone / ItemLength) * 100) : 0;

  return (
    <section className="row">
      <div className="col-md-6 m-auto card-footer">
        {ItemLength === 0 ? (
          <h2>Add tasks to the cart</h2>
        ) : (
          <>
            <h2>You have {ItemLength} items in cart</h2>
            <h3>You packed {ItemDone} items ({percentage}%)</h3>
          </>
        )}
      </div>
    </section>
  );
}
