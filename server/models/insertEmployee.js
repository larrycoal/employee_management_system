require("./db");
const employee = require("./employees");

const temp = [
  {
    firstName: "Lanre",
    lastName: "Olayiwola",
    age: 25,
    startDate: new Date(),
    title: "Developer",
    department: "Engineering",
    employeeType: "Remote",
    currentStatus: 1,
  },
  {
    firstName: "Dolapo",
    lastName: "Olayiwola",
    age: 35,
    startDate: new Date(),
    title: "Hacker",
    department: "Cyber Security",
    employeeType: "Remote",
    currentStatus: 1,
  },
];
employee.insertMany(temp).then(function (data) {
  console.log("Data", data);
}).catch(err=>console.log(err));


