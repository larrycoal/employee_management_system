import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
const EmployeeDetails = ({ fetchEmployee }) => {
  const [employeeData, setEmployeeData] = useState({});
  const { _id } = useParams();
  const fetchData = useCallback(async () => {
    const resp = await fetchEmployee(_id);
    setEmployeeData(resp);
  }, [_id, fetchEmployee]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 const today = moment()
 const retirementDate = moment(parseInt(employeeData.retirementDate));
  const years = retirementDate.diff(today,"years")
  let remainder = retirementDate.subtract(years,"years")
  const months = remainder.diff(today,"months")
  remainder = remainder.subtract(months,"months")
  const days = remainder.diff(today,"days")

  const date = moment(parseInt(employeeData.startDate)).format("DD-MM-YYYY");
  return (
    <div className="employee_details--wrapper">
      <div className="container">
        <i class="fa-solid fa-user-tie"></i>
        <h2>Personal Information</h2>
        <section className="employee_details">
          <div>
            <span>First Name:</span>
            <span>{employeeData.firstName}</span>
          </div>
          <div>
            <span>Last Name:</span>
            <span>{employeeData.lastName}</span>
          </div>
          <div>
            <span>Age:</span>
            <span>{employeeData.age}</span>
          </div>
          <div>
            <span>Start Date:</span>
            <span>{date}</span>
          </div>
          <div>
            <span>Title:</span>
            <span>{employeeData.title}</span>
          </div>
          <div>
            <span>Status:</span>
            <span>{employeeData.currentStatus ? "Active" : "Retired"}</span>
          </div>
          <div>
            <span>Department:</span>
            <span>{employeeData.department}</span>
          </div>
          <div>
            <span>Type:</span>
            <span>{employeeData.employeeType}</span>
          </div>
          <div>
            <span>Retirement:</span>
            <span>
              {days + "Days, " + months + "Months, " + years + "Years"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDetails;
