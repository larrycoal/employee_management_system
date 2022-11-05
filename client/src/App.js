import EmployeeDirectory from "./components/EmployeeDirectory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <div className="main__wrapper">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/employee" element={<EmployeeDirectory />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
