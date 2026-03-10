import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/auth-context/AuthContextProvider";

const queryClient = new QueryClient();
function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <RouterProvider router={routes} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </HeroUIProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
