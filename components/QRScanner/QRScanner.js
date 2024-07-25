// components/QRScanner.js
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanSuccess, onScanError, resetKey }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, [resetKey, onScanSuccess, onScanError]);

  return <div id="qr-reader" style={{ width: "300px" }} />;
};

export default QRScanner;
