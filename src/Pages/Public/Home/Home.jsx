import React, { useEffect, useState } from "react";
import { Checkbox, Divider, Input } from "@nextui-org/react";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { Button, TitleBoldLight } from "@Components";
import { AdapterLogin } from "@Adapters";
import { useCookie, useNotifyHandler, useSaveCredential } from "@Hooks";
import { encryptInformation } from "@Utils";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { notify } = useNotifyHandler();
  const navigate = useNavigate();
  const { SaveData } = useSaveCredential();
  const { setCookie } = useCookie();

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    e.target.email.removeAttribute("autocomplete");
    e.target.password.removeAttribute("autocomplete");
    if (!email || !password) {
      notify({
        text: "Por favor ingrese email y contraseña",
        vertical: "bottom",
        horizontal: "center",
        typeLabel: "error",
      });
      return;
    }
    try {
      if (!rememberMe) {
        e.target.email.setAttribute("autocomplete", "off");
        e.target.password.setAttribute("autocomplete", "off");
      } else {
        e.target.email.setAttribute("autocomplete", "on");
        e.target.password.setAttribute("autocomplete", "current-password");
      }
      const resp = await AdapterLogin({ email, password });
      if (resp.status === 200) {
        notify({
          text: resp.msg,
          vertical: "bottom",
          horizontal: "center",
          typeLabel: "success",
        });
        SaveData(resp.data);
        setCookie("tk", encryptInformation(resp.data.token));
        setCookie("rf", encryptInformation(resp.data.refresh_token));
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      notify({
        text: error.response.data.msg,
        vertical: "bottom",
        horizontal: "center",
        typeLabel: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-pink-3-30)] via-transparent to-transparent">
      <div className="w-full max-w-lg shadow-lg bg-white px-5 py-8 rounded-2xl">
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="w-full flex justify-center gap-2">
            <TitleBoldLight className="text-[var(--color-pink-3)]">
              Bienvenido
            </TitleBoldLight>
          </div>
          <div className="w-full flex flex-col gap-5">
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="you@holcim.co"
              labelPlacement="outside"
              classNames={{
                input: ["font-light"],
                label: "font-light",
                inputWrapper:
                  "!bg-transparent border border-gray-300 hover:border-[var(--color-pink-3)] focus:border-[var(--color-pink-3)] focus-within:border-[var(--color-pink-3)] !transition-all !hover:bg-transparent !focus:bg-transparent rounded-md !outline-none",
              }}
              startContent={
                <UserCircleIcon
                  strokeWidth={1.5}
                  className="w-5 h-5 text-[var(--color-pink-3)]"
                />
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-user" // Desactivado por defecto
            />
            <Input
              type={isVisible ? "text" : "password"}
              name="password"
              label="Contraseña"
              placeholder="Contraseña..."
              labelPlacement="outside"
              classNames={{
                input: ["font-light"],
                label: "font-light",
                inputWrapper:
                  "!bg-transparent border border-gray-300 hover:border-[var(--color-pink-3)] focus:border-[var(--color-pink-3)] focus-within:border-[var(--color-pink-3)] !transition-all !hover:bg-transparent !focus:bg-transparent rounded-md !outline-none",
              }}
              startContent={
                <LockClosedIcon
                  strokeWidth={1.5}
                  className="w-5 h-5 text-[var(--color-pink-3)]"
                />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashIcon
                      strokeWidth={1.5}
                      className="w-5 h-5 text-gray-300"
                    />
                  ) : (
                    <EyeIcon
                      strokeWidth={1.5}
                      className="w-5 h-5 text-gray-300"
                    />
                  )}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" // Desactivado por defecto
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <Checkbox
              size="sm"
              classNames={{
                label: "font-light text-gray-400",
              }}
              checked={rememberMe}
              onChange={handleRememberMeChange}
            >
              Recordarme
            </Checkbox>
            <Link to={"/olvide-mi-contrasena"} className="font-light text-gray-400 hover:text-[var(--color-pink-3)] transition-all underline">
              Olvidé mi contraseña
            </Link>
          </div>
          <div className="w-full flex items-center justify-end">
            <Button type="submit" className="max-w-48">
              Ingresar
            </Button>
          </div>
          <div className="w-full flex items-center justify-center gap-2">
            <Divider className="max-w-48" />
            <div className="w-3 h-3 rounded-full  border border-gray-300"></div>
            <Divider className="max-w-48" />
          </div>
          <div className="w-full flex items-center justify-center flex-col">
            <p className="font-light text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link to="/signup" className="text-[var(--color-pink-3)]">
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </div>
      <p className="text-sm text-gray-300 font-light">
        Desapoyado por Leandro © 2025
      </p>
    </div>
  );
};

export default Home;