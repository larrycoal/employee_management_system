const Employee = require("./models/employees");
const moment = require("moment")
const typeDefs = `
type employee{
  _id:String,
  firstName: String,
  lastName: String,
  age: Int,
  startDate: String,
  retirementDate:String,
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
        firstName:String,
        lastName:String,
        age:Int,
        startDate:String,
        title:String,
        department:String,
        employeeType:String,
        currentStatus:Boolean):employee
}
type Mutation{
    fetchSingleEmployee(_id:String):employee
}
type Mutation{
    deleteEmployee(_id:String):Boolean
}
`;

const employeeList = async () => {
  return await Employee.find({});
};
const addEmployee = async (_, employeeDetails) => {
  const yearsToRetirement = 64 - employeeDetails.age;
  const retirementDate = moment(employeeDetails.startDate).add(yearsToRetirement,'years').add(6,'months').format("YYYY-MM-DD")

  const newEmployeeDetails = {
   ...employeeDetails,
   retirementDate,
 };
 await Employee.create(newEmployeeDetails);
 return newEmployeeDetails;
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
    return resp;
  }
};
const deleteEmployee = async(_,employeeId)=>{
     Employee.findByIdAndDelete(employeeId,(err,doc)=>{
         if(err){
            console.log(err)
         }else{
            console.log(doc)
            return true
         }
     })
}
const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    addEmployee,
    fetchSingleEmployee,
    editEmployee,
    deleteEmployee
  },
};
module.exports = { typeDefs, resolvers };
