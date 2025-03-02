import React from "react";
import Swal from "sweetalert2";

const PrintAlertHook = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const AlertTop = (msg, code) => {
    try {
      let state = "success";
      if (parseInt(code) >= 400) {
        state = "warning";
      }
      if (parseInt(code) >= 500) {
        state = "error";
      }
      if (parseInt(code) == 404) {
        state = "error";
      }
      if (msg.length > 0) {
        Toast.fire({
          icon: state,
          title: msg,
        });
      }
    } catch (error) {
    }
  };

  return { AlertTop };
};

export default PrintAlertHook;
