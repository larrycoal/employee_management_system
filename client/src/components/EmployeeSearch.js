import React from 'react';

const EmployeeSearch = ({ employees, setFilteredEmployees }) => {
  const filterEmployee = (filterParam) => {
    if (filterParam === "All") {
      setFilteredEmployees(employees);
    } else {
      const temp = employees.filter((emp) => emp.employeeType === filterParam);
      setFilteredEmployees(temp);
    }
  };
  return (
    <div className="filter__wrapper">
      <h3>Filter:</h3>
      <form>
        <select onChange={(e) => filterEmployee(e.target.value)}>
          <option value="All">All</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </form>
    </div>
  );
};

export default EmployeeSearch;