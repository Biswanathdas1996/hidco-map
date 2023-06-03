import React from "react";

import { useState } from "react";

export default function FilterSelectBox({ data, selectedUser }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return searchRegex.test(item.name) || searchRegex.test(item.contactNumber);
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or contact number"
        className="form-control icon-input "
        style={{ padding: 15 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      {searchTerm && (
        <select
          onChange={(e) => selectedUser(e)}
          onBlur={(e) => selectedUser(e)}
          style={{ padding: 15 }}
          className="form-control icon-input "
        >
          <option key={0} value={0}>
            --- Please select ---
          </option>
          {filteredData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.contactNumber})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
