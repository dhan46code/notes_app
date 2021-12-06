import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import List from './Component/List';
import Alert from './Component/Alert';

const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  // const [list, setList] = useState([]);
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editID, seteditID] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      callAlert(true, 'danger', 'please field text');
    } else if (name && editing) {
      // update list
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditing(false);
      seteditID(null);
      callAlert(true, 'success', 'already changed!');
    } else {
      callAlert(true, 'success', 'added text');
      const newItems = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItems]);
      setName('');
    }
  };

  const callAlert = (show = false, type = '', message = '') => {
    return setShowAlert({ show, type, message });
  };

  const clearItems = () => {
    callAlert(true, 'success', 'your clear items!');
    return setList([]);
  };

  const removeItems = (id) => {
    callAlert(true, 'danger', 'items removed!');
    return setList(list.filter((item) => item.id !== id));
  };

  const editItems = (id) => {
    const specificItems = list.find((item) => item.id === id);
    seteditID(id);
    setEditing(true);
    setName(specificItems.title);
  };

  // store values from localstorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <main>
      <section className='section-center'>
        <form className='notes-form' onSubmit={handleSubmit}>
          {showAlert.show && <Alert {...showAlert} removeAlert={callAlert} />}
          <h3>Notes Apps_</h3>
          <div className='form-control'>
            <input
              type='text'
              placeholder='e.g run in the morning'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={`btn ${editID ? 'edit_' : null}`}>
              {editing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {/* Notes-container */}

        {list.length > 0 && (
          <div className='notes-container'>
            <List
              items={list}
              removeItems={removeItems}
              editItems={editItems}
            />
            {/* clear button */}
            <button className='clear-btn' onClick={clearItems}>
              clear items
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
