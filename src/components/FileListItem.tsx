import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { IconDownload, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";
import useTranslation from "~/hooks/useTranslation";
import { type FileType } from "~/schema/fileSchema";
import ActionButton from "./basic/ActionButton";
import Tooltip from "./basic/Tooltip";

interface FileListItemProps {
  onChange?: (file: Partial<FileType>) => void;
  value: Partial<FileType>;
  active?: boolean;
  disabled?: boolean;
  onPreview?: (
    url: string,
    width?: number | null,
    height?: number | null
  ) => void;
  style?: CSSProperties;
  contextMenuContent?: ReactNode;
}

const FileListItem = (props: FileListItemProps) => {
  const {
    value,
    onChange,
    active,
    disabled,
    onPreview,
    style,
    contextMenuContent,
  } = props;
  const t = useTranslation();

  const preview = value.mimetype?.startsWith("image")
    ? `/api/files/${value.filename}${
        value?.token && value.token.length > 0 ? "?token=" + value?.token : ""
      }`
    : undefined;

  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger
        style={style}
        className="relative flex items-center gap-2 overflow-hidden border-l border-r border-t border-solid border-gray-400 first:rounded-t last:rounded-b last:border-b dark:border-stone-600"
      >
        <div className="relative h-[100px] w-[100px] overflow-hidden  child-hover:visible">
          <img
            src={preview ?? "/assets/unknown_file.svg"}
            alt=""
            width={100}
            height={100}
            className="h-[100px] w-[100px]  border-none border-gray-400 object-cover dark:border-stone-600"
          />

          {preview && onPreview && (
            <ActionButton
              className="absolute left-0 top-0 z-50 h-full w-full hover:bg-black hover:bg-opacity-20"
              onClick={() => {
                value?.filename &&
                  onPreview(
                    "/api/files/" +
                      value.filename +
                      (value?.token && value.token.length > 0
                        ? "?token=" + value?.token
                        : "")
                  );
              }}
            >
              <IconEye
                className="text-stone-300 dark:text-stone-600"
                size={26}
              />
            </ActionButton>
          )}
        </div>
        <Tooltip
          tooltip={value?.originalFilename}
          delayDuration={1000}
          // multiline
          // width={400}
          // style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          // withArrow
          // openDelay={500}
          disabled={
            !!(value?.originalFilename && value?.originalFilename?.length < 40)
          }
        >
          <div className="max-w-[calc(100% - 180px)] max-h-[90px] flex-grow break-words pr-2">
            {value?.originalFilename}
          </div>
        </Tooltip>

        <Link
          href={`/api/files/${value?.filename}${
            value?.token && value.token.length > 0
              ? "?token=" + value?.token + "&download"
              : "?download"
          }`}
          className="absolute
        -right-12 
        top-1/2
        inline-flex
        h-32
        w-32
        -translate-y-1/2
        select-none
        items-center
        justify-center
        gap-3 
        rounded-full
        border-2
        border-solid
        border-transparent
        font-semibold
        uppercase
        text-stone-800
        no-underline 
        outline-none  
        outline-offset-4 
        transition-all
        hover:bg-black 
        hover:bg-opacity-30
        focus-visible:border-sky-600 
        active:border-blue-600
        disabled:opacity-30
        disabled:outline-none
        disabled:hover:bg-transparent
        dark:border-solid
        dark:border-transparent
       dark:text-stone-200 dark:outline-none dark:hover:bg-white dark:hover:bg-opacity-20 dark:focus-visible:border-sky-600 dark:active:border-blue-600 dark:disabled:opacity-30 dark:disabled:hover:bg-transparent "
        >
          <IconDownload size={26} />
          <div style={{ width: "2.4rem" }}></div>
        </Link>

        {/* <div
        style={{
          display: menuData.opened ? "block" : "none",
          position: "absolute",
          top: menuData.y,
          left: menuData.x,
        }}
        ref={clickOutsideRef}
      >
        {menuNode}
      </div> */}
      </RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.Content
          className="flex min-w-[220px] flex-col gap-2 overflow-hidden rounded-md bg-white p-[5px] dark:bg-stone-950"
          // sideOffset={5}
          // align="end"
        >
          {contextMenuContent}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
};

export default FileListItem;
