// import ApiList from "../../../components/api/ApiList"
import ClientListItem from "./ClientListItem";
import { useRouter } from "next/router";
import { capitalize } from "lodash";
import useTranslation from "~/hooks/useTranslation";
import ApiList from "~/components/ApiList";
import { RouterNames } from "~/utils/api";

const entryName: RouterNames = "client";

interface ClientListProps {
  selectedId: number | null;
  onAddElement?: () => void;
}

const ClientsList = ({ selectedId, onAddElement }: ClientListProps) => {
  const router = useRouter();
  const t = useTranslation();

  return (
    <ApiList
      ListItem={ClientListItem}
      entryName={entryName}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      label={entryName ? capitalize(t[entryName].plural) : undefined}
      selectedId={selectedId}
      onChange={(val: { id: number }) => {
        router.push(`/erp/${entryName}/${val.id}`).catch((e) => {
          throw e;
        });
      }}
      listItemProps={{
        linkTo: (val: { id: number }) => `/erp/${entryName}/${val.id}`,
      }}
      filterKeys={["username", "firstname", "email", "companyName"]}
      onAddElement={onAddElement}
      showAddButton
      excludeKey="username"
      excludeValue="Szablon"
    />
  );
};

export default ClientsList;
