import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';

const TextToPDF = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('document.pdf');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = margin;

    const lines = doc.splitTextToSize(text, 180); // Split text into lines that fit within the page width

    // Loop through the lines and add them to the PDF
    lines.forEach((line, index) => {
      if (yPosition + 10 > pageHeight) {
        doc.addPage(); // Add a new page if the text overflows
        yPosition = margin; // Reset yPosition for the new page
      }
      doc.text(line, margin, yPosition);
      yPosition += 10; // Move to the next line
    });

    doc.save(fileName); // Save the PDF with the specified file name
  };

  return (
    <div className="container">
      <h1>Text to PDF Converter</h1>
      <textarea
        className="text-input"
        placeholder="Paste your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <div className="file-name-container">
        <input
          type="text"
          className="file-name-input"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="Enter PDF file name"
        />
      </div>
      <button className="generate-btn" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TextToPDF />
    </div>
  );
}

export default App;

