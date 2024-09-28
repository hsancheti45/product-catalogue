import React, {useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './Cell.css';

const Cell = ({ variant, variantIndex, rowIndex, onDesignChange }) => {

  const fileInputRef = useRef(null);

  // Image upload method for designs
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDesignChange(rowIndex, variantIndex, 0, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit the uploaded image
  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  return (
    <td>
      {variant.designs.length > 0 && variant.designs[0] ? (
        <div className="image-container">
          <img src={variant.designs[0]} alt="Design" className="design-image" />
          <button className="edit-button" onClick={handleEditImage}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      )  : (
        <div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id={`upload-${rowIndex}-${variantIndex}`}
            onChange={handleImageUpload}
          />
          <label htmlFor={`upload-${rowIndex}-${variantIndex}`} style={{ cursor: 'pointer'}}>
            + Add Design
          </label>
        </div>
      )}
    </td>
  );
};

export default Cell;
