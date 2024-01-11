import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function notify(prompt) {
    toast.success(prompt, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
})};

export {notify , ToastContainer};