import { Route, Routes } from "react-router";
import Onboarding from "./pages/onboarding";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/home";
import PointOfSale from "./pages/pos";
import AuthLayout from "./layouts/auth-layout";
import { Toaster } from "./components/ui/sonner";

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
          <Route path="pos" element={<PointOfSale />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
