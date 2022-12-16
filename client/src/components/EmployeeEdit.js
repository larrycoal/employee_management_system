import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeEdit = ({ EditEmployee, fetchEmployee }) => {
  const [employeeData, setEmployeeData] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    const resp = await fetchEmployee(_id);
    setEmployeeData(resp);
  }, [_id, fetchEmployee]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    if (e.target.name === "currentStatus") {
      setEmployeeData({
        ...employeeData,
        currentStatus: parseInt(e.target.value),
      });
    } else {
      setEmployeeData({
        ...employeeData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...employeeData,
      age: parseInt(employeeData.age),
    };
    EditEmployee(dataToSubmit);
    navigate("/employee");
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
          />
        </div>
        <div>
          <label htmlFor="currentStatus">Status</label>
          <select
            name="currentStatus"
            id="currentStatus"
            //value={employeeData.currentStatus ? "Active":"Retired"}
            onChange={handleChange}
            required
          >
            <option value="1">Active</option>
            <option value="0">Retired</option>
          </select>
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
