import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLists from "./components/UserLists";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserLists />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
