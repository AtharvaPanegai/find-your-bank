import React, { useState } from "react";
import { useSelector } from "react-redux";
import BanksList from "../components/BanksList";
import { Divider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import PaginationComponent from "../components/Pagination";

function Favorites() {
  // load favorites from store
  const favorites = useSelector((state) => state.favorites);
  const history = useHistory();

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage] = useState(10);

// pagination
  let indexOfLastBank = currentPage * banksPerPage;
  let indexOfFirstBank = indexOfLastBank - banksPerPage;
  let currentBank = favorites.slice(indexOfFirstBank, indexOfLastBank);

  // mainpulate the current page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1>Favorites</h1>
      <Divider style={{ marginBottom: "40px" }} />
      <Button
        startIcon={<ArrowBack />}
        style={{ marginBottom: "20px" }}
        color="secondary"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </Button>
   {/* list of favorite banks  */}
      {favorites.length > 0 ? (
        <>
          <BanksList bankList={currentBank} />
          <PaginationComponent
            banksPerPage={banksPerPage}
            totalBanks={favorites.length}
            paginate={paginate}
          />
        </>
      ) : (
        <p>No favorite banks</p>
      )}
    </>
  );
}

export default Favorites;
