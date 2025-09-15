import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importa Navigate
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { NotFound } from "../pages/NotFound";
import { DonationDetailsPage } from "../pages/Donations/DetailsPage";

import ProfileCreationPage from "../pages/CreateProfilePage";

import CategoryPage from "../pages/CategoryPage";
import { DonationSearchPage } from "../pages/Donations/SearchPage";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "../pages/Dashboard/HomePage";
import { DashboardChatPage } from "../pages/Dashboard/ChatPage";
import { DashboardCategory } from "../pages/Dashboard/CategoryPage";
import { DashboardDonationsPage } from "../pages/Dashboard/DonatiosPage";
import { DashboardMyDonations } from "../pages/Dashboard/MyDonations";
import { DashboardRecievedDonations } from "../pages/Dashboard/RecievedDonations";
import { DashboardUser } from "../pages/Dashboard/UsersPage";
import { DashboardReports } from "../pages/Dashboard/ReportsPage";
import { DashboardConfiguration } from "../pages/Dashboard/ConfigurationPage";

import type { JSX } from "react";
import { useAuthStore } from "../store/AuthStore"; // Importa el store de autenticación
import LoginPage from "../pages/LoginPage";
import { DashboardRequestedDonations } from "../pages/Dashboard/RequestedDonations";
import { ScrollToTop } from "../components/ScrollOnTop";
import { UserProfile } from "../pages/UserProfile";

// Componente para proteger rutas privadas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuthStore(); // Usa el store para obtener el estado de autenticación

  if (loading) {
    // Puedes mostrar un spinner de carga mientras se verifica el token
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al usuario a la página de login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="donation/:id" element={<DonationDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="createProfile" element={<ProfileCreationPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="donationSearch" element={<DonationSearchPage />} />
          <Route path="userProfile/:id" element={<UserProfile/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas protegidas - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path="categories" element={<DashboardCategory />} />
          <Route path="users" element={<DashboardUser />} />
          <Route path="reports" element={<DashboardReports />} />
          <Route path="settings" element={<DashboardConfiguration />} />
          <Route path="chats" element={<DashboardChatPage />} />
          <Route path="donations" element={<DashboardDonationsPage />} />
          <Route path="my-donations" element={<DashboardMyDonations />} />
          <Route
            path="recieved-donations"
            element={<DashboardRecievedDonations />}
          />
          <Route
            path="requested-donations"
            element={<DashboardRequestedDonations />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
