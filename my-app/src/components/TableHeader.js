import React from "react";
// import "./TableHeader.css";

const TableHeader = ({ onCheckAll, checkedAll }) => {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            id="checkAll"
            checked={checkedAll}
            onChange={onCheckAll}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TableHeader;
