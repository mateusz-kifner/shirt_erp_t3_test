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

type ModalProps = AriaModalOverlayProps &
  OverlayTriggerProps & {
    children: ReactNode;
  };

function Modal(props: ModalProps) {
  const {
    children,
    isDismissable = true,
    isKeyboardDismissDisabled = false,
  } = props;
  const ref = useRef(null);
  const state = useOverlayTriggerState(props);
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...underlayProps}
      >
        <div
          {...modalProps}
          style={{
            background: "black",
            border: "1px solid gray",
          }}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}

export default Modal;
