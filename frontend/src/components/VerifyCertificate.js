import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, Divider } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import DownloadIcon from '@mui/icons-material/Download';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificatePDF from './CertificatePDF';

function VerifyCertificate({ contract }) {
  const [certHash, setCertHash] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
const handleVerify = async () => {
  setResult(null);
  setLoading(true);
  console.log("🔍 Verifying cert hash:", certHash);

  try {
    if (!contract) throw new Error("Contract not initialized");

    const data = await contract.methods.verifyCertificate(certHash).call();
    console.log("✅ Smart contract returned:", data);

    const name = data[0];
    const course = data[1];
    const timestamp = parseInt(data[2]);
    const firebaseId = data[3];

    const dateFormatted = isNaN(timestamp) ? "Invalid Date" : new Date(timestamp * 1000).toLocaleDateString();

    if (firebaseId && firebaseId.length > 0) {
      setResult({
        valid: true,
        studentName: name,
        course: course,
        date: dateFormatted,
        firebaseId: firebaseId
      });
    } else {
      setResult({ valid: false });
    }
  } catch (err) {
    console.error("❌ Verification error:", err.message);
    setResult({ valid: false });
  }
  setLoading(false);
};



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="primary">
        <VerifiedIcon sx={{ mr: 1, color: '#00e676' }} />
        Verify Certificate
      </Typography>

      <TextField
        label="Certificate Hash"
        variant="outlined"
        value={certHash}
        onChange={(e) => setCertHash(e.target.value)}
        fullWidth
        placeholder="Enter certificate hash to verify"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleVerify}
        disabled={loading || !certHash}
        sx={{ fontWeight: 'bold', fontSize: 18, py: 1.5 }}
        startIcon={<VerifiedIcon />}
      >
        {loading ? 'Verifying...' : 'Verify Certificate'}
      </Button>

      {result && (
        <Card sx={{ p: 3, mt: 2, bgcolor: result.valid ? '#e8f5e9' : '#ffebee', borderRadius: 2 }}>
          {result.valid ? (
            <>
              <Typography variant="h6" color="success.main" gutterBottom>
                <VerifiedIcon sx={{ mr: 1 }} /> Valid Certificate
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Student Name:</strong> {result.studentName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Course:</strong> {result.course}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Issue Date:</strong> {result.date}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                <strong>Credential ID:</strong> {certHash}
              </Typography>

             {result.studentName && result.course && certHash && (
  <PDFDownloadLink
    document={
      <CertificatePDF
        studentName={result.studentName}
        courseName={result.course}
        credentialId={certHash}
      />
    }
    fileName={`verified-certificate-${result.studentName.replace(/\s+/g, '_')}.pdf`}
    style={{ textDecoration: 'none' }}
  >
    {({ loading }) => (
      <Button
        variant="contained"
        color="success"
        disabled={loading}
        startIcon={<DownloadIcon />}
      >
        {loading ? 'Preparing...' : 'Download Certificate'}
      </Button>
    )}
  </PDFDownloadLink>
)}

            </>
          ) : (
            <Typography color="error">
              ❌ Invalid certificate! This certificate doesn't exist on the blockchain.
            </Typography>
          )}
        </Card>
      )}
    </Box>
  );
}

export default VerifyCertificate;
