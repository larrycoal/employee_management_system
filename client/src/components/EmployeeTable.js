import React from "react";
import Table from "./Table";
import Button from "@mui/material/Button";

const EmployeeTable = ({ employeeList, setShowAdd, deleteSingleEmployee }) => {

  return (
    <div className="employee__table-wrapper">
      <Table
        employeeData={employeeList}
        deleteSingleEmployee={deleteSingleEmployee}
      />
      <div className="add_btn">
        <Button variant="text" onClick={() => setShowAdd(true)}>
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeeTable;
