import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Box, TextField, Button, Alert, Typography, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Web3 from 'web3';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificatePDF from './CertificatePDF';

function GenerateCertificate({ contract, account }) {
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [certHash, setCertHash] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  const imageURL = `${window.location.origin}/certificate.jpg`; // 🔥 Public folder image path

  const handleGenerate = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    setShowDownload(false);

    try {
      const docRef = doc(db, "students", studentId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Student not found in Firestore. Please check the Student Firebase ID.");
      }

      const studentData = docSnap.data();
      setStudentName(studentData.name);

      const web3Instance = new Web3(window.ethereum);
      const hash = web3Instance.utils.sha3(`${studentId}-${Date.now()}`);
      setCertHash(hash);

      await contract.methods
        .generateCertificate(hash, studentData.name, course, studentId)
        .send({ from: account });

      setStatus(`✅ Certificate generated successfully for ${studentData.name}!`);
      setShowDownload(true);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleGenerate}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: '#fffff',
        borderRadius: 3,
        p: 4,
        color: '#ffa500',
        boxShadow: '0 0 20px rgba(255, 140, 0, 0.4)'
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ color: '#ffa726', display: 'flex', alignItems: 'center' }}>
        <AutoAwesomeIcon sx={{ mr: 1, color: '#ffa726' }} />
        Generate Blockchain Certificate
      </Typography>

      <TextField
        label="Student Firebase ID"
        variant="outlined"
        required
        fullWidth
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        InputLabelProps={{ style: { color: '#ffa726' } }}
        InputProps={{
          style: { color: '#FFA500' },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffa726' },
            '&:hover fieldset': { borderColor: '#ff9800' },
            '&.Mui-focused fieldset': { borderColor: '#ff5722' },
          }
        }}
      />

      <TextField
        label="Course Name"
        variant="outlined"
        required
        fullWidth
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        InputLabelProps={{ style: { color: '#ffa726' } }}
        InputProps={{
          style: { color: '#FFA500' },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffa726' },
            '&:hover fieldset': { borderColor: '#ff9800' },
            '&.Mui-focused fieldset': { borderColor: '#ff5722' },
          }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
        sx={{
          background: 'linear-gradient(to right, #ff6f00, #ff9800)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 16,
          py: 1.5,
          '&:hover': {
            background: 'linear-gradient(to right, #ff8c00, #ff7043)',
            boxShadow: '0 0 10px #ffa500',
          },
        }}
      >
        {loading ? 'Generating...' : 'Generate Certificate'}
      </Button>

      {status && (
        <Alert severity={status.startsWith('✅') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {status}
          {certHash && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Certificate Hash:</strong> {certHash}
            </Typography>
          )}
        </Alert>
      )}

      {showDownload && studentName && course && certHash && (
        <PDFDownloadLink
          document={
            <CertificatePDF
              studentName={studentName}
              courseName={course}
              credentialId={certHash}
              imageSrc={imageURL}
            />
          }
          fileName={`certificate-${studentName.replace(/\s+/g, '_')}.pdf`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Button
              variant="contained"
              color="success"
              disabled={loading}
              sx={{
                mt: 2,
                backgroundColor: '#ff9100',
                '&:hover': { backgroundColor: '#ff6f00', boxShadow: '0 0 10px #ff9800' },
              }}
            >
              {loading ? 'Preparing PDF...' : 'Download Certificate'}
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </Box>
  );
}

export default GenerateCertificate;
