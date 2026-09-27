import { useState } from "react";
import Home from "./to-do-list-components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./to-do-list-components/Authentication/Login/Login";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home search={search} setSearch={setSearch} />}
        />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
