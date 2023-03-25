import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './Components/TodoItem'
import { setTodos, addTodo } from './features/store/todoSlice';

function App() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const todos = useSelector(state => state.todo.items);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(data => {
        dispatch(setTodos(data));
      });
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTodo({
      title: inputValue,
      completed: false,
    }));
    setInputValue('');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add new todo"
          className="px-3 py-2 border rounded w-full"
        />
        <button type="submit" className="px-3 py-2 bg-blue-500 text-white ml-2 rounded">
          Add
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
