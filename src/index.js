import { createStore } from 'redux'

const ul = document.querySelector('ul')
const input = document.querySelector('input')
const add = document.querySelector('button')

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const addToDo = text => {
  return { type: ADD_TODO, text }
}

const deleteToDo = id => {
  return { type: DELETE_TODO, id }
}

const todosModifier = (todos = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...todos, { text: action.text, id: Date.now() }]
    case DELETE_TODO:
      return todos.filter(todo => todo.id !== action.id)
    default:
      return todos
  }
}

const paintToDo = () => {
  const todosList = todos.getState()
  ul.innerHTML = ""
  todosList.forEach(todo => {
    const li = document.createElement('li')
    const delBtn = document.createElement('button')
    li.innerText = todo.text
    li.id = todo.id
    delBtn.innerText = "del"
    li.appendChild(delBtn)
    ul.appendChild(li)
    delBtn.addEventListener('click', dispatchDeleteToDo)
  })
}

const todos = createStore(todosModifier)

todos.subscribe(paintToDo)

const dispatchAddTodo = text => {
  todos.dispatch(addToDo(text))
}

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id)
  todos.dispatch(deleteToDo(id))
}

const onSubmit = e => {
  e.preventDefault()
  const text = input.value
  input.value = ''
  dispatchAddTodo(text)
}

add.addEventListener('click', onSubmit)
