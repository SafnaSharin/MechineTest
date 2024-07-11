import Form from "./component/registration"
import Profile from "./component/profile";
import Edit from "./component/edit";
import Signin from "./component/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/sign-in" element={<Form />} /> {/* Default route */}
      <Route path="profile" element={<Profile />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/" element={<Signin />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
