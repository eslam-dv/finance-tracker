import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import Navbar from "./components/Navbar";
import AppLayout from "./layouts/AppLayout";
import Analysis from "./pages/Analysis";

const App = () => {
  return (
    <>
      <Router basename="/finance-trakcer">
        <Navbar />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="analysis" element={<Analysis />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
