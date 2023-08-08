import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { red } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import TableHeader from "./TableHeader";
import SearchBar from "./Searchbar";
import EditRow from "./EditRow";
import "./TableHeader.css";
import "./TableBody.css";
import "./Admin.css";

function Admin() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setMembers(response.data);
        setFilteredMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Responsible for Searchber
  const handleSearch = (quary) => {
    const filteredData = members.filter(
      (member) =>
        member.name.toLowerCase().includes(quary.toLowerCase()) ||
        member.email.toLowerCase().includes(quary.toLowerCase()) ||
        member.role.toLowerCase().includes(quary.toLowerCase())
    );
    setFilteredMembers(filteredData);
    setCurrentPage(1);
  };

  //for handleing the checkbox
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  //function for Delete icon
  const handleDeleteRow = (id) => {
    const updatedMembers = filteredMembers.filter((member) => member.id !== id);
    setFilteredMembers(updatedMembers);
    setMembers(updatedMembers);
  };

  //function for edit icon
  const handleEditRow = (id) => {
    setEditingRow(id);
  };

  //function for add button
  const handleSaveRow = (updatedMember) => {
    const updatedMembers = filteredMembers.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    setEditingRow(null);
  };

  //function for cancel button
  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  //function for handle the header checkbox
  const handleCheckAll = (event) => {
    const checked = event.target.checked;
    const pageMembers = currentMembers.map((member) => member.id);
    setSelectedRows(checked ? pageMembers : []);
  };

  //function for delete selected button
  const handleDeleteSelected = () => {
    const updatedMembers = filteredMembers.filter(
      (member) => !selectedRows.includes(member.id)
    );
    setFilteredMembers(updatedMembers);
    setMembers(updatedMembers);
    setSelectedRows([]);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  //pagination left most arrow button
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };

  //pagination left arrow button
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setSelectedRows([]);
  };

  //pagination right arrow button
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setSelectedRows([]);
  };

  //pagination rightmost arrow button
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };

  //pagination page change
  const handleJumpToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedRows([]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <table className="admin-table">
        <TableHeader
          onCheckAll={handleCheckAll}
          checkedAll={selectedRows.length === currentMembers.length}
        />
        <tbody>
          {currentMembers.map((member) =>
            editingRow === member.id ? (
              <EditRow
                key={member.id}
                member={member}
                onSave={handleSaveRow}
                onCancel={handleCancelEdit}
              />
            ) : (
              <tr
                key={member.id}
                className={
                  selectedRows.includes(member.id) ? "selected-row" : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(member.id)}
                    onChange={() => handleCheckboxChange(member.id)}
                  />
                </td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <div className="working-icons">
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ color: "#00060f", cursor: "pointer" }}
                        className="setIcon"
                        onClick={() => handleEditRow(member.id)}
                      />
                    </div>
                    <div>
                      <DeleteOutlineIcon
                        style={{ color: red[500], cursor: "pointer" }}
                        onClick={() => handleDeleteRow(member.id)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem" }} className="bottom-container">
        <button
          className="delete-selected-button"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
        <div className="pagination-wrapper">
          <div className="pagination-container">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={handleFirstPage}
            >
              &laquo;
            </button>
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  disabled={currentPage === pageNumber}
                  onClick={() => handleJumpToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              &gt;
            </button>
            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={handleLastPage}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
