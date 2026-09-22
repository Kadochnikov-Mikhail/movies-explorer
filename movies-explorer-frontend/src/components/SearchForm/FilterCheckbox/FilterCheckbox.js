import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onCheckBoxClick, initState }) {
  const [checked, setChecked] = useState(initState);

  function handleCheckboxChange() {
    const newChecked = !checked;

    setChecked(newChecked);
    onCheckBoxClick(newChecked);
  }

  return (
    <div className="filter-checkbox">
      <label>
        <input
          className="filter-checkbox_input"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          id="short"
          name="short-films"
        />

        <span className="visible-checkbox"></span>

        <span className="filter-checkbox_text">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
