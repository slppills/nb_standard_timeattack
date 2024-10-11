"use client";

import { Todos } from "@/types/Todos";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("http://localhost:4000/todos");
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:4000/todos", { title, contents, isDone: false });
    setTodos([...todos, data]);
    setTitle("");
    setContents("");
  };

  const completeTodo = async (id: string) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, { isDone: true });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo)));
  };

  const cancelTodo = async (id: string) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, { isDone: false });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: false } : todo)));
  };

  const removeTodo = async (id: string) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col p-5 gap-10">
      <form onSubmit={handleSubmit} className="flex gap-5 items-center">
        <label>제목</label>
        <input
          className="ml-5 border"
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>내용</label>
        <input
          className="ml-5 border"
          type="text"
          placeholder="내용 입력"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button className="bg-red-400 p-1">추가하기</button>
      </form>
      <div className="flex flex-col gap-5">
        <h1 className="text-[2rem]">Working</h1>
        <div className="flex gap-5">
          {todos
            ?.filter((todo) => !todo.isDone)
            .map((todo) => (
              <div className="flex flex-col gap-5 border-2 p-7" key={todo.id}>
                <h2 className="text-[1.4rem]">{todo.title}</h2>
                <p>{todo.contents}</p>
                <div className="flex gap-5">
                  <button onClick={() => removeTodo(todo.id)} className="border-2 border-red-500 p-1">
                    삭제하기
                  </button>
                  <button onClick={() => completeTodo(todo.id)} className="border-2 border-green-500 p-1">
                    완료
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-[2rem]">Done</h1>
        <div className="flex gap-5">
          {todos
            ?.filter((todo) => todo.isDone)
            .map((todo) => (
              <div className="flex flex-col gap-5 border-2 p-7" key={todo.id}>
                <h2 className="text-[1.4rem]">{todo.title}</h2>
                <p>{todo.contents}</p>
                <div className="flex gap-5">
                  <button onClick={() => removeTodo(todo.id)} className="border-2 border-red-500 p-1">
                    삭제하기
                  </button>
                  <button onClick={() => cancelTodo(todo.id)} className="border-2 border-green-500 p-1">
                    취소
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
