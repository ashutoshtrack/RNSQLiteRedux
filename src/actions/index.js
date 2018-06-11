export const addnewTodo = () => {
  const newTodoList = {
    id: Math.floor(Date.now() / 1000),
    name: "Pop",
    creationDate: new Date()
  };
  insertNewTodoList(newTodoList)
    .then()
    .catch(error => {
      alert(`Insert new todoList error ${error}`);
    });
};
