import { createStore } from 'redux'

const add = document.querySelector('#add')
const minus = document.querySelector('#minus')
const number = document.querySelector('span')

const ADD = "ADD"
const MINUS = "MINUS"

const countModifer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return (count += 1)
    case MINUS:
      return (count -= 1)
    default:
      return count
  }
}

const countStore = createStore(countModifer)

const handleAdd = () => {
  countStore.dispatch({ type: ADD })
}

const handleMinus = () => {
  countStore.dispatch({ type: MINUS })
}

const onChange = () => {
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange)

add.addEventListener('click', handleAdd)
minus.addEventListener('click', handleMinus)
