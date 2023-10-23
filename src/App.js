import logo from "./logo.svg";
import "./App.css";
import DocketList from "./DocketList";
import { Router as BrowserRouter, Route, Routes } from "react-router-dom";
import DocketMUI from "./DocketMUI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DocketMUI />} />
      <Route path="/docketList" element={<DocketList />} />
    </Routes>
  );
}

export default App;
