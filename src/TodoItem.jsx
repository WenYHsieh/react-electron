import React from 'react';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
  width: 100%;
  margin-top: 10px;
  padding: 10px 5px;
`;

const Todo = styled.div`
  color: black;
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    color: gray
  `}
`;
const Button = styled.div`
  font-size: 16px;
  text-align: center;
  color: #a8a8a8;
  transition: 0.8s;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    color: rgba(38, 15, 56, 0.7);
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 8px;
`;

function TodoItem({
  id,
  content,
  isDone,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  return (
    <TodoWrapper data-todo-id={id}>
      <Todo $isDone={isDone} key={id}>
        {content}
      </Todo>
      <ButtonWrapper>
        <Button
          onClick={() => {
            handleToggleIsDone(id);
          }}>
          {isDone ? 'unDone' : 'Done'}
        </Button>
        <Button
          onClick={() => {
            handleDeleteTodo(id);
          }}>
          X
        </Button>
      </ButtonWrapper>
    </TodoWrapper>
  );
}

export default TodoItem;
