import { useSnackbar } from "notistack";

const useNotifyHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Muestra una barra de notificación (snackbar) con las opciones especificadas.
   *
   * @param {Object} options - Las opciones para la barra de notificación.
   * @param {string} options.text - El mensaje de texto que se mostrará en la barra de notificación.
   * @param {string} options.vertical - La posición vertical de la barra de notificación ('top' o 'bottom').
   * @param {string} options.horizontal - La posición horizontal de la barra de notificación ('left', 'center', 'right').
   * @param {string} options.typeLabel - El tipo de variante de la barra de notificación (por ejemplo, 'success', 'error', 'warning', 'info').
   */
  const notify = ({ text, vertical, horizontal, typeLabel }) => {
    enqueueSnackbar(text, {
      autoHideDuration: 2500,
      variant: typeLabel,
      anchorOrigin: {
        vertical: vertical,
        horizontal: horizontal,
      },
    });
  };

  const AlertNotify = (msg, code) => {
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
        notify({
          test: msg,
          vertical: "bottom",
          horizontal: "center",
          typeLabel: state,
        });
      }
    } catch (error) {}
  };

  return { notify, AlertNotify };
};

export default useNotifyHandler;