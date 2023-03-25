
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleted, deleteTodo, editTodo } from '../features/store/todoSlice';

const TodoItem = ({ todo }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const dispatch = useDispatch();

    const handleCompletedToggle = () => {
        dispatch(toggleCompleted(todo.id));
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodo(todo.id));
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleEditSave = () => {
        dispatch(editTodo({
            id: todo.id,
            title: title
        }));
        setEditing(false);
    };

    const handleEditCancel = () => {
        setTitle(todo.title);
        setEditing(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div className="flex items-center my-2">
            <input
                type="checkbox"
                className="mr-2"
                checked={todo.completed}
                onChange={handleCompletedToggle}
            />
            {editing ? (
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="flex-grow border-b-2 border-gray-500 py-1 px-2 mr-2"
                    />
                    <button className="text-green-500 mr-2" onClick={handleEditSave}>Save</button>
                    <button className="text-red-500" onClick={handleEditCancel}>Cancel</button>
                </div>
            ) : (
                <>
                    <p
                        className={`flex-grow ${todo.completed ? 'line-through' : ''}`}
                        onClick={handleEditClick}
                    >
                        {todo.title}
                    </p>
                    <button className="text-red-500" onClick={handleDeleteClick}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;
