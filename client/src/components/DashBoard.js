import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Card = ({ count, title }) => {
  return (
    <div className="card__wrapper">
      <div className="top"></div>
      <div className="bottom">
        <span>{count}</span>
        <span>{title}</span>
      </div>
    </div>
  );
};

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="EmployeeCount" stroke="#8884d8" fill="#2a312f" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const DashBoard = ({ employees }) => {
  const allyears = employees.map((emp) => {
    const date = new Date(parseInt(emp.startDate));
    return {
      year: date.getFullYear(),
    };
  });
  let temp = {};
  allyears.forEach((y) => {
    if (!temp[y.year]) {
      temp[y.year] = 1;
    } else {
      temp[y.year] = temp[y.year] + 1;
    }
  });
  let chartData = [];
  for (let key in temp) {
    chartData.push({
      year: key,
      EmployeeCount: temp[key],
    });
  }
  return (
    <div className="dashboard__wrapper">
      <div className="top">
        <Card count={employees.length} title="Total Employee" />
        <Card
          count={employees.filter((e) => e.employeeType === "Full-Time").length}
          title="Full-Time Employee"
        />
        <Card
          count={employees.filter((e) => !e.currentStatus).length}
          title="Retired Employee"
        />
      </div>
      <div className="chart__wrapper">
        <h2>Employee Growth Representation</h2>
        <Chart data = {chartData} />
      </div>
    </div>
  );
};

export default DashBoard;
