import { type ReactNode, useRef } from "react";
import {
  Overlay,
  useModalOverlay,
  type AriaModalOverlayProps,
} from "react-aria";
import {
  type OverlayTriggerProps,
  useOverlayTriggerState,
} from "react-stately";
import Dialog from "./Dialog";

type ModalProps = AriaModalOverlayProps &
  OverlayTriggerProps & {
    children: ReactNode;
    onClose?: () => void;
    title?: ReactNode;
  };

function Modal(props: ModalProps) {
  const {
    children,
    isDismissable = true,
    isKeyboardDismissDisabled = false,
    onOpenChange,
    onClose,
    title,
  } = props;
  const ref = useRef(null);
  const state = useOverlayTriggerState({
    ...props,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      !isOpen && onClose?.();
    },
  });
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable, isKeyboardDismissDisabled },
    state,
    ref
  );

  return (
    <Overlay>
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
          display: state.isOpen ? "flex" : "none",
        }}
        {...underlayProps}
      >
        <Dialog title={title}>
          <div
            style={{
              background: "black",
              border: "1px solid gray",
            }}
            {...modalProps}
            ref={ref}
          >
            {children}
          </div>
        </Dialog>
      </div>
    </Overlay>
  );
}

export default Modal;
