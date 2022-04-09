import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Paper,
  Divider,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

function BankDetails() {
  // get ID of bank from the URL
  const { id } = useParams();

  // banks currently in store
  const banks = useSelector((state) => state.allBanks);
  const favorites = useSelector((state) => state.favorites);

  const [bankDetails, setbankDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // check if the bank is present in current bank store
    banks.map((bank) => {
      if (bank.ifsc === id) {
        setbankDetails(bank);
      }
    });

    // if the bank is not present in current bank in store
    // which means
    // this is is a favorite bank
    if (bankDetails === null) {
      favorites.map((bank) => {
        if (bank.ifsc === id) {
          setbankDetails(bank);
        }
      });
    }
  }, [bankDetails, banks, favorites, id]);

  return (
    <>
      <h1>BankDetails</h1>
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
      <Paper>
        <div className="paperData">
          <Typography variant="subtitle1">
            <Grid container spacing={2}>
              {bankDetails ? (
                <>
                  <Grid item xs={12}>
                    <b>Bank Name:</b> {bankDetails["bank_name"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>IFSC code:</b> {bankDetails["ifsc"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>Bank ID:</b> {bankDetails["bank_id"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>Branch:</b> {bankDetails["branch"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>City:</b> {bankDetails["city"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>District:</b> {bankDetails["district"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>State:</b> {bankDetails["state"]}
                  </Grid>
                  <Grid item xs={12}>
                    <b>Address:</b> {bankDetails["address"]}
                  </Grid>
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default BankDetails;
