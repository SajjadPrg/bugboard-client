import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/auth/RegisterPage";
import Login from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="" Component={Home} />
        <Route path="/auth">
          <Route path="register" Component={Register} />
          <Route path="login" Component={Login} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
