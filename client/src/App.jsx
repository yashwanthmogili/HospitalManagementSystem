import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home/Home";
import Footer from "./Pages/Shared/Footer/Footer";
import Staffs from "./Pages/Staffs/Staffs";
import Appointment from "./Pages/Appointments/Appointment";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddDoctor from "./Pages/Doctors/AddDoctor/AddDoctor";
import Registration from "./Pages/Login/Registration/Registration";
import PatientViewDoctor from "./Pages/Doctors/Doctors/PatientViewDoctor";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ViewDoctors from "./Pages/Patients/ViewDoctors/ViewDoctors";
import DeleteDoctor from "./Pages/Doctors/DeleteDoctor/DeleteDoctor";
import FindDoctor from "./Pages/Doctors/UpdateDoctor/FindDoctor";
import AddPatient from "./Pages/Patients/AddPatients/AddPatient";
import Patients from "./Pages/Patients/Patients/Patients";
import PatientDetails from "./Pages/Patients/PatientsDetails/PatientDetails";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    
  },[])
  const handleIsLogin = (val)=>{
    setIsLogin(val)
  }
  if(isLogin===false){
    return(
      <Login handleIsLogin={handleIsLogin} />
    )
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard handleIsLogin={handleIsLogin} />}>
            <Route index element={<Home></Home>} />
            <Route path="doctors" element={<PatientViewDoctor />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="deleteDoctor" element={<DeleteDoctor />} />
            <Route path="updateDoctor" element={<FindDoctor />} />
            <Route path="patients" element={<Patients />} />
            <Route path="addPatient" element={<AddPatient />}>
              <Route path=":email" element={<AddPatient />} />
            </Route>
            <Route path="viewDoctors" element={<ViewDoctors />} />
            <Route path="patientDetails/:id" element={<PatientDetails />} />
            <Route path="staffs" element={<Staffs />} />
            <Route path="appointment" element={<Appointment />}>
              <Route path=":email" element={<Appointment />} />
            </Route>
            <Route path="registration" element={<Registration />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
