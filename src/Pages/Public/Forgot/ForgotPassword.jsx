import React, { useState } from "react";
import { Divider, Input } from "@nextui-org/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { TitleBoldLight, Button, GoBack } from "@Components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-pink-3-30)] via-transparent to-transparent">
      <div className="w-full max-w-lg shadow-lg bg-white px-5 py-8 rounded-2xl">
        <form className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
              <TitleBoldLight className="text-[var(--color-pink-3)]">
                Recuperar contraseña
              </TitleBoldLight>
              <GoBack />
            </div>
            <p className="font-light text-gray-400">
              Lamentamos que hayas perdido tu contraseña. Haremos lo posible
              para ayudarte a recuperarla.
            </p>
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
              autoComplete="current-user"
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button type="submit" className="max-w-48">
              Recuperar
            </Button>
          </div>
          <div className="w-full flex items-center justify-center gap-2">
            <Divider className="max-w-48" />
            <div className="w-3 h-3 rounded-full  border border-gray-300"></div>
            <Divider className="max-w-48" />
          </div>
          <div className="w-full flex items-center justify-center flex-col">
            <p className="font-light text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/" className="text-[var(--color-pink-3)]">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
      <p className="text-sm text-gray-300 font-light">
        Trabajamos para facilitar decisiones seguras © 2024
      </p>
    </div>
  );
};

export default ForgotPassword;
