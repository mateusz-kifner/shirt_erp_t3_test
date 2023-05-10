import React, { type ReactNode } from "react";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import useTranslation from "~/hooks/useTranslation";
import Button from "./Button";
import Separator from "./Separator";

// RadixAlertDialog.AlertDialogProps {
//   children?: React.ReactNode;
//   open?: boolean;
//   defaultOpen?: boolean;
//   onOpenChange?(open: boolean): void;
// }

interface AlertProps extends RadixAlertDialog.AlertDialogProps {
  title?: ReactNode;
  description?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  trigger?: ReactNode;
}

const Alert = (props: AlertProps) => {
  const {
    children,
    title,
    description,
    onOk,
    onCancel,
    okText,
    cancelText,
    trigger,
  } = props;
  const t = useTranslation();
  return (
    <RadixAlertDialog.Root>
      {!!trigger && (
        <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      )}
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-40 data-[state=open]:animate-show" />
        <RadixAlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow dark:bg-stone-800">
          {!!title && (
            <RadixAlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {title}
            </RadixAlertDialog.Title>
          )}
          {!!description && (
            <RadixAlertDialog.Description className="text-mauve11 mb-5 mt-4 text-[15px] leading-normal">
              {description}
            </RadixAlertDialog.Description>
          )}
          {((!!title && !!children) || (!!description && !!children)) && (
            <Separator decorative />
          )}
          {children}
          <div className="mt-3 flex justify-end gap-4">
            <RadixAlertDialog.Cancel asChild>
              <Button onClick={onCancel}>{cancelText ?? t.cancel}</Button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <Button onClick={onOk}>{okText ?? "Ok"}</Button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

export default Alert;
