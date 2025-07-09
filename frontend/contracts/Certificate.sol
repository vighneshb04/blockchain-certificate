// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Certificate {
    struct CertData {
        string studentName;
        string course;
        uint256 issueDate;
        string firebaseId;
    }

    mapping(string => CertData) private certificates;
    address public owner;

    event CertificateGenerated(string indexed certificateHash);

    constructor() {
        owner = msg.sender;
    }

    function generateCertificate(
        string memory _certHash,
        string memory _name,
        string memory _course,
        string memory _firebaseId
    ) external {
        // ✅ Removed owner check so anyone can call
        require(bytes(_firebaseId).length > 0, "Invalid Firebase ID");

        certificates[_certHash] = CertData(
            _name,
            _course,
            block.timestamp,
            _firebaseId
        );
        emit CertificateGenerated(_certHash);
    }

    function verifyCertificate(string memory _certHash) external view returns (
        string memory name,
        string memory course,
        uint256 date,
        string memory firebaseId
    ) {
        CertData memory cert = certificates[_certHash];
        require(bytes(cert.firebaseId).length > 0, "Certificate does not exist");
        return (cert.studentName, cert.course, cert.issueDate, cert.firebaseId);
    }
}
