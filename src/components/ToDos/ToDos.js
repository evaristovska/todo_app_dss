import { useEffect, useMemo, useState } from "react";
import ToDo from "../ToDo/ToDo";
import "./ToDos.css";

const ToDos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrderPending, setSortOrderPending] = useState("asc");

  const baseUrl = "https://jsonplaceholder.typicode.com";

  const pendingTasks = useMemo(() => {
    return todos.filter((item) => !item.completed);
  }, [todos]);

  const completedTasks = useMemo(() => {
    return todos.filter((item) => item.completed);
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(baseUrl + "/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(baseUrl + "/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodosByUser = async (userId) => {
    try {
      const response = await fetch(baseUrl + `/users/${userId}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchUsers();
  }, []);

  const handleCompletedChange = (taskId) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === taskId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodos(updatedTodos);
  };

  const handleUserChange = (event) => {
    const userId = Number(event.target.value);
    setSelectedUser(userId);
    fetchTodosByUser(userId);
  };

  const handleSortChangePending = (event) => {
    setSortOrderPending(event.target.value);
  };

  const sortedPendingTasks = useMemo(() => {
    return [...pendingTasks].sort((a, b) =>
      sortOrderPending === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [pendingTasks, sortOrderPending]);

  const displayPendingTasks = sortedPendingTasks.map((item) => {
    return <ToDo key={item.id} {...item} handleCompletedChange={handleCompletedChange} />;
  });

  const displayCompletedTasks = completedTasks.map((item) => {
    return <ToDo key={item.id} {...item} handleCompletedChange={handleCompletedChange} />;
  });

  return (
    <div className="todos-app">
      <div className="container-outer">
        <div className="filters">
          <div className="select-container">
            <label htmlFor="select" className="select-label">
              Filter by User:
            </label>
            <select
              id="select"
              value={selectedUser || ""}
              onChange={handleUserChange}
              className="select-dropdown"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <label htmlFor="sort-select-pending" className="select-label">
              Sort by Title:
            </label>
            <select
              id="sort-select-pending"
              value={sortOrderPending}
              onChange={handleSortChangePending}
              className="select-dropdown"
            >
              <option value="asc">Title (ascending)</option>
              <option value="desc">Title (descending)</option>
            </select>
          </div>
        </div>
        <div className="todos">
          <div className="container">
            <h2>Pending Tasks</h2>
            {displayPendingTasks.length > 0 ? displayPendingTasks : <p>No pending tasks</p>}
          </div>
          <div className="container">
            <h2>Completed Tasks</h2>
            {displayCompletedTasks.length > 0 ? displayCompletedTasks : <p>No completed tasks</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDos;
