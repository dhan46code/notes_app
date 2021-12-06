import react from 'react';
import reactDom from 'react-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
function List({ items, removeItems, editItems }) {
  return (
    <section className='section-container notes-list'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className='notes'>
            <p>{title}</p>
            <button className='button-container'>
              <button className='edit-btn' onClick={() => editItems(id)}>
                <FiEdit />
              </button>
              <button className='remove-btn' onClick={() => removeItems(id)}>
                <FiTrash />
              </button>
            </button>
          </article>
        );
      })}
    </section>
  );
}

export default List;
