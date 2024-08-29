import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";

const initialState = {
  questions: [],
  status: 'loading'
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
    default:
      throw new Error('The action is unknown')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch(err => dispatch({type: 'dataFailed'}))
  }, []);
  return (
    <div className='app'>
      <Header/>
      <Main>
        <p></p>
        <p>Questions</p>
      </Main>
    </div>
  )
}