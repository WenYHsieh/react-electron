import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const AppWrapper = styled.div`
  margin: 20vh auto;
  padding: 20px;
  background-color: white;
  width: 500px;
  box-shadow: 1px 6px 6px 1px #7d7e7e;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin: 10px auto 10px auto;
  font-style: italic;
  font-weight: 400;
  color: rgba(38, 15, 56, 0.7);
`;
const Input = styled.input`
  outline: none;
  border: 0;
  background-color: white;
  margin: 20px 10px 0px 10px;
  font-size: 20px;
  width: 450px;
  color: rgb(85, 83, 83);
  border-bottom: solid 1px #ecebf0;
  transition: 0.8s;
  padding: 0px 0px 5px 15px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    border-bottom: solid 1px rgba(38, 15, 56, 0.7);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  font-size: 14px;
  margin-left: 15px;
  color: #a8a8a8;
  transition: 0.8s;

  ${(props) =>
    props.$add &&
    `
    font-size: 24px;
  `}

  &:nth-child(1) {
    margin-left: 15px;
  }
  &:hover {
    cursor: pointer;
    color: rgba(38, 15, 56, 0.7);
  }
`;

const MainWrapper = styled.div`
  width: 100%;
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default function App() {
  const id = useRef(1);
  const [todos, setTodos] = useState([
    {
      id: 0,
      content: '吃飯',
      isDone: false,
      isOnEdit: true,
    },
  ]);

  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = (event) => {
    if (!value) return;

    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
        isOnEdit: false,
      },
      ...todos,
    ]);

    setValue('');
    id.current++;
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'all') return todo;
      return filter === 'done' ? todo.isDone : !todo.isDone;
    });
  }, [todos, filter]);

  const handleSwitchFilter = (currentFilter) => {
    setFilter(currentFilter);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <AppWrapper>
      <Title>Todo List</Title>
      <MainWrapper>
        <InputWrapper>
          <Input value={value} onChange={handleInputChange} />
          <Button $add onClick={handleAddTodo}>
            +
          </Button>
        </InputWrapper>
        <Filter>
          <Button $all $isFilter onClick={() => handleSwitchFilter('all')}>
            All
          </Button>
          <Button $done $isFilter onClick={() => handleSwitchFilter('done')}>
            Completed
          </Button>
          <Button
            $undone
            $isFilter
            onClick={() => handleSwitchFilter('undone')}>
            Active
          </Button>
          <Button $general $isFilter onClick={handleClearAll}>
            Clear all
          </Button>
        </Filter>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            content={todo.content}
            isOnEdit={todo.isOnEdit}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
          />
        ))}
      </MainWrapper>
    </AppWrapper>
  );
}
