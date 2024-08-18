// KIITTable.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../Table';

const KIITTable: React.FC = () => {
  const [rows, setRows] = useState<{ [key: string]: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(13); // Rows per page

  const columnNames = ["Name", "Email", "Phone"];

  useEffect(() => {
    // Simulate fetching data from an API with loading
    setIsLoading(true);
    setTimeout(() => {
      const data = [
        { Name: "John Doe", Email: "john@example.com", Phone: "123-456-7890" },
        { Name: "Jane Smith", Email: "jane.smith@example.com", Phone: "987-654-3210" },
        { Name: "Alice Johnson", Email: "alice.johnson@example.com", Phone: "555-234-5678" },
        { Name: "Bob Brown", Email: "bob.brown@example.com", Phone: "444-987-6543" },
        { Name: "Charlie Davis", Email: "charlie.davis@example.com", Phone: "333-123-4567" },
        { Name: "Diana Miller", Email: "diana.miller@example.com", Phone: "666-789-1234" },
        { Name: "Eve Wilson", Email: "eve.wilson@example.com", Phone: "777-555-4321" },
        { Name: "Frank Moore", Email: "frank.moore@example.com", Phone: "888-666-7890" },
        { Name: "Grace Lee", Email: "grace.lee@example.com", Phone: "999-444-5678" },
        { Name: "Henry Clark", Email: "henry.clark@example.com", Phone: "222-333-4444" },
        { Name: "Ivy Hall", Email: "ivy.hall@example.com", Phone: "111-777-8888" },
        { Name: "Jack King", Email: "jack.king@example.com", Phone: "555-111-2222" },
        { Name: "Kelly Young", Email: "kelly.young@example.com", Phone: "444-888-9999" },
        { Name: "Leo Scott", Email: "leo.scott@example.com", Phone: "333-666-7777" },
        { Name: "Mona White", Email: "mona.white@example.com", Phone: "999-555-1111" },
        { Name: "Nancy Green", Email: "nancy.green@example.com", Phone: "888-222-4444" },
        { Name: "Oscar Hill", Email: "oscar.hill@example.com", Phone: "777-999-3333" },
        { Name: "Paula Adams", Email: "paula.adams@example.com", Phone: "666-111-5555" },
        { Name: "Quincy Baker", Email: "quincy.baker@example.com", Phone: "555-333-8888" },
        { Name: "Rachel Carter", Email: "rachel.carter@example.com", Phone: "444-222-9999" },
        { Name: "Steve Turner", Email: "steve.turner@example.com", Phone: "333-888-6666" },
        { Name: "Tina Collins", Email: "tina.collins@example.com", Phone: "222-777-4444" },
        { Name: "Uma Foster", Email: "uma.foster@example.com", Phone: "111-999-3333" },
        { Name: "Victor Howard", Email: "victor.howard@example.com", Phone: "666-444-5555" },
        { Name: "Wendy Kelly", Email: "wendy.kelly@example.com", Phone: "999-111-2222" },
        { Name: "Xander Lewis", Email: "xander.lewis@example.com", Phone: "888-333-4444" },
        { Name: "Yvonne Martinez", Email: "yvonne.martinez@example.com", Phone: "777-555-6666" },
        { Name: "Zachary Nelson", Email: "zachary.nelson@example.com", Phone: "666-777-8888" },
        { Name: "Amy Parker", Email: "amy.parker@example.com", Phone: "444-111-3333" },
        { Name: "Blake Quinn", Email: "blake.quinn@example.com", Phone: "555-444-2222" },
        { Name: "Caitlyn Reed", Email: "caitlyn.reed@example.com", Phone: "333-555-7777" },
        { Name: "David Sanders", Email: "david.sanders@example.com", Phone: "222-888-1111" },
        { Name: "Ella Taylor", Email: "ella.taylor@example.com", Phone: "111-666-4444" },
        { Name: "Finn Morgan", Email: "finn.morgan@example.com", Phone: "999-333-6666" },
        { Name: "Gina Roberts", Email: "gina.roberts@example.com", Phone: "888-555-7777" },
        { Name: "Holly Stewart", Email: "holly.stewart@example.com", Phone: "777-222-3333" },
        { Name: "Ian Carter", Email: "ian.carter@example.com", Phone: "444-999-8888" },
        { Name: "Jill Ross", Email: "jill.ross@example.com", Phone: "333-111-4444" },
        { Name: "Kyle Bennett", Email: "kyle.bennett@example.com", Phone: "222-666-9999" },
        { Name: "Luna Hayes", Email: "luna.hayes@example.com", Phone: "111-444-7777" },
        { Name: "Mark Price", Email: "mark.price@example.com", Phone: "555-222-8888" },
        { Name: "Nina Griffin", Email: "nina.griffin@example.com", Phone: "444-777-6666" },
        { Name: "Owen James", Email: "owen.james@example.com", Phone: "999-666-3333" },
        { Name: "Penny Ward", Email: "penny.ward@example.com", Phone: "888-444-2222" },
        { Name: "Quinn Fox", Email: "quinn.fox@example.com", Phone: "777-999-1111" },
        { Name: "Riley Scott", Email: "riley.scott@example.com", Phone: "666-333-5555" },
        { Name: "Sophie Bell", Email: "sophie.bell@example.com", Phone: "555-111-9999" },
        { Name: "Tommy Moore", Email: "tommy.moore@example.com", Phone: "333-777-8888" },
        { Name: "Ursula Price", Email: "ursula.price@example.com", Phone: "444-888-1111" },
      ];
      setRows(data.slice((currentPage - 1) * perPage, currentPage * perPage));
      setTotalPages(Math.ceil(data.length / perPage));
      setIsLoading(false);
    }, 1000);
  }, [currentPage]);

  const handleAdd = (newRow: { [key: string]: string }) => {
    setRows([...rows, newRow]);
  };

  const handleEdit = (index: number, updatedRow: { [key: string]: string }) => {
    const updatedRows = rows.map((row, i) => (i === index ? updatedRow : row));
    setRows(updatedRows);
  };

  const handleDelete = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleView = (row: { [key: string]: string }) => {
    alert(`Viewing row: ${JSON.stringify(row, null, 2)}`);
  };

  const actions = {
    View: handleView,
    Edit: (row: any, index: any) => handleEdit(index, row),
    Delete: (_: any, index: any) => handleDelete(index),
    Add: handleAdd,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table
        columnNames={columnNames}
        rows={rows}
        isAction={true}
        actions={actions}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default KIITTable;
