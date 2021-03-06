import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AddUser from "./Components/AddUser/AddUser";
import UserList from "./Components/UserList/UserList";
import Toast from "./Components/UI/Toast";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const getUsers = useCallback(async () => {
    await axios
      .get(
        "https://react-demo-200ca-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      )
      .then((res) => {
        if (res.statusText === "OK") {
          const loadedUsers = [];
          for (const key in res.data) {
            loadedUsers.push({
              id: key,
              firstname: res.data[key].firstname,
              lastname: res.data[key].lastname,
              username: res.data[key].username,
              age: res.data[key].age,
              maths: res.data[key].maths,
              science: res.data[key].science,
            });
          }
          setUserList(loadedUsers);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const addUserHandler = (f_name, l_name, u_name, u_age, maths, science) => {
    setUserList((prevList) => {
      return [
        ...prevList,
        {
          firstname: f_name,
          lastname: l_name,
          username: u_name,
          age: u_age,
          maths: maths,
          science: science,
        },
      ];
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const setNewList = (newList) => {
    setUserList(newList);
    return <UserList users={userList} onUpdateList={setNewList} />;
  };

  return (
    <React.Fragment>
      <section>
        <AddUser onAddUser={addUserHandler} />
      </section>
      <section>
        <UserList
          users={userList}
          onUpdateList={setNewList}
          getUsers={getUsers}
        />
      </section>
      {showToast && <Toast type="info" message="Record added" />}
    </React.Fragment>
  );
};

export default App;
