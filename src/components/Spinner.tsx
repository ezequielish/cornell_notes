import React from "react";

const Spinner: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="spinner" />
      <style>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;