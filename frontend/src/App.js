import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import HomePage from "./pages/home/HomePage";
import HistoryPage from "./pages/history/HistoryPage";
import NotificationPage from "./pages/notification/NotificationPage";
import OrdersPage from "./pages/order/OrdersPage";
import PaymentPage from "./pages/payment/PaymentPage";
import SettingsPage from "./pages/settings/SettingsPage";
import LogoutPage from "./pages/LogoutPage";
import InternetStatusComponent from "./components/utils/InternetStatusComponent";
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
      <BrowserRouter>
          <InternetStatusComponent/>
              <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                      <Route
                          path="/"
                          element={<HomePage />}
                      />
                      <Route path="historique" element={<HistoryPage />} />

                      <Route path="nos-commandes" element={<OrdersPage />} />


                      <Route path="notification" element={<NotificationPage />} />

                      <Route path="paiement" element={<PaymentPage />} />

                      <Route path="parametres" element={<SettingsPage />} />

                      <Route path="logout" element={<LogoutPage />} />

                      <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for error */}

                  </Route>
              </Routes>
      </BrowserRouter>
  );
}

export default App;
