import { useState } from 'react'
import { useTodo } from './hooks/hooks';
import './App.css'


const App = () => {
  const { todos, fetchTodos, createTodo } = useTodo();
  return (
    <div>
      {todos.map(todo => <div key={todo.id}>{todo.title}</div>)}
      <button onClick={fetchTodos}>눌러봐</button>
      <input onChange={(e) => console.log("입력값:", e.target.value)} />
      <input onKeyDown={(e) => { if (e.key === 'Enter') console.log("엔터 침!"); }} />
      <form onSubmit={(e) => { e.preventDefault(); console.log("제출 완료!"); }}>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}

export default App
