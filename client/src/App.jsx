import React, { useState } from 'react';
import { Context } from './Context';

const App = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    permission: "",
    token: "",
    userId: "",
  });



  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      <div>App</div>
    </Context.Provider>
  );
};

export default App;
