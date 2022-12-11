import React, { useEffect, useState } from "react";
import moment from "moment";
import EmployeeSearch from "./EmployeeSearch";

const Retiree = ({ employees }) => {
  const [retiredEmployee, setRetiredEmployee] = useState([]);
  useEffect(() => {
    setRetiredEmployee(employees);
  }, [employees]);

  const DisplayCard = ({ details }) => {
    return (
      <div className="retiree--card">
        <p>
          <span>First Name:</span>
          <span>{details.firstName}</span>
        </p>
        <p>
          <span>Last Name:</span>
          <span>{details.lastName}</span>
        </p>
        <p>
          <span>Age:</span>
          <span>{details.age}</span>
        </p>
        <p>
          <span>Employee Type:</span>
          <span>{details.employeeType}</span>
        </p>
        <p>
          <span>Start date:</span>
          <span>
            {moment(parseInt(details.startDate)).format("YYYY-MM-DD")}
          </span>
        </p>
        <p>
          <span>Retirement Date:</span>
          <span>
            {moment(parseInt(details.retirementDate)).format("YYYY-MM-DD")}
          </span>
        </p>
      </div>
    );
  };
  return (
    <div className="retiree_wrapper">
      <EmployeeSearch
        employees={employees}
        setFilteredEmployees={setRetiredEmployee}
      />
      <div className="container">
        {retiredEmployee
          ? retiredEmployee.map((details) => (
              <DisplayCard key={details._id} details={details} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Retiree;
