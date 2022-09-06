import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PetPage from "./pages/Pet";
import Profile from "./pages/Profile";
import MyPetsPage from "./pages/MyPets";
import AddPet from "./pages/AddPet";
import { AdminRoute, UserRoute } from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import User from "./pages/User";
import { alertsStore } from "./store";
import Alert from "./components/Alert";

const App = () => {
  const errorMessage = alertsStore((state) => state.errorMessage);
  const successMessage = alertsStore((state) => state.successMessage);
  const alertBool = alertsStore((state) => state.alertBool);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <Alert
            bgColorVariant={alertBool ? "info" : "secondary"}
            toastTitle={alertBool ? "Success" : "Error"}
            toastBody={alertBool ? successMessage : errorMessage}
          />
          <main className="pb-3">
            <Container>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pet/:id" element={<PetPage />} />
                <Route
                  path="/profile"
                  element={
                    <UserRoute>
                      <Profile />
                    </UserRoute>
                  }
                />
                <Route
                  path="/mypets"
                  element={
                    <UserRoute>
                      <MyPetsPage />
                    </UserRoute>
                  }
                />
                <Route
                  path="/addpet/:id"
                  element={
                    <AdminRoute>
                      <AddPet />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admindashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/user/:id/full"
                  element={
                    <AdminRoute>
                      <User />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
