import React from 'react';
import './variantsDisplay.css';
import { RiFileCopyLine } from '@remixicon/react';

const VariantsDisplay = ({ variants, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="variants-loading">
        <div className="shimmer"></div>
        <div className="shimmer"></div>
        <div className="shimmer"></div>
      </div>
    );
  }

  if (!variants || variants.length === 0) return null;

  return (
    <div className="variants-container">
      <div className="variants-label">Suggested Titles</div>
      <div className="variants-grid">
        {variants.map((variant, index) => (
          <div 
            key={index} 
            className="variant-chip"
            onClick={() => onSelect(variant)}
          >
            {variant}
            <RiFileCopyLine 
            onClick={() => onSelect(variant)}
            color="#9712c0"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsDisplay;
