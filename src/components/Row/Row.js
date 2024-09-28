import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import Cell from '../Cell/Cell';

const Row = ({ row, rowIndex, onDesignChange, onDeleteRow, onDragStart, onDrop, onAddVariant, variants }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters
  const sampleFilter = ['Filter 1', 'Filter 2', 'Filter 3'];

  // Apply and Remove filters
  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) => {
      // Toggle filter selection
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter); // Remove if already selected
      } else {
        return [...prev, filter]; // Add to selected filters
      }
    });
  };

  return (
    <tr
      draggable
      onDragStart={() => onDragStart(rowIndex)}
      onDrop={() => onDrop(rowIndex)}
      onDragOver={(e) => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td>
        {hovered && (
          <span
            onClick={() => onDeleteRow(rowIndex)}
            style={{ marginLeft: '5px', marginBottom: '10px', cursor: 'pointer', color: 'red' }}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        )}
        <br />
        {rowIndex + 1}
        <span style={{ cursor: 'grab', marginLeft: '5px', marginBottom: '20px', color:'black', fontSize: '22px'}}>
          <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <br /><br />
      </td>
      <td>
        {sampleFilter.map((filter) => (
          <span
            key={filter}
            onClick={() => handleFilterClick(filter)}
            style={{
              padding: '5px 10px',
              margin: '2px',
              borderRadius: '5px',
              backgroundColor: selectedFilters.includes(filter) ? 'rgb(203, 245, 203)':'#f1f1f1',
              color: selectedFilters.includes(filter) ? 'rgb(28, 117, 28)':'#000',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            {filter}
          </span>
        ))}
      </td>
      {variants.map((variant, variantIndex) => (
        <Cell
          key={variantIndex}
          variant={variant}
          variantIndex={variantIndex}
          rowIndex={rowIndex}
          onDesignChange={onDesignChange}
        />
      ))}
      <td><button onClick={() => onAddVariant()}>+</button></td>
    </tr>
  );
};

export default Row;
