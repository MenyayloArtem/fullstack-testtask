import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import Search from "./components/Search/Search";
import UserCard from "./components/UserCard/UserCard";
import UserInfoModal from "./modals/UserInfoModal/UserInfoModal";
import User from "./shared/types/User";
import UserApi from "./shared/api/UserApi";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [term, setTerm] = useState<string>("");
  const debouncedTerm = useDebounce(term, 200)
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSelect = useCallback((user : User) => {
    setSelectedUser(user)
    setModalIsOpen(true)
  }, [])

  useEffect(() => {
    UserApi.getUsers(debouncedTerm).then((res) => {
      setUsers(res);
    });
  }, [debouncedTerm]);

  return (
    <div className="app">
      {selectedUser && <UserInfoModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} user={selectedUser}/>}

      <div className="container">
        <Search onChange={setTerm}/>

        <div className="cards">
          {users.map((user) => (
            <UserCard 
            key={user.name} 
            user={user} 
            onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
