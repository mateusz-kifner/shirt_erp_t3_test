import { useClickOutside } from "@mantine/hooks";
import { IconDownload, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState, type CSSProperties, type ReactNode } from "react";
import useTranslation from "~/hooks/useTranslation";
import { type FileType } from "~/schema/fileSchema";
import Portal from "./Portal";
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
  menuNode: ReactNode;
}

const FileListItem = ({
  value,
  onChange,
  active,
  disabled,
  onPreview,
  style,
  menuNode,
}: FileListItemProps) => {
  const t = useTranslation();
  const [menuData, setMenuData] = useState<{
    opened: boolean;
    x: number;
    y: number;
  }>({ opened: false, x: 0, y: 0 });
  const clickOutsideRef = useClickOutside(() => {
    setMenuData({ opened: false, x: 0, y: 0 });
  });

  const preview = value.mimetype?.startsWith("image")
    ? "/api/files/" +
      value.filename +
      (value?.token && value.token.length > 0 ? "?token=" + value?.token : "")
    : undefined;

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMenuData({ opened: true, x: e.pageX, y: e.pageY });
  };
  return (
    <div
      className="relative items-center overflow-hidden border border-solid border-stone-700"
      style={style}
      onContextMenu={onContextMenu}
    >
      <div className="relative overflow-hidden child-hover:visible">
        <img
          src={preview}
          alt=""
          width={100}
          height={100}
          // fit="cover"
          // styles={(theme) => ({
          //   image: {
          //     visibility: undefined,
          //     borderRadius: typeof preview === "string" ? undefined : "100%",
          //     overflow: "hidden",
          //     padding: 0,
          //     margin: 0,
          //     backgroundColor:
          //       theme.colorScheme === "dark" ? "#2C2E33" : "#eee",
          //   },
          //   placeholder: {
          //     backgroundColor:
          //       theme.colorScheme === "dark" ? "#2C2E33" : "#eee",
          //     padding: 0,
          //     margin: 0,
          //   },
          // })}
          // withPlaceholder
          // placeholder={
          //   <IconFileUnknown
          //     size={88}
          //     color={
          //       theme.colorScheme === "dark"
          //         ? theme.colors.dark[7]
          //         : theme.colors.gray[4]
          //     }
          //   />
          // }
        />

        {preview && onPreview && (
          <ActionButton
            // sx={(theme) => ({
            //   visibility: "hidden",
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   zIndex: 102,
            //   height: 100,
            //   width: 100,

            //   "&:hover": {
            //     backgroundColor:
            //       theme.colorScheme === "dark" ? "#00000088" : "#ffffff88",
            //   },
            // })}
            onClick={() => {
              value?.filename &&
                onPreview(
                  "/api/files/" +
                    value.filename +
                    (value?.token && value.token.length > 0
                      ? "?token=" + value?.token
                      : "")
                  // value.width,
                  // value.height
                );
            }}
          >
            <IconEye className="text-stone-300 dark:text-stone-600" size={26} />
          </ActionButton>
        )}
      </div>
      <Tooltip
        tooltip={value?.filename}
        // multiline
        // width={400}
        // style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        // withArrow
        // openDelay={500}
        // disabled={!!(value?.name && value?.name?.length < 40)}
      >
        <div className="max-w-[calc(100% - 180px)] max-h-[90px] flex-grow break-words pr-2">
          {value?.filename}
        </div>
      </Tooltip>

      <Link
        href={
          "/api/files/" +
          value?.filename +
          (value?.token && value.token.length > 0
            ? "?token=" + value?.token + "&download"
            : "?download")
        }
      >
        <ActionButton
          tabIndex={-1}
          className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-stone-800"
        >
          <IconDownload size={26} />
          <div style={{ width: "2.4rem" }}></div>
        </ActionButton>
      </Link>

      <Portal>
        <div
          style={{
            display: menuData.opened ? "block" : "none",
            position: "absolute",
            top: menuData.y,
            left: menuData.x,
          }}
          ref={clickOutsideRef}
        >
          {menuNode}
        </div>
      </Portal>
    </div>
  );
};

export default FileListItem;
