import React, { lazy, Suspense, useEffect, useState } from "react";
import PackageJson from "@PackageJson";
import {
  Routes,
  Route,
  BrowserRouter as ProviderRoute,
} from "react-router-dom";
import { PrivateRoute, PublicRoute } from "@Middleware";
import { useSaveCredential } from "@Hooks";
import { LoadSuspense, SessionExpiredModal } from "@Components";

const PublicRoutes = lazy(() => import("@Routes/public"));
const Dashboard = lazy(() => import("@Routes/private"));

const Master = () => {
  const [isLoadin, setIsLoadin] = useState(true);
  const { reCharceData } = useSaveCredential();

  const reloadData = async () => {
    setIsLoadin(true);
    await reCharceData();
    setIsLoadin(false);
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (isLoadin) return <LoadSuspense text="Recuperando sesión..." />;

  return (
    <>
      <Suspense fallback={<LoadSuspense text="Recuperando componente..." />}>
        <ProviderRoute>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route index path="/*" element={<PublicRoutes />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route index path="/tablero/*" element={<Dashboard />} />
            </Route>
          </Routes>
          <SessionExpiredModal />
        </ProviderRoute>
      </Suspense>
      <div className="fixed bottom-2 right-2">
        <p className="text-sm text-gray-300">
          v{PackageJson.version} - Powered by{" "}
          <a
            href="https://nxs.com.co/"
            target="_blank"
            className="underline"
          >
            Nexos Software S.A.S
          </a>
        </p>
      </div>
    </>
  );
};

export default Master;
