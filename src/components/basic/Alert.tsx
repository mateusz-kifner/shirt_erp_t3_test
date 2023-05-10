import React, { type ReactNode } from "react";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import useTranslation from "~/hooks/useTranslation";

// RadixAlertDialog.AlertDialogProps {
//   children?: React.ReactNode;
//   open?: boolean;
//   defaultOpen?: boolean;
//   onOpenChange?(open: boolean): void;
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AlertProps extends RadixAlertDialog.AlertDialogProps {
  title?: ReactNode;
  description?: ReactNode;
  onOkClick?: () => void;
  onCancelClick?: () => void;
  okText?: string;
  cancelText?: string;
}

const Alert = (props: AlertProps) => {
  const { children, title, description, okText, cancelText } = props;
  const t = useTranslation();
  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>
        <button className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          Delete account
        </button>
      </RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <RadixAlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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
          {children}
          <div className="flex justify-end gap-[25px]">
            <RadixAlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                {okText ?? "Ok"}
              </button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                {cancelText ?? t.cancel}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

export default Alert;
