import { createContext, ReactNode, useState } from "react";
import { Toast } from "../components/toast";

interface ToastContextData {
  showToast: (message: string, type: TypeMessage) => void;
}

type TypeMessage = "SUCCESS" | "DEFAULT";

export interface MessageProps {
  message: string;
  type: TypeMessage;
}

export const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<MessageProps[]>([]);
  const showToast = (newMessage: string, type: TypeMessage) => {
    let message: MessageProps = {
      message: newMessage,
      type: type,
    };
    setMessage((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      hideToast();
    }, 1000);
  };

  const hideToast = () => {
    setMessage((prevMessages) => prevMessages.slice(1));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message.length > 0 && <Toast messages={message} hideToast={hideToast} />}
    </ToastContext.Provider>
  );
}
