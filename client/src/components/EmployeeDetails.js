import React,{useState,useEffect,useCallback} from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div className="employee_details--wrapper">
      <div className="container">
        <i class="fa-thin fa-user-tie"></i>
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
            <span>Start Date</span>
            <span>{employeeData.startDate}</span>
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
            <span>{employeeData.type}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDetails;
