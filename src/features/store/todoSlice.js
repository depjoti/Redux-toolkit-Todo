import { createSlice } from '@reduxjs/toolkit';

const saveTodosToLocalStorage = todos => {
    try {
        const serializedTodos = JSON.stringify(todos);
        localStorage.setItem('todos', serializedTodos);
    } catch (err) {
        console.log('Error saving todos to local storage:', err);
    }
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        items: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.items = action.payload;
        },
        addTodo: (state, action) => {
            state.items.push(action.payload);
            saveTodosToLocalStorage(state.items);
        },
        toggleCompleted: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodosToLocalStorage(state.items);
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
            saveTodosToLocalStorage(state.items);
        },
        editTodo: (state, action) => {
            const { id, title } = action.payload;
            const todoIndex = state.items.findIndex(todo => todo.id === id);
            if (todoIndex !== -1) {
                state.items[todoIndex].title = title;
                saveTodosToLocalStorage(state.items);
            }
        },
    },
});

export const { setTodos, addTodo, toggleCompleted, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
