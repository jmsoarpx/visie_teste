import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type Props = ToastContainerProps;

export const Toast: React.FC<Props> = (props: Props) => {
   return <ToastContainer {...props} />;
};
