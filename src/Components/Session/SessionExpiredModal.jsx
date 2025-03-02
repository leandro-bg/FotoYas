import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@Slice";
import { useNavigate } from "react-router-dom";
import { useSaveCredential } from "@Hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { TitleBoldLight } from "@Components";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import style from "./SessionExpiredModal.module.css";

const SessionExpiredModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.sessionModal.isOpen);

  const navigate = useNavigate();
  const { breakData } = useSaveCredential();

  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpenModal, onOpen, onClose]);

  const handleClose = () => {
    dispatch(closeModal());
    breakData();
    onClose();
    navigate("/", { replace: true });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <TitleBoldLight className="text-[var(--color-pink-3)]">
              Sesión expirada
            </TitleBoldLight>
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex gap-2 items-center flex-col justify-center text-center">
              <ExclamationTriangleIcon
                strokeWidth={1}
                className={`w-[60px] h-[60px] text-[#f0ca35] ${style["neon-icon"]}`}
              />
              <p>
                Tu sesión ha expirado. Por favor, inicia sesión nuevamente para
                continuar usando la aplicación.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleClose}>
              Iniciar sesión
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default SessionExpiredModal;
