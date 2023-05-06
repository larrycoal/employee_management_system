import React, { useState,useEffect,useCallback } from "react";
import EmployeeDirectory from "./components/EmployeeDirectory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import moment from "moment";

import Layout from "./components/Layout";
import DashBoard from "./components/DashBoard";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeDetails from "./components/EmployeeDetails";
import Retiree from "./components/Retiree";

function App() {
  const [employees, setEmployees] = useState([]);

  const AddNewEmployee = async (employeeDetails) => {
    const firstName = employeeDetails.firstName;
    const lastName = employeeDetails.lastName;
    const age = employeeDetails.age;
    const startDate = employeeDetails.startDate;
    const title = employeeDetails.title;
    const department = employeeDetails.department;
    const employeeType = employeeDetails.employeeType;
    const currentStatus = Boolean(employeeDetails.currentStatus);

    const query = `mutation{
        addEmployee(firstName:"${firstName}",lastName:"${lastName}",age:${age},startDate:"${startDate}",title:"${title}",department:"${department}",employeeType:"${employeeType}",currentStatus:${currentStatus}){
        firstName,
        lastName,
        age,
        startDate,
        retirementDate,
        title,
        department,
        employeeType,
        currentStatus
        }
  }`;
    await fetch("https://employee-management-api-byi6.onrender.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then(async (response) => {
      let resp = await response.json();
      console.log(resp);
    });
  };

  const EditEmployee = async (employeeDetails) => {
    const firstName = employeeDetails.firstName;
    const lastName = employeeDetails.lastName;
    const age = employeeDetails.age;
    const startDate = employeeDetails.startDate;
    const title = employeeDetails.title;
    const department = employeeDetails.department;
    const employeeType = employeeDetails.employeeType;
    const currentStatus = Boolean(employeeDetails.currentStatus);
    const employeeId = employeeDetails._id;

    const query = `mutation{
        editEmployee(_id:"${employeeId}"firstName:"${firstName}",lastName:"${lastName}",age:${age},startDate:"${startDate}",title:"${title}",department:"${department}",employeeType:"${employeeType}",currentStatus:${currentStatus}){
        _id
        firstName,
        lastName,
        age,
        startDate,
        title,
        department,
        employeeType,
        currentStatus
        }
  }`;
    await fetch("https://employee-management-api-byi6.onrender.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then(async (response) => {
      let resp = await response.json();
      console.log(resp);
    });
  };
  const fetchEmployee = async (id) => {
    const query = `mutation{
        fetchSingleEmployee(_id:"${id}"){
        _id,
        firstName,
        lastName,
        age,
        startDate,
        title,
        department,
        employeeType,
        currentStatus,
        retirementDate
        }
    }`;
    let singleEmploye = {};
    try {
      await fetch("https://employee-management-api-byi6.onrender.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then(async (response) => {
        let resp = await response.json();
        if (resp.data) {
          singleEmploye = { ...resp.data.fetchSingleEmployee };
        }
        if (resp.errors.length > 0) {
          console.log(resp?.errors[0]?.message);
        }
      });
    } catch (error) {}
    return singleEmploye;
  };
  const fetchAllEmployee = useCallback(async () => {
      const query = `query{
    employeeList {
    _id
    firstName
    lastName
    age
    startDate
    retirementDate
    title
    department
    employeeType
    currentStatus
  }
  }`;
    try {
      const response = await fetch(
        "https://employee-management-api-byi6.onrender.com/graphql",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
      if (response) {
        let fetchedData = await response.json();
        let fetchedEmployeeList = fetchedData.data.employeeList;
        // Debug from here
        setEmployees([...fetchedEmployeeList]);
      }
    } catch (err) {
      console.log(err?.message);
    }
  }, []);
   const todayDate = moment();
   const retired = employees.filter(
     (emp) =>
       moment(parseInt(emp?.retirementDate)).diff(todayDate, "months") <= 6
   );
  useEffect(() => {
    fetchAllEmployee();
  }, [fetchAllEmployee]);
  return (
    <div className="main__wrapper">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashBoard employees={employees} />} />
            <Route
              path="/employee"
              element={
                <EmployeeDirectory
                  AddNewEmployee={AddNewEmployee}
                  employees={employees}
                  fetchData={fetchAllEmployee}
                />
              }
            />
            <Route
              path="/employee/:_id"
              element={
                <EmployeeEdit
                  EditEmployee={EditEmployee}
                  fetchEmployee={fetchEmployee}
                />
              }
            />
            <Route
              path="/employeeDetails/:_id"
              element={<EmployeeDetails fetchEmployee={fetchEmployee} />}
            />
            <Route path="/retiree" element={<Retiree employees={retired} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
