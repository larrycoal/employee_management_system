import * as React from "react";
import {  useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";

export default function EmployeeTable({ employeeData, deleteSingleEmployee }) {

  const navigate = useNavigate();
  const columns = [
    {
      id: "_id",
      value: <InfoIcon />,
      minWidth: 170,
      action: true,
      onClick: (id) => navigate(`/employeeDetails/${id}`),
    },
    {
      id: "firstName",
      value: "First Name",
      label: "First Name",
      minWidth: 170,
    },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    {
      id: "age",
      label: "Age",
      minWidth: 170,
      align: "left",
    },
    {
      id: "startDate",
      label: "Start date",
      minWidth: 170,
      align: "left",
      format: (value) => new Date(parseInt(value)).toLocaleDateString(),
    },
    {
      id: "title",
      label: "Title",
      minWidth: 170,
      align: "left",
    },
    {
      id: "department",
      label: "Department",
      minWidth: 170,
      align: "left",
    },
    {
      id: "employeeType",
      label: "Employee type",
      minWidth: 170,
      align: "left",
    },
    {
      id: "currentStatus",
      label: "Current status",
      minWidth: 170,
      align: "left",
      format: (value) => (value ? "Active" : "Retired"),
    },
    {
      id: "_id",
      label: "Edit",
      minWidth: 170,
      align: "left",
      action: true,
      value: <EditIcon />,
      onClick: (id) => navigate(`/employee/${id}`),
    },
    {
      id: "_id",
      label: "Delete",
      minWidth: 170,
      align: "left",
      action: true,
      value: <DeleteIcon />,
      onClick: (id) => deleteSingleEmployee(id),
    },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.align}
                  style={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={value._id}
                        align={column.align}
                        onClick={() =>
                          column.action ? column.onClick(value) : null
                        }
                      >
                        {column.format
                          ? column.format(value)
                          : column.action
                          ? column.value
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
