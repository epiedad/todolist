import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  /* We need to know if a todo has been successfully added or not
  so that we can clear the input text and disable back the 'Add' btn */
  const [isTodoAdded, setIsTodoAdded] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  /* Fetch list */
  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  /* Create todo */
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    setIsTodoAdded(false);

    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
        setIsTodoAdded(true);//Todo successfully added here
      })
      .catch((err) => console.log(err));
  };
 
  /* Update todo */
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  /* Delete todo */
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="App">
      <Container>
        <h1>To Do</h1>
        <AddTodo saveTodo={handleSaveTodo} isAdded={isTodoAdded} />
        {todos.map((todo: ITodo) => (
          <TodoItem
            key={todo._id}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
            todo={todo}
          />
        ))}
      </Container>
    </main>
  );
};

export default App;
