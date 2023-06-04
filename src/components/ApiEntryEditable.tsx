import { IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { api } from "~/utils/api";
import ActionButton from "./basic/ActionButton";
import Editable from "./editable/Editable";
// import ApiStatusIndicator from "./ApiStatusIndicator"

interface ApiEntryEditableProps<EntryType = any> {
  template: any;
  entryName: string;
  id: number | null;
  allowDelete?: boolean;
  disabled?: boolean;
}

const ApiEntryEditable = <EntryType,>({
  template,
  entryName,
  id,
  allowDelete = false,
  disabled = false,
}: ApiEntryEditableProps<EntryType>) => {
  const uuid = useId();
  const { mutate: update } = api[entryName as "client"].update.useMutation();
  const { mutate: deleteById } =
    api[entryName as "client"].deleteById.useMutation();
  const { data, refetch } = api[entryName as "client"].getById.useQuery(
    id as number,
    {
      enabled: id !== null,
    }
  );

  // const { data, update, remove, refetch } = useStrapi<EntryType>(
  //   entryName,
  //   id,
  //   {
  //     query: "populate=*",
  //   }
  // );
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "success"
  >("idle");

  const router = useRouter();

  const apiUpdate = (key: string, val: any) => {
    /**/
  };
  //   setStatus("loading");
  //   update({ [key]: val } as Partial<EntryType>)
  //     .then((val) => {
  //       setStatus("success");
  //     })
  //     .catch((err) => {
  //       setStatus("error");
  //     });
  // };

  // const onDelete = () => {
  //   id &&
  //     remove(id)
  //       .then(() => router.push("."))
  //       .catch(() => {});
  // };

  return (
    <div className=" flex min-h-[200px] flex-grow flex-col">
      {data && Object.keys(data).length > 0 ? (
        <>
          {/* <div className="relative flex min-h-[200px] flex-col"> */}
          <Editable
            template={template}
            data={data as any}
            onSubmit={apiUpdate}
            disabled={disabled}
          />
          {/* </div> */}
          {/* {allowDelete && (
            <DeleteButton
              label={`${entryName}.singular`}
              onDelete={onDelete}
              buttonProps={{ mt: "4rem" }}
            />
          )} */}
        </>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Brak danych
        </div>
      )}
      {/* <ApiStatusIndicator
        status={status}
        style={{
          position: "fixed",
          top: "calc(var(--mantine-header-height, 0px) + 8px)",
          right: 8,
        }}
      /> */}
      {id !== null && (
        <ActionButton
          className="absolute right-0 top-0 rounded-full"
          onClick={() => {
            refetch().catch(() => {
              /**/
            });
          }}
        >
          <IconRefresh size={20} />
        </ActionButton>
      )}
    </div>
  );
};

export default ApiEntryEditable;
