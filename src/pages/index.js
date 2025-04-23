import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data.slice(0, 5));
      setFilteredUsers(data.slice(0, 5));
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString, users]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="main-page">
        <input
          type="text"
          placeholder="Search User by name..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="search-bar"
        />

        <div className="user-cards">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className={`user-card ${
                selectedUserId === user.id ? "selected" : ""
              }`}
            >
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Company: {user.company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
