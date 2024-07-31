export const BASE_URL='https://jsonplaceholder.typicode.com/ZahraZellazi/FakeBackend';


export function getAlltodos() {
    return fetch(`${BASE_URL}/todos?_limit=8`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching todos:', error));
}

// Read
export function listAlltodos() {
    return fetch(`${BASE_URL}/todos`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching all todos:', error));
}

// Add
export function addTodoApi(todo) {
    return fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error adding todo:', error));
}

// Delete
export function deleteTodoApi(id) {
    return fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting todo:', error));
}

// Update 
export function updateTodoApi(id, updatedTodo) {
    return fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating todo:', error));
}
