import React,{useState} from 'react';
import Alerts from '../utils/Alert';

const EmployeeCreate = ({ showAdd, setShowAdd, AddNewEmployee,fetchData }) => {
  const [formData, setFormData] = useState({});
    const [error, setError] = useState({
      open: false,
      message: "",
    });
 let errorMessage= null
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const data in formData) {
      switch (data) {
        case "firstName":
          if (formData[data] === "" || formData[data] === null)
            errorMessage = "Please enter employee firstname";
          break;
        case "lastName":
          if (formData[data] === "" || formData[data] === null)
            errorMessage = "Please enter employee lastname";
          break;
        case "age":
          if (parseInt(formData[data]) < 20 || parseInt(formData[data]) > 70)
            errorMessage = "Employee age must be between 20 and 70";
          break;
        case "employeeType":
          if ((formData[data] === "Contract" || formData[data]==="Seasonal") && formData.title !== "Employee")
            errorMessage = "Contractor/Seasonal Employee Can’t be Manager/Director/VP"
          break;
        default:
          break;
      }
    }
    console.log("Validation error===>",errorMessage)
    if (errorMessage === null) {
      const dataToSubmit = {
        ...formData,
        currentStatus: 1,
        age: parseInt(formData.age),
      };
      AddNewEmployee(dataToSubmit);
      setShowAdd(false);
      fetchData()
    }else{
      setError({
        open:true,
        message:errorMessage
      })
    }
  };
  return (
    <div
      className="employee__create-wrapper"
      style={{ display: showAdd && "flex" }}
    >
      <div className="employee__create-modal">
        <div className="modal__header">Add Employee</div>
        <form onSubmit={handleSubmit} className="modal__body">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
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
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <select name="title" id="title" onChange={handleChange} required>
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
            <button>Add</button>
            <button
              type="button"
              onClick={() => {
                setShowAdd(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <Alerts error={error} setError={setError} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EmployeeCreate;