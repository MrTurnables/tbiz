import { Route, Routes } from "react-router";
import Onboarding from "./pages/onboarding";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/home";
import PointOfSale from "./pages/pos";
import AuthLayout from "./layouts/auth-layout";
import { Toaster } from "./components/ui/sonner";
import Inventory from "./pages/inventory";
import Outlets from "./pages/outlets";
import Settings from "./pages/settings";
import UsersPage from "./pages/users-page";
import PurchasesPage from "./pages/purchases";
import InvoicesPage from "./pages/invoices";

function App() {
  return (
    <main className="w-full min-h-screen">
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Onboarding />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="dashboard" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="outlets" element={<Outlets />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="pos" element={<PointOfSale />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
