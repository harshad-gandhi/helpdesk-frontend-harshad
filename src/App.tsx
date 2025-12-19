import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Agents from "./pages/Agents";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login/Login";
import Layout from "./layouts";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
