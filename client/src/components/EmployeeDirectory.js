import React, { useCallback, useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";

const EmployeeDirectory = ({ AddNewEmployee }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployees] = useState([]);
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
        setFilteredEmployees(fetchedEmployeeList);
      }
    } catch (err) {
      console.log(err?.message);
    }
  }, [query]);
  const deleteSingleEmployee = async (id) => {
    const query = `mutation{
        deleteEmployee(_id:"${id}")
    }`;

    try {
      const resp = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (resp.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterEmployee = (filterParam) => {
    if (filterParam === "All") {
      setFilteredEmployees(employees);
    } else {
      const temp = employees.filter((emp) => emp.employeeType === filterParam);
      setFilteredEmployees(temp);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="employee__wrapper">
      <EmployeeSearch filterEmployee={filterEmployee} />
      <EmployeeTable
        employeeList={filteredEmployee}
        setShowAdd={setShowAdd}
        deleteSingleEmployee={deleteSingleEmployee}
      />
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
