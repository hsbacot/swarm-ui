import * as React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';
import Button from './Button';

const removeToast = (toasts: Array<any>, id: string) => {
  return [...toasts.filter(t => t.id !== id)];
};

const testToast = () => (
  <Toast>
    <p>hello</p>
  </Toast>
);

interface ToasterContextInterface {
  toasts: Array<any>,
  addToast: (i: any) => void,
  removeToast: (i: any) => void,
}


export const ToasterContext = React.createContext<ToasterContextInterface>({ toasts: [], addToast: (i) => i, removeToast: (i) => i });

export const useToaster = () => {
  return React.useContext(ToasterContext);
}

export const Toaster = (props) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    console.log(toast)
    return setToasts(t => [...t, toast]);
  
  };

  const removeToast = (toastId) => {
    return setToasts(ts => {
      return ts.filter(t => t.props.id !== toastId)
    })
  }

  let portalNode = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = document.createElement('div');
    node.id = 'swarm-toaster';
    document.body.prepend(node);
    portalNode.current = node;

    return () => node.remove();
  }, [])

    return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {portalNode.current && ReactDOM.createPortal(
        <div data-swarm-toaster>
          <ul style={{ width: '100%' }}>
            <AnimatePresence initial={false}>
              {toasts}
            </AnimatePresence>
          </ul>
        </div>,
        portalNode.current
      )}
        {props.children}
      </ToasterContext.Provider>
    );
}
