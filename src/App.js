import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Income from "./pages/income";
import Expenses from "./pages/expenses";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expenses" element={<Expenses />} />
            </Routes>
        </Router>
    );
}

export default App;
