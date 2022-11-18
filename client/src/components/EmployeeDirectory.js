import React, {  useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";

const EmployeeDirectory = ({ AddNewEmployee,employees,fetchData }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

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
    setFilteredEmployees(employees)
  }, [employees]);

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
