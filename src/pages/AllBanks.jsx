/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BanksList from "../components/BanksList";
import SearchBar from "../components/SearchBar";
import { Divider, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../components/Pagination";
import updateLoading from "../actFunctions/updateLoading";
import updateError from "../actFunctions/updateError";

function AllBanks() {
  // from bank to state
  const banks = useSelector((state) => state.allBanks);
  // search params from the store
  const searchParams = useSelector((state) => state.searchParams);

  // used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage, setbanksPerPage] = useState(10);

  const dispatch = useDispatch();

// pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // list of banks which will be rendered 
  const [filteredList, setfilteredList] = useState([]);

  // run the useEffect whenever search changes
  useEffect(() => {
    setfilteredList(banks);

    if (searchParams.query != "") {
      dispatch(updateLoading(true));
      setfilteredList(
        banks.filter((bank) => {
          return bank[searchParams.category]
            .toLowerCase()
            .startsWith(searchParams.query.toLowerCase());
        })
      );

      if (filteredList.length === 0) {
        dispatch(updateError({ msg: "Not found" }));
      }

      dispatch(updateLoading(false));
    }
  }, [banks, searchParams.category, searchParams.query]);

  // used for pagination
  let indexOfLastBank = currentPage * banksPerPage;
  let indexOfFirstBank = indexOfLastBank - banksPerPage;
  let currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);

// whenever we change the number of banks from the drop down
  useEffect(() => {
    indexOfLastBank = currentPage * banksPerPage;
    indexOfFirstBank = indexOfLastBank - banksPerPage;
    currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);
  }, [banksPerPage]);

  return (
    <>
      <h1>All Banks</h1>
      <Divider />
      <SearchBar />
      <Divider />
      <Typography variant="h6" color="secondary" style={{ margin: "30px 0" }}>
        Banks list (
        <span style={{ color: "#000", fontSize: "17px" }}>
          {filteredList.length}
        </span>
        )
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
        }}
      >
        <div>
          Rows per page:
          <select
            value={banksPerPage}
            onChange={(e) => {
              setbanksPerPage(e.target.value);
            }}
            onBlur={(e) => {
              setbanksPerPage(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </select>{" "}
        </div>
      </div>
      <BanksList bankList={currentBank} />

      <PaginationComponent
        banksPerPage={banksPerPage}
        totalBanks={filteredList.length}
        paginate={paginate}
      />
    </>
  );
}

export default AllBanks;
