import * as RadixDialog from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
import { IconX } from "@tabler/icons-react";
import ActionButton from "./ActionButton";

interface ModalProps extends RadixDialog.DialogProps {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  trigger?: ReactNode;
  onClose?: () => void;
}

function Modal(props: ModalProps) {
  const {
    title,
    children,
    description,
    trigger,
    defaultOpen,
    modal,
    onOpenChange,
    open,
    onClose,
  } = props;
  return (
    <RadixDialog.Root
      defaultOpen={defaultOpen}
      modal={modal}
      onOpenChange={(open) => {
        !open && onClose?.();
        onOpenChange?.(open);
      }}
      open={open}
    >
      {!!trigger && (
        <RadixDialog.Trigger asChild>{trigger}Radix</RadixDialog.Trigger>
      )}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-40" />
        <RadixDialog.Content className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-stone-200 p-3 shadow dark:bg-stone-800">
          {!!title && <RadixDialog.Title>{title}Radix</RadixDialog.Title>}
          {!!description && (
            <RadixDialog.Description>
              {description}Radix
            </RadixDialog.Description>
          )}
          {children}
          <RadixDialog.Close
            asChild
            className="absolute right-3 top-3 rounded-full p-1"
          >
            <ActionButton aria-label="Close">
              <IconX />
            </ActionButton>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export default Modal;

// function Dialog({ title, children, ...props }: DialogProps) {
//   const ref = useRef(null);
//   const { dialogProps, titleProps } = useDialog(props, ref);

//   return (
//     <div {...dialogProps} ref={ref} className="p-8">
//       {title && (
//         <h3 {...titleProps} className="mt-0">
//           {title}
//         </h3>
//       )}
//       {children}
//     </div>
//   );
// }

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
