import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useChangeTitle } from "@Hooks";
import { LoadSuspense } from "@Components";

const Home = lazy(() => import("@Pages/Public/Home/Home"));
const ForgotPassword = lazy(
  () => import("@Pages/Public/Forgot/ForgotPassword")
);

const PublicRoutes = () => {
  const location = useLocation();
  const { changeTitle } = useChangeTitle();
  useEffect(() => {
    changeTitle(location);
  }, [location]);
  return (
    <Suspense fallback={<LoadSuspense text="Recuperando componente..." />}>
      <div className="w-full h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/olvide-mi-contrasena" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default PublicRoutes;
