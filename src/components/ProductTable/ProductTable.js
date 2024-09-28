import React, { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import './ProductTable.css';

const ProductTable = () => {
  const [rows, setRows] = useState([{ filter: `Filter 1`, variants: [{name: `Primary Variant`, designs: []},{name: `Variant 2`, designs: []},{name: `Variant 3`, designs: []}] }]); // Start with an empty state

  // To add new row(State) in the table
  const handleAddRow = () => {
    const newRow = { filter: `Filter ${rows.length + 1}`, variants: [] };

    // If there are existing rows, copy the variants from the first row
    if (rows.length > 0) {
      const variantsFromFirstRow = rows[0].variants.map(variant => ({
        ...variant,
        designs: [''] // Initialize with one empty design
      }));
      newRow.variants = variantsFromFirstRow;
    }

    setRows([...rows, newRow]);
  };

  // To add new Column(Variant) in the table
  const handleAddVariant = () => {
    const newVariantName = `Variant ${rows[0]?.variants.length + 1}`; // Name for the new variant
    const updatedRows = rows.map(row => ({
      ...row,
      variants: [...row.variants, { name: newVariantName, designs: [] }]
    }));
    setRows(updatedRows);
  };

  // To delete a row from the table
  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  // TO add or update the design
  const handleDesignChange = (rowIndex, variantIndex, designIndex, value) => {
    const updatedRows = [...rows];
    if (!updatedRows[rowIndex].variants[variantIndex].designs[designIndex]) {
      updatedRows[rowIndex].variants[variantIndex].designs[designIndex] = value; // Add the design/image
    } else {
      updatedRows[rowIndex].variants[variantIndex].designs[designIndex] = value; // Update the design/image
    }
    setRows(updatedRows);
  };

  // Drag event
  const handleDragStart = (index) => {
    window.event.dataTransfer.setData('text/plain', index);
  };

  // Drop and interchange the updated row 
  const handleDrop = (index) => {
    const draggedIndex = parseInt(window.event.dataTransfer.getData('text/plain'), 10);
    if (draggedIndex !== index) {
      const updatedRows = [...rows];
      const [movedRow] = updatedRows.splice(draggedIndex, 1);
      updatedRows.splice(index, 0, movedRow);
      setRows(updatedRows);
    }
  };

  return (
    <div className="product-table">
      <DataTable
        rows={rows}
        onDesignChange={handleDesignChange}
        onDeleteRow={handleDeleteRow}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onAddRow={handleAddRow}
        onAddVariant={handleAddVariant}
      />
    </div>
  );
};

export default ProductTable;
