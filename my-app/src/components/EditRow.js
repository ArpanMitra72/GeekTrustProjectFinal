import React, { useState } from "react";
import "./EditRow.css";

const EditRow = ({ member, onSave, onCancel }) => {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [role, setRole] = useState(member.role);

  const handleSave = () => {
    onSave({
      id: member.id,
      name: name,
      email: email,
      role: role,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </td>
      <td>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </td>
      <td>
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </td>
      <td>
        <div
          style={{ display: "flex", gap: "1rem" }}
          className="action-buttons"
        >
          <button onClick={handleSave} className="add-button">
            Add
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};
export default EditRow;
