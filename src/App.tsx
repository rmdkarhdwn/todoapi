import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

function App() {
  // 1) state
  const [text, setText] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>('')

  // 2) handlers
  const handleAdd = () => {
    const v = text.trim()
    if (!v) return

    const newTodo: Todo = {
      id: Date.now(),
      text: v,
      done: false,
    }

    setTodos(prev => [...prev, newTodo])
    setText('')
  }

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditText('')
    }
  }

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const saveEdit = (id: number) => {
    const v = editText.trim()
    if (!v) return

    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: v } : t))
    )
    setEditingId(null)
    setEditText('')
  }

  // 3) UI
  return (
    <div className="app">
      <h1>Todo</h1>

      <div className="topRow">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일 입력"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd()
          }}
        />
        <button onClick={handleAdd}>add</button>
      </div>

      <div>
        {todos.map((t) => {
          const isEditing = editingId === t.id

          return (
            <div key={t.id} className="input">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => handleToggle(t.id)}
              />

              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(t.id)
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(t.id)}>save</button>
                  <button className="secondary" onClick={cancelEdit}>cancel</button>
                </>
              ) : (
                <>
                  <span className={`todoText ${t.done ? 'done' : ''}`}>
                    {t.text}
                  </span>
                  <button className="secondary" onClick={() => startEdit(t)}>
                    edit
                  </button>
                </>
              )}

              <button className="danger" onClick={() => handleDelete(t.id)}>
                delete
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
