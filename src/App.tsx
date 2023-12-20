// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState(0);
  const [dolarValue, setDolarValue] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const updatePrice = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const priceARS = price * dolarValue;
    const priceARSTaxes = priceARS + 0.3 * priceARS + 0.3 * priceARS;
    setFinalPrice(priceARSTaxes);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://dolarapi.com/v1/dolares/oficial",
    }).then((res) => {
      console.log(res);
      setDolarValue(res.data.venta);
    });
  }, []);

  return (
    <Grid
      component="main"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Stack direction="column" spacing={4}>
        <Typography variant="h4" component="h1">
          Calcular Precio
        </Typography>
        <form onSubmit={updatePrice}>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Precio en USD"
              type="number"
              variant="outlined"
              placeholder="$0.00 USD"
              required
              onChange={(e) => setPrice(+e.target.value)}
            ></TextField>
            <Button variant="contained">Calcular</Button>
          </Stack>
        </form>
      </Stack>
      <Stack direction="column" alignItems="center" gap={1}>
        <Stack direction="row" alignItems="center" marginTop={4} gap={1}>
          <Typography variant="h5" component="h2">
            Precio en $ARS: {finalPrice}
          </Typography>
        </Stack>
        <Typography variant="h6" component="h2">
          Dolar oficial: ${dolarValue} ARS
        </Typography>
      </Stack>
    </Grid>
  );
}

export default App;
