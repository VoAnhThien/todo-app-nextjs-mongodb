// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setError(null);
      const res = await fetch('/api/todos');
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      setError(null);
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add todo');
      }

      setInput('');
      fetchTodos();
    } catch (err) {
      console.error('Add todo error:', err);
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        My Todo App
      </h1>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">❌ Error:</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={fetchTodos}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
        />
        <button
          onClick={addTodo}
          disabled={!input.trim()}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Chưa có todo nào, thêm thử đi! 🚀
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo._id}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center text-gray-800 shadow-sm hover:shadow-md transition"
              >
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
                <span className="text-xs text-gray-400">
                  {todo.createdAt ? new Date(todo.createdAt).toLocaleString('vi-VN') : ''}
                </span>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
        <p>📊 Debug:</p>
        <p>• Total todos: {todos.length}</p>
        <p>• API endpoint: /api/todos</p>
        <p>• Test connection: <a href="/api/test-db" className="text-blue-600 underline">/api/test-db</a></p>
      </div>
    </div>
  );
}