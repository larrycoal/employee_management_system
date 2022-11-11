import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeEdit = ({EditEmployee}) => {
  const [employeeData, setEmployeeData] = useState({});
  const { _id } = useParams("id");

  const query = `mutation{
        fetchSingleEmployee(_id:"${_id}"){
        _id,
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
  const fetchEmployee = useCallback(async () => {
    try {
      await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then(async (response) => {
        let resp = await response.json();
        if (resp.data) {
          setEmployeeData({ ...resp.data.fetchSingleEmployee });
        }
        if (resp.errors.length > 0) {
          console.log(resp.errors[0].message);
        }
      });
    } catch (error) {}
  }, [query]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
     const dataToSubmit = {
       ...employeeData,
       currentStatus: 1,
       age: parseInt(employeeData.age),
     };
    EditEmployee(dataToSubmit);
  };

  return (
    <div className="edit__employee--wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employeeData?.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employeeData?.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={employeeData?.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Date Of Joining</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <select
            name="title"
            id="title"
            value={employeeData?.title}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            value={employeeData?.department}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
        <div>
          <label htmlFor="employeeType">Employee Type</label>
          <select
            name="employeeType"
            id="employeeType"
            value={employeeData?.employeeType}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
        <div className="modal__action">
          <button>Edit Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
