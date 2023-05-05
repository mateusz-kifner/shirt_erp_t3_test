import React, { useRef, type ReactNode } from "react";
// import ActionButton from "./ActionButton";
// import { IconX } from "@tabler/icons-react";
// import Portal from "../Portal";
import { useDialog, type AriaDialogProps } from "react-aria";

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function Dialog({ title, children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className="p-8">
      {title && (
        <h3 {...titleProps} className="mt-0">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   title?: ReactNode;
//   children?: ReactNode;
// }

// function Modal({ open, onClose, title, children }: ModalProps) {
//   return (
//     <Portal>
//       {/* <Transition
//         show={open}
//         enter="transition duration-100 ease-out"
//         enterFrom="transform scale-95 opacity-0"
//         enterTo="transform scale-100 opacity-100"
//         leave="transition duration-75 ease-out"
//         leaveFrom="transform scale-100 opacity-100"
//         leaveTo="transform scale-95 opacity-0"
//         as={Fragment}
//       > */}
//         <Dialog
//           open={open}
//           onClose={onClose}
//           className="absolute left-0 top-0 h-screen w-screen"
//         >
//           <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//           <Dialog.Panel className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform  rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-stone-800">
//             <div className="mb-2 flex items-center justify-between ">
//               {title}
//               <ActionButton
//                 onClick={() => onClose()}
//                 className=" h-8 w-8 rounded-md border-none border-transparent p-1 text-stone-800 dark:text-stone-200"
//               >
//                 <IconX />
//                 <span className="sr-only">Close</span>
//               </ActionButton>
//             </div>

//             {children}
//           </Dialog.Panel>
//         </Dialog>
//       {/* </Transition> */}
//     </Portal>
//   );
// }

export default Dialog;
