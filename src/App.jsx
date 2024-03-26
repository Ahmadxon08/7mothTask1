import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Edit from "./pages/Edit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
