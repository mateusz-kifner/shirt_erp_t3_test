import { useClipboard, useId } from "@mantine/hooks";
import {
  IconCopy,
  IconExternalLink,
  IconQuestionMark,
  IconTrashX,
} from "@tabler/icons-react";
import { isEqual } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Button from "~/components/basic/Button";
import Modal from "~/components/basic/Modal";
import Tooltip from "~/components/basic/Tooltip";
import useTranslation from "~/hooks/useTranslation";
import { showNotification } from "~/lib/notifications";
import type EditableInput from "~/types/EditableInput";

interface EditableApiEntryProps extends EditableInput<any> {
  entryName: string;
  Element: React.ElementType;
  copyProvider?: (value: any | null) => string | undefined;
  style?: CSSProperties;
  withErase?: boolean;
  listProps?: any;
  linkEntry?: boolean;
  helpTooltip?: string;
  allowClear?: boolean;
}

const EditableApiEntry = (props: EditableApiEntryProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    Element,
    entryName,
    copyProvider = () => "",
    style,
    withErase = false,
    listProps,
    linkEntry = false,
    helpTooltip,
    allowClear = false,
  } = props;

  const [apiEntry, setApiEntry] = useState<any>(value ?? initialValue ?? null);
  const [prev, setPrev] = useState<any>(apiEntry);
  const [open, setOpen] = useState<boolean>(false);
  const uuid = useId();
  const clipboard = useClipboard();
  // eslint-disable-next-line
  const copyValue = useMemo(() => copyProvider(apiEntry), [apiEntry]);
  const router = useRouter();
  const t = useTranslation();

  useEffect(() => {
    setApiEntry(value);
    setPrev(value);
  }, [value]);

  useEffect(() => {
    if (isEqual(apiEntry, prev)) return;
    onSubmit?.(apiEntry);
    setPrev(apiEntry);
    // eslint-disable-next-line
  }, [apiEntry]);

  return (
    <div>
      <label>
        {label && label.length > 0 ? (
          <div className="flex w-full justify-between">
            <div className="flex">
              {label}
              {apiEntry && copyValue && (
                <button
                  className="border-1 inline-flex animate-pop items-center justify-center
             gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
           text-gray-200 no-underline transition-all  
           hover:bg-black hover:bg-opacity-30
             active:hover:scale-95 active:hover:animate-none 
             active:focus:scale-95 active:focus:animate-none"
                  onClick={() => {
                    clipboard.copy(copyValue);
                    showNotification({
                      title: "Skopiowano do schowka",
                      message: copyValue,
                      icon: <IconCopy />,
                    });
                  }}
                  tabIndex={-1}
                >
                  <IconCopy size={16} />
                </button>
              )}

              {helpTooltip && (
                <Tooltip tooltip={helpTooltip}>
                  <button
                    className="border-1 inline-flex animate-pop items-center justify-center
             gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
           text-gray-200 no-underline transition-all  
           hover:bg-black hover:bg-opacity-30
             active:hover:scale-95 active:hover:animate-none 
             active:focus:scale-95 active:focus:animate-none"
                    tabIndex={-1}
                  >
                    <IconQuestionMark size={16} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        ) : undefined}
      </label>
      <Modal open={open} onClose={() => setOpen(false)}>
        {allowClear ? (
          <Button
            onClick={() => {
              setOpen(false);
              onSubmit?.(null);
            }}
            // color="red"
            // variant="subtle"
            // size="sm"
            leftSection={<IconTrashX />}
            // radius="xl"
          >
            {t.clear}
          </Button>
        ) : undefined}
        {entryName ? (
          <div></div>
        ) : (
          // <ApiList
          //   entryName={entryName ?? ""}
          //   ListItem={Element}
          //   label={label}
          //   onChange={(value) => {
          //     setOpened(false);
          //     setApiEntry(value);
          //   }}
          //   {...listProps}
          // />
          <div className="text-red-500">
            Entry Name not valid or element was not defined in mapping
          </div>
        )}
      </Modal>
      {entryName ? (
        <div
          key={uuid}
          // sx={[
          //   SxRadius,
          //   (theme) => ({
          //     position: "relative",
          //     border: "1px solid transparent",
          //     "&:hover": {
          //       border:
          //         theme.colorScheme === "dark"
          //           ? "1px solid #2C2E33"
          //           : "1px solid #ced4da",
          //     },
          //     overflow: "hidden",
          //   }),
          // ]}
        >
          <Element
            onChange={() => setOpen(true)}
            value={apiEntry}
            disabled={disabled}
          />
          {linkEntry && value && value?.id && (
            <div
            // sx={[
            //   (theme) => ({
            //     position: "absolute",
            //     top: "50%",
            //     right: "-3rem",
            //     transform: "translate(0,-50%)",
            //   }),
            // ]}
            >
              <Link
                href={`/erp/${entryName}/${value?.id as string}`}
                className="border-1 inline-flex animate-pop items-center justify-center
             gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
           text-gray-200 no-underline transition-all  
           hover:bg-black hover:bg-opacity-30
             active:hover:scale-95 active:hover:animate-none 
             active:focus:scale-95 active:focus:animate-none"
                tabIndex={-1}
              >
                <IconExternalLink size={18} />
                <div style={{ width: "2.4rem" }}></div>
              </Link>
            </div>
          )}
          {apiEntry && withErase && (
            <div></div>
            // <Menu withArrow>
            //   <Menu.Target>
            //     <ActionIcon
            //       tabIndex={-1}
            //       style={{
            //         position: "absolute",
            //         top: "50%",
            //         right: 8,
            //         transform: "translate(0,-50%)",
            //       }}
            //     >
            //       <IconDots size={14} />
            //     </ActionIcon>
            //   </Menu.Target>
            //   <Menu.Dropdown>
            //     <Menu.Item
            //       color="red"
            //       icon={<IconTrashX size={14} />}
            //       onClick={() => setApiEntry(null)}
            //     >
            //       Delete
            //     </Menu.Item>
            //   </Menu.Dropdown>
            // </Menu>
            // <ActionIcon
            //   style={{
            //     position: "absolute",
            //     top: "50%",
            //     right: 8,
            //     transform: "translate(0,-50%)",
            //   }}
            //   onClick={() => setApiEntry(null)}
            //   radius="xl"
            // >
            //   <IconTrashX size={18} />
            // </ActionIcon>
          )}
        </div>
      ) : (
        <div className="text-red-500">
          Entry Name not valid or element was not defined in mapping
        </div>
      )}
    </div>
  );
};

export default EditableApiEntry;
