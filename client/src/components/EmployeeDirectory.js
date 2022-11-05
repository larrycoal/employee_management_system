import React, { useCallback, useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";

const EmployeeDirectory = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [employees, setEmployees] = useState([]);
  const query = `query{
    employeeList {
    _id
    firstName
    lastName
    age
    startDate
    title
    department
    employeeType
    currentStatus
  }
  }`;
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (response) {
        let fetchedData = await response.json();
        let fetchedEmployeeList = fetchedData.data.employeeList;
        setEmployees(fetchedEmployeeList);
      }
    } catch (err) {
      console.log(err?.message);
    }
  },[query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const AddNewEmployee = async (employeeDetails) => {
    const firstName = employeeDetails.firstName;
    const lastName = employeeDetails.lastName;
    const age = employeeDetails.age;
    const startDate = employeeDetails.starteDate;
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
        title,
        department,
        employeeType,
        currentStatus
        }
  }`;
    await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then(async (response) => {
      let resp = await response.json();
      if (resp.errors.length > 0) {
        console.log(resp.errors[0].message);
      }

      console.log(resp);
    });
  };
  return (
    <div className="employee__wrapper">
      <EmployeeSearch />
      <EmployeeTable employeeList={employees} setShowAdd={setShowAdd} />
      <EmployeeCreate
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        AddNewEmployee={AddNewEmployee}
        fetchData={fetchData}
      />
    </div>
  );
};

export default EmployeeDirectory;
