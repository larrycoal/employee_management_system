import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";
import Alert from "../utils/Alert";

const EmployeeDirectory = ({ AddNewEmployee, employees, fetchData }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);
  const [error, setError] = useState({
    open:false,
    message:''
  });

  const deleteSingleEmployee = async (id) => {
    await fetchData();
    const empCurrentStatus = employees.filter((emp) => emp._id === id)[0]
      .currentStatus;
      console.log(empCurrentStatus)
    if (!empCurrentStatus) {
      const query = `mutation{
        deleteEmployee(_id:"${id}")
    }`;

      try {
        const resp = await fetch(
          "https://employee-management-api-byi6.onrender.com/graphql",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
          }
        );
        if (resp.status === 200) {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }else{
     setError({
      open:true,
      message:"Can't delete employee whose status is active"
     })
    }
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);
useEffect(() => {
  fetchData();
}, [fetchData]);
  return (
    <div className="employee__wrapper">
      <Alert error={error} setError={setError} />
      <EmployeeSearch
        setFilteredEmployees={setFilteredEmployees}
        employees={employees}
      />
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
