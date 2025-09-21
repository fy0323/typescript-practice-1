import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function TodoList(){
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    const fecthTodos = async () => {
      try {
        const response = await axios.get(url);
        setTodos(response.data);
      } catch (error) {
        console.error('failed to get data', error)
      } finally {
        setLoading(false);
      }
    };
    fecthTodos();
  }, [])

  if (loading) {
    return <p>ローディング中...</p>
  };

  return (
    <div>
      <h1>Todoリスト</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;