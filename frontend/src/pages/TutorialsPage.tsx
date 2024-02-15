import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUsers } from "../store/features/tutorialsSlice";

const TutorialsPage = () => {
  const [val, setVal] = useState<null | boolean>(null);
  const [search, setSearch] = useState<null | string>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(val);
    dispatch(fetchUsers());
  }, [val, search]);

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchRef.current?.value || "");
  };

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <form onSubmit={handleSubmmit}>
        <div>
          <label>search</label>
          <input type="search" ref={searchRef} />
          <button type="submit">submit</button>
        </div>
        <div>
          <label>checkbox</label>
          <input
            type="checkbox"
            onChange={(e) => {
              setVal(e.target.checked);
            }}
          />
        </div>
        <div>
          <label>Type: </label>
          <select onChange={handleSelect}>
            <option value="All" selected>
              Show all
            </option>
            <option value="pos">Pos</option>
            <option value="selfpos">Self Pos</option>
            <option value="hardware">Hardware</option>
          </select>
        </div>
        <div>
          <label>Order By: </label>
          <select onChange={handleSelect}>
            <option value="Old">Old</option>
            <option value="New">New</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export const loader = () => {
  return null;
};
export default TutorialsPage;
