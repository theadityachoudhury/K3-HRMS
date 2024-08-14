import { useState } from 'react';
import Table from '../../Table'
const KIITTable = () => {
  const columnNames = ["Name", "Email", "Phone"];
  const initialRows = [
    { Name: "John Doe", Email: "john@example.com", Phone: "123-456-7890" },
    { Name: "Jane Doe", Email: "jane@example.com", Phone: "098-765-4321" },
  ];

  const [rows, setRows] = useState(initialRows);

  // Function to add a new row
  const handleAdd = (newRow: any) => {
    setRows([...rows, newRow]);
  };

  // Function to edit an existing row
  const handleEdit = (index: any, updatedRow: any) => {
    const updatedRows = rows.map((row, i) => (i === index ? updatedRow : row));
    setRows(updatedRows);
  };

  // Function to delete a row
  const handleDelete = (index: any) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Function to view a row's details (could be a simple alert or a more complex modal)
  const handleView = (row: any) => {
    alert(`Viewing row: ${JSON.stringify(row, null, 2)}`);
  };

  // Actions object to be passed to the Index component
  const actions = {
    View: (row: any) => handleView(row),
    Edit: (row: any, index: any) => handleEdit(index, row),
    Delete: (_: any, index: any) => handleDelete(index),
    Add: (newRow: any) => handleAdd(newRow),
  };
  return (
    <div>
      <Table columnNames={columnNames} rows={rows} isAction={true} actions={actions} />
    </div>
  )
}

export default KIITTable