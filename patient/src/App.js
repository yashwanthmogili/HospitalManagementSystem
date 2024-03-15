import AddPatient from "./AddPatient";
import "./App.css";
import ViewDoctors from "./ViewDoctors";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewDoctors />} />
        <Route path="addPatient" element={<AddPatient />}>
          <Route path=":email" element={<AddPatient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
