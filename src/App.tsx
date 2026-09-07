import { useState } from "react";
import Home from "./to-do-list-components/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home search={search} setSearch={setSearch} />}
        />
      </Routes>
    </div>
  );
}

export default App;
