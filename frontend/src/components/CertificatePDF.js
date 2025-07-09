import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import certificateBg from '../certificate.jpg'; // relative to your src folder

const styles = StyleSheet.create({
  page: { width: '100%', height: '100%', padding: 0, margin: 0 },
  container: { position: 'relative', width: '100%', height: '100%' },
  background: { position: 'absolute', width: '100%', height: '100%' },
  name: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  credentialId: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
});

const CertificatePDF = ({ studentName, courseName, credentialId }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <Image src={certificateBg} style={styles.background} />
        <Text style={styles.name}>{studentName}</Text>
        <Text style={styles.credentialId}>{credentialId || "N/A"}</Text>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
