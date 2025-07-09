import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from './abi/certificateABI.json';
import GenerateCertificate from './components/GenerateCertificate';
import VerifyCertificate from './components/VerifyCertificate';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, CssBaseline, Box } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contractAddress = '0xD450625ec80e922D23b560429814cD52B267364F'; // Replace with your deployed contract address
        const contractInstance = new web3.eth.Contract(ABI, contractAddress);
        setContract(contractInstance);
      }
    };
    init();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{
  background: 'linear-gradient(to right, #ffffff, #ff8c00)',
  boxShadow: '0 0 20px #ff8c00',
  color: '#000'
}}>
  <Toolbar>
    <VerifiedIcon sx={{ mr: 2, fontSize: 32, color: '#ff6f00' }} />
    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 2 }}>
      Blockchain Certificate Portal
    </Typography>
  </Toolbar>
</AppBar>

<Container maxWidth="lg" sx={{ mt: 6 }}>
  <Grid container spacing={4}>
    <Grid item xs={12} md={6}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: 4,
        background: '#fff',
        boxShadow: '0 0 20px #ff8c00',
        color: '#000'
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <AddCircleOutlineIcon sx={{ mr: 1, fontSize: 28, color: '#ff6f00' }} />
          <Typography variant="h6" fontWeight="bold" color="#ff6f00">
            Generate Certificate
          </Typography>
        </Box>
        {contract && account ? (
          <GenerateCertificate contract={contract} account={account} />
        ) : (
          <Typography color="#999">Connecting to wallet...</Typography>
        )}
      </Paper>
    </Grid>

    <Grid item xs={12} md={6}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: 4,
        background: '#fff',
        boxShadow: '0 0 20px #ffa500',
        color: '#000'
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <VerifiedIcon sx={{ mr: 1, fontSize: 28, color: '#ff6f00' }} />
          <Typography variant="h6" fontWeight="bold" color="#ff6f00">
            Verify Certificate
          </Typography>
        </Box>
        {contract ? (
          <VerifyCertificate contract={contract} />
        ) : (
          <Typography color="#999">Connecting to contract...</Typography>
        )}
      </Paper>
    </Grid>
  </Grid>
</Container>

    </>
  );
}

export default App;
