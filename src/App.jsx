import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import apiClient from "./config/axios";
import { Header } from "./components/Header"; 
import { Footer } from "./components/Footer";
import { ExercisesIndex } from "./ExercisesIndex";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import RoutinesIndex from "./RoutinesIndex";
import HomePage from "./HomePage";
import { WorkoutLog } from "./WorkoutLog";
import { Layout } from "./components/PrimaryLayout";

const router = createBrowserRouter([
  {
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-background">
          <Layout>
            <Outlet />
          </Layout>
        </main>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/exercises",
        element: <ExercisesIndex />,
        loader: async () => {
          try {
            const response = await apiClient.get("/exercises.json");
            if (!response?.data || !Array.isArray(response.data)) {
              console.error('Invalid response data format:', response);
              return [];
            }
            return response.data;
          } catch (error) {
            console.error('Error loading exercises:', error);
            return [];
          }
        },
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/routines",
        element: <RoutinesIndex />,
        loader: () => apiClient.get("/routines.json").then((response) => response.data),
      },
      {
        path: "/workout_log",
        element: <WorkoutLog />,
        loader: () => apiClient.get("/workout_logs.json").then((response) => response.data),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;