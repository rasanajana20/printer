import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MiniReceipt from "../src/ReceiptPrinter";
import ItemsPage from "./ItemPage";
import SummaryPage from "./SummaryPage";

import "./receipt.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MiniReceipt />} />
        <Route path="/items" element={<ItemsPage />} />
        {/* <Route path="/summary" element={<SummaryPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
