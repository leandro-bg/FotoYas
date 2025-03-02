import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button color="primary" variant="light" onPress={handleGoBack}>
      <ChevronLeftIcon strokeWidth={1.5} className="w-5 h-5" />
      Regresar
    </Button>
  );
};

export default GoBack;
