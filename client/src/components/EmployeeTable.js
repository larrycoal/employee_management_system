import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employeeList, setShowAdd, deleteSingleEmployee }) => {
  const displayEmployee = () => {
    return employeeList.map((employee, idx) => {
      const date = new Date(parseInt(employee.startDate));
      return (
        <tr key={employee._id}>
          <td>
            <Link to={`/employeeDetails/${employee._id}`}>
              {employee.firstName}
            </Link>
          </td>
          <td>
            <Link to={`/employeeDetails/${employee._id}`}>
              {employee.lastName}
            </Link>
          </td>
          <td>{employee.age}</td>
          <td>{date.toLocaleDateString()}</td>
          <td>{employee.title}</td>
          <td>{employee.department}</td>
          <td>{employee.employeeType}</td>
          <td>{employee.currentStatus ? 1 : 0}</td>
          <td>
            <Link to={`/employee/${employee._id}`}>Edit</Link>
          </td>
          <td onClick={() => deleteSingleEmployee(employee._id)}>Delete</td>
        </tr>
      );
    });
  };
  return (
    <div className="employee__table-wrapper">
      <table className="employee__table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee type</th>
            <th>Current status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>{displayEmployee()}</tbody>
      </table>
      <button className="add_btn" onClick={() => setShowAdd(true)}>
        Add Employee
      </button>
    </div>
  );
};

export default EmployeeTable;
