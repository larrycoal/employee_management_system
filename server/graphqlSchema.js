const Employee = require("./models/employees");

const typeDefs = `
type employee{
  _id:String,
  firstName: String,
  lastName: String,
  age: Int,
  startDate: String,
  title: String,
  department: String,
  employeeType:String,
  currentStatus:Boolean,
}
type Query{
    employeeList:[employee]
}
type Mutation{
    addEmployee(
        firstName:String!,
        lastName:String!,
        age:Int,
        startDate:String!,
        title:String!,
        department:String!,
        employeeType:String!,
        currentStatus:Boolean):employee
}
`;

const employeeList = async () => {
  return await Employee.find({});
};
const addEmployee = async (_, employeeDetails) => {
  await Employee.create(employeeDetails);
  return employeeDetails;
};

const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    addEmployee,
  },
};
module.exports={typeDefs,resolvers}