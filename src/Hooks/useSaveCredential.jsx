import { AdapterGetSession } from "@Adapters";
import { useCookie, useNotifyHandler } from "@Hooks";
import { setUser, clearUser, openModal } from "@Slice";
import { useDispatch } from "react-redux";

const SaveCredentialHook = () => {
  const dispatch = useDispatch();
  const { getCookie, removeCookie } = useCookie();
  const { notify } = useNotifyHandler();

  const SaveData = (user) => dispatch(setUser({ ...user }));

  const reCharceData = async () => {
    try {
      const token = getCookie("tk");
      if (token == undefined) {
        dispatch(clearUser());
      } else {
        const resp = await AdapterGetSession();
        dispatch(setUser({ ...resp.data }));
      }
    } catch (error) {
      dispatch(openModal());
    }
  };
  const breakData = () => {
    removeCookie("tk");
    removeCookie("rf");
    dispatch(clearUser())
  };
  return { SaveData, reCharceData, breakData };
};

export default SaveCredentialHook;
