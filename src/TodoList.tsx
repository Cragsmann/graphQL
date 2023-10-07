import React from "react";
import { User } from "./types/user.d";

function TodoList(user: User) {
  const renderedToDoList = user.map((todo, index) => (
    <li key={index}>{todo}</li>
  ));

  return <ul>{renderedToDoList}</ul>;
}

export default TodoList;
