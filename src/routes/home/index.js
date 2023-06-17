import { h } from 'preact';
import style from './style.css';

const Home = ({ todos, addTodo, removeTodo }) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const text = event.target.elements.todoText.value.trim();
    if (text !== '') {
      addTodo(text);
      event.target.elements.todoText.value = '';
    }
  };

  const handleRemoveTodo = (index) => {
    removeTodo(index);
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input type="text" name="todoText" placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{' '}
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
