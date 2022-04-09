/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BanksList from "../components/BanksList";
import SearchBar from "../components/SearchBar";
import { Divider, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../components/Pagination";
import updateLoading from "../actFunctions/updateLoading";
import updateError from "../actFunctions/updateError";
import Navbar from "./Navbar";


function AllBanks() {
  // load the banks from store into state
  const banks = useSelector((state) => state.allBanks);
  // get search params from the store
  const searchParams = useSelector((state) => state.searchParams);

  // used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage, setbanksPerPage] = useState(10);

  // to dispatch action in the redux store
  const dispatch = useDispatch();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // list of banks 
  const [filteredList, setfilteredList] = useState([]);

  // whenever search changes update the query
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

  // pagnination
  let indexOfLastBank = currentPage * banksPerPage;
  let indexOfFirstBank = indexOfLastBank - banksPerPage;
  let currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);

// custom number of banks in the list when selected from from down
  useEffect(() => {
    indexOfLastBank = currentPage * banksPerPage;
    indexOfFirstBank = indexOfLastBank - banksPerPage;
    currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);
  }, [banksPerPage]);

  return (
    <>
      <Navbar />
      <h1>All Banks</h1>
      <Divider />
      <SearchBar />
      <Divider />
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
