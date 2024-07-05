type TodoItemsTypes = {
  id: number;
  title: string;
  done: boolean;
};

let todoItems: TodoItemsTypes[] = [];

// api
function fetchTodoItems(): TodoItemsTypes[] {
  const todos: TodoItemsTypes[] = [
    { id: 1, title: '안녕', done: false },
    { id: 2, title: '타입', done: false },
    { id: 3, title: '스크립트', done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos(): TodoItemsTypes[] {
  const todos = fetchTodoItems();
  return todos;
}

function addTodo(todo: TodoItemsTypes): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

function completeTodo(index: number, todo: TodoItemsTypes): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
function logFirstTodo(): TodoItemsTypes {
  return todoItems[0];
}

function showCompleted(): TodoItemsTypes[] {
  return todoItems.filter(item => item.done);
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems(): void {
  addTodo({ id: todoItems[-1].id++, title: 'test1', done: false });
  addTodo({ id: todoItems[-1].id++, title: 'test2', done: false });
}

// NOTE: 유틸 함수
function log(): void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
