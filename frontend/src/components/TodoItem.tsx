import React from "react";
import { Row, Col, Button } from "react-bootstrap";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `todo-completed` : "";
  return (
    <div className="Card">
      <Row>
        <Col md={9} sm={9} xs={9}>
          <div className="card-name" onClick={() => updateTodo(todo)}>
            <h3 className={checkTodo}>{todo.name}</h3>
          </div>
        </Col>
        <Col md={3} sm={3} xs={3}>
          <div className="card-btn">
            <Button
              className="btn-remove"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <hr className="todo" />
        </Col>
      </Row>
    </div>
  );
};

export default Todo;
