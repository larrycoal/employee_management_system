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
type Mutation{
    editEmployee(
        _id:String!
        firstName:String!,
        lastName:String!,
        age:Int,
        startDate:String!,
        title:String!,
        department:String!,
        employeeType:String!,
        currentStatus:Boolean):employee
}
type Mutation{
    fetchSingleEmployee(_id:String):employee
}
`;

const employeeList = async () => {
  return await Employee.find({});
};
const addEmployee = async (_, employeeDetails) => {
  await Employee.create(employeeDetails);
  return employeeDetails;
};
const fetchSingleEmployee = async (_, id) => {
  const resp = await Employee.findById(id);
  return resp;
};
const editEmployee = async (_, employeeDetails) => {
  const resp = await Employee.findByIdAndUpdate(employeeDetails._id, {
    ...employeeDetails,
  });
  if (resp) {
    console.log(resp);
  }
};
const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    addEmployee,
    fetchSingleEmployee,
    editEmployee,
  },
};
module.exports = { typeDefs, resolvers };
