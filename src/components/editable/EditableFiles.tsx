import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import { useClickOutside, useHover } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowUp,
  IconPhoto,
  IconTrashX,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
// import FileListItem from "../FileListItem";

import * as RadixContextMenu from "@radix-ui/react-context-menu";
import useTranslation from "~/hooks/useTranslation";
import { type FileType } from "~/schema/fileSchema";
import type EditableInput from "~/types/EditableInput";
import type TablerIconType from "~/types/TablerIconType";
import FileListItem from "../FileListItem";
import Modal from "../basic/Modal";
import InputLabel from "../input/InputLabel";

// FIXME: ENFORCE FILE LIMIT

// function getIconColor(status: any) {
//   return status.accepted
//     ? //@ts-ignore
//       theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
//     : status.rejected
//     ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
//     : theme.colorScheme === "dark"
//     ? theme.colors.dark[0]
//     : theme.colors.gray[7];
// }

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIconType> & { status: any }) {
  if (status.accepted) {
    return <IconUpload {...props} />;
  }

  if (status.rejected) {
    return <IconX {...props} />;
  }

  return <IconPhoto {...props} />;
}

interface EditableFilesProps extends EditableInput<FileType[]> {
  maxCount?: number;
}

const EditableFiles = (props: EditableFilesProps) => {
  const {
    label,
    required,
    onSubmit,
    value,
    initialValue,
    disabled,
    maxCount = 128,
  } = props;
  const t = useTranslation();
  const uuid = useId();
  const [focus, setFocus] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>(value ?? initialValue ?? []);
  const [error, setError] = useState<string | undefined>();
  const [uploading, setUploading] = useState<number>(0);
  const [previewOpened, setPreviewOpened] = useState<boolean>(false);
  // const [preview, setPreview] = useState<string>("");
  // const [previewWidth, setPreviewWidth] = useState<number | null | undefined>(
  //   null
  // );
  const [preview, setPreview] = useState<{
    url: string;
    width: number;
    height: number;
  }>({ url: "", width: 100, height: 100 });
  const [dragActive, setDragActive] = useState<boolean>(false);
  const refClickOutside = useClickOutside(() => setFocus(false));
  const { hovered, ref: hoverdRef } = useHover();

  const onUploadMany = (new_files: File[]) => {
    if (!new_files) return;
    if (files.length + new_files.length > maxCount) {
      setError("File limit reached");
      return;
    }
    setUploading((num: number) => num + new_files.length);

    const formData = new FormData();

    for (let i = 0; i < new_files.length; i++) {
      formData.append("files", new_files[i] as Blob);
    }

    // upload file for spec entry
    // formData.append("ref", "api::order.order") // entryName
    // formData.append("refId", "1") // entry id
    // formData.append("field", "files")

    // axios
    //   .post(env.NEXT_PUBLIC_SERVER_API_URL + "/api/upload", formData)
    //   .then((res: any) => {
    //     const filesData = res.data;
    //     onSubmit?.([...files, ...filesData]);
    //     setFiles((files) => [...files, ...filesData]);
    //     setUploading((num: number) => num - new_files.length);
    //     setError(undefined);
    //   })
    //   .catch((err: AxiosError) => {
    //     setError(err.response?.statusText);
    //     setUploading((num: number) => num - new_files.length);
    //   });
  };

  const onDelete = (index: number) => {
    // axios
    //   .delete(env.NEXT_PUBLIC_SERVER_API_URL + `/api/upload/files/${index}`)
    //   .then((res) => {
    //     if (res?.data?.id !== undefined) {
    //       setFiles((files) => files.filter((file) => file.id !== res.data.id));
    //       onSubmit?.(files.filter((file) => file.id !== res.data.id));
    //     }
    //     setError(undefined);
    //     //        console.log(res)
    //   })
    //   .catch((err: AxiosError) => {
    //     setFiles((files) => files.filter((val) => val.id !== index));
    //     setError(err.response?.statusText);
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    if (value === undefined || value === null) return;
    setFiles(value);
  }, [value]);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      if (e.target.files && e.target.files[0]) {
        console.log("files handleChange", e.target.files[0]);
        // at least one file has been selected

        // validate file type
        // const valid = validateFileType(e.target.files[0])
        // if (!valid) {
        //   toast({
        //     title: 'Invalid file type',
        //     description: 'Please upload a valid file type.',
        //   })
        //   return
        // }

        // const { getUrl, error } = await s3Upload(e.target.files[0])
        // if (!getUrl || error) throw new Error('Error uploading file')

        const { name, size } = e.target.files[0];

        // addFilesToState([{ name, getUrl, size }])
      }
    } catch (error) {
      // already handled
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // validate file type
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      console.log("files handleDrop", files);
      // const validFiles = files.filter((file) => validateFileType(file))

      // if (files.length !== validFiles.length) {
      //   toast({
      //     title: 'Invalid file type',
      //     description: 'Only image files are allowed.',
      //   })
      // }

      try {
        // const filesWithUrl = await Promise.all(
        //   validFiles.map(async (file) => {
        //     const { name, size } = file
        //     const { getUrl, error } = await s3Upload(file)

        //     if (!getUrl || error) return { name, size, getUrl: '', error }
        //     return { name, size, getUrl }
        //   })
        // )

        setDragActive(false);

        // at least one file has been selected
        // addFilesToState(filesWithUrl)

        e.dataTransfer.clearData();
      } catch (error) {
        // already handled
      }
    }
  };

  return (
    <div
      // label={label && label.length > 0 ? label : undefined}
      // required={required}
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
      ref={refClickOutside}
      onDragEnter={handleDrag}
    >
      <InputLabel
        label={label}
        copyValue={value?.reduce(
          (prev, next) => `${prev}${next.originalFilename}\n`,
          ""
        )}
      />
      <div tabIndex={100000} className="pb-4 pt-2 ">
        <Modal open={previewOpened} onClose={() => setPreviewOpened(false)}>
          <img
            src={preview.url}
            alt=""
            className="max-h-[85vh] max-w-[85vw]"
            style={{ width: preview.width }}
          />
        </Modal>

        <div
          ref={hoverdRef}
          className={`relative min-h-[44px]  rounded border border-solid transition-all ${
            dragActive ? "border-sky-600" : "border-transparent"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {files.length > 0
            ? files.map((file, index) => (
                <FileListItem
                  key={`${uuid}_${file.id}_${file.filename}`}
                  value={file}
                  onPreview={(url, width, height) => {
                    setPreview({
                      url,
                      width: width ?? 300,
                      height: height ?? 300,
                    });
                    setPreviewOpened(true);
                  }}
                  style={{ flexGrow: 1 }}
                  contextMenuContent={
                    !disabled && (
                      <>
                        <RadixContextMenu.Item
                          className="button flex-grow justify-start bg-stone-800 hover:bg-stone-600"
                          disabled={index === 0}
                        >
                          <IconArrowUp /> Up
                        </RadixContextMenu.Item>
                        <RadixContextMenu.Item
                          className="button flex-grow justify-start bg-stone-800 hover:bg-stone-600"
                          disabled={index === files.length - 1}
                        >
                          <IconArrowDown /> Down
                        </RadixContextMenu.Item>
                        <RadixContextMenu.Item className="button flex-grow justify-start bg-stone-800 hover:bg-stone-600">
                          <IconTrashX /> Delete
                        </RadixContextMenu.Item>
                      </>
                    )
                  }
                />
              ))
            : !uploading && <div>⸺</div>}
          {error && <div className="text-red-500">{error}</div>}
          {/* {(active && focus) ||
            (!!uploading && (
              //   ? (files.length < maxFileCount || !!uploading) &&
              //     !disabled && (
              <Button
                variant="default"
                styles={(theme) => ({
                  root: {
                    height: 46,
                    width: "100%",
                    backgroundColor:
                      theme.colorScheme === "dark" ? "#1A1B1E" : "#fff",
                    "&:disabled": {
                      color: theme.colorScheme === "dark" ? "#fff" : "#000",
                    },
                  },
                })}
                onClick={() => !uploading && setDropOpened(true)}
                radius="sm"
              >
                {uploading ? (
                  <Group align="center" position="center">
                    <Loader />
                    <Text>
                      {t("uploading")} {uploading}{" "}
                      {uploading === 1
                        ? t("files.singular")
                        : t("files.plural")}
                    </Text>
                  </Group>
                ) : (
                  <Plus size={26} />
                )}
              </Button>
            ))} */}
          {focus && (
            <></>
            // <Dropzone
            //   onDrop={(files) => {
            //     onUploadMany(files);
            //   }}
            //   onReject={(file_error) => {
            //     console.log(file_error);
            //   }}
            //   style={{ minWidth: "100%" }}
            //   multiple={maxCount !== 1}
            // >
            //   <Group
            //     position="center"
            //     spacing="xl"
            //     style={{ minHeight: 66, pointerEvents: "none" }}
            //   >
            //     <ImageUploadIcon
            //       status={status}
            //       style={{ color: getIconColor(status, theme) }}
            //       size={42}
            //     />
            //     <div>
            //       <Text size="lg" inline>
            //         Wrzuć tu pliki do wysłania
            //       </Text>
            //     </div>
            //   </Group>
            // </Dropzone>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableFiles;
