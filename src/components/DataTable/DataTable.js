import React from 'react';
import Row from '../Row/Row';
import './DataTable.css';

const DataTable = ({ rows, onDesignChange, onDeleteRow, onDragStart, onDrop, onAddRow, onAddVariant }) => {

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product Filter</th>
          {rows.length > 0 && rows[0].variants.map((variant, idx) => (
            <th key={idx}>{variant.name}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            onDesignChange={onDesignChange}
            onDeleteRow={onDeleteRow}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onAddVariant={onAddVariant}
            variants={row.variants}
          />
        ))}
        <tr><td><button onClick={() => onAddRow()}>+</button></td></tr>
      </tbody>
    </table>
  );
};

export default DataTable;
