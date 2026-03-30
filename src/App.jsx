import { useEffect, useMemo, useState } from "react";
import RoleSelection from "./components/RoleSelection";
import ClientForm from "./components/ClientForm";
import BarberForm from "./components/BarberForm";
import ClientDashboard from "./components/ClientDashboard";
import BarberDashboard from "./components/BarberDashboard";
import BarberDetail from "./components/BarberDetail";

const STORAGE_KEY = "barberqueue_state";

const DEFAULT_BARBERS = [
  {
    id: 1,
    name: "Alex M.",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=300&q=80",
    workingHours: "09:00 - 21:00",
    isOpen: true,
    queueCount: 3,
  },
  {
    id: 2,
    name: "Sarah K.",
    imageUrl: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=300&q=80",
    workingHours: "10:00 - 20:00",
    isOpen: false,
    queueCount: 1,
  },
  {
    id: 3,
    name: "James R.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    workingHours: "08:30 - 18:30",
    isOpen: true,
    queueCount: 5,
  },
];

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("role-selection");
  const [selectedBarberId, setSelectedBarberId] = useState(null);
  const [barbers, setBarbers] = useState(DEFAULT_BARBERS);
  const [barberDashboard, setBarberDashboard] = useState({
    isOpen: true,
    queueCount: 4,
    currentTicket: 18,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.role) setRole(parsed.role);
      if (parsed.user) setUser(parsed.user);
      if (parsed.currentScreen) setCurrentScreen(parsed.currentScreen);
      if (parsed.selectedBarberId) setSelectedBarberId(parsed.selectedBarberId);
      if (parsed.barbers) setBarbers(parsed.barbers);
      if (parsed.barberDashboard) setBarberDashboard(parsed.barberDashboard);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role,
        user,
        currentScreen,
        selectedBarberId,
        barbers,
        barberDashboard,
      })
    );
  }, [role, user, currentScreen, selectedBarberId, barbers, barberDashboard]);

  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.id === selectedBarberId) ?? null,
    [barbers, selectedBarberId]
  );

  const logout = () => {
    setRole(null);
    setUser(null);
    setCurrentScreen("role-selection");
    setSelectedBarberId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleClientSubmit = (clientData) => {
    setRole("client");
    setUser(clientData);
    setCurrentScreen("client-dashboard");
  };

  const handleBarberSubmit = (barberData) => {
    setRole("barber");
    setUser(barberData);
    setBarberDashboard((prev) => ({
      ...prev,
      isOpen: true,
    }));
    setCurrentScreen("barber-dashboard");
  };

  return (
    <main className="min-h-screen bg-white text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {currentScreen === "role-selection" && (
          <RoleSelection
            onClientClick={() => setCurrentScreen("client-form")}
            onBarberClick={() => setCurrentScreen("barber-form")}
          />
        )}

        {currentScreen === "client-form" && (
          <ClientForm
            onBack={() => setCurrentScreen("role-selection")}
            onContinue={handleClientSubmit}
          />
        )}

        {currentScreen === "barber-form" && (
          <BarberForm
            onBack={() => setCurrentScreen("role-selection")}
            onContinue={handleBarberSubmit}
          />
        )}

        {currentScreen === "client-dashboard" && (
          <ClientDashboard
            user={user}
            barbers={barbers}
            onLogout={logout}
            onViewBarber={(barberId) => {
              setSelectedBarberId(barberId);
              setCurrentScreen("barber-detail");
            }}
          />
        )}

        {currentScreen === "barber-detail" && selectedBarber && (
          <BarberDetail
            barber={selectedBarber}
            onBack={() => setCurrentScreen("client-dashboard")}
          />
        )}

        {currentScreen === "barber-dashboard" && (
          <BarberDashboard
            user={user}
            state={barberDashboard}
            onChangeState={setBarberDashboard}
            onLogout={logout}
          />
        )}
      </div>
    </main>
  );
}

export default App;
