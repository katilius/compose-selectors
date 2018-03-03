# Compose Selectors

Helper function that reduces boilerplate code needed while using selectors alongside 
connect function.

```js
connect((state) => ({
  firstTodo: getFirstTodo(state),
  todoCount: getTodoCount(state),
  currentUser: getCurrentUser(state),
  notifications: getNotifications(state)
}))
```
Can be replaced with:
```js
connect(composeSelectors({
  firstTodo: getFirstTodo,
  todoCount: getTodoCount,
  currentUser: getCurrentUser,
  notifications: getNotifications
}))
```
