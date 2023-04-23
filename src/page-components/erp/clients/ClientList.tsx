// import ApiList from "../../../components/api/ApiList"
import ClientListItem from "./ClientListItem";
import { useRouter } from "next/router";
import { capitalize } from "lodash";
import useTranslation from "~/hooks/useTranslation";

const entryName = "clients";

interface ClientListProps {
  selectedId: number | null;
  onAddElement?: () => void;
}

const ClientsList = ({ selectedId, onAddElement }: ClientListProps) => {
  // const [id, setId] = useState<number | null>(null)
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const t = useTranslation();

  return null;
  // <ApiList
  //   ListItem={ClientListItem}
  //   entryName={entryName}
  //   label={entryName ? capitalize(t[entryName].plural) : undefined}
  //   selectedId={selectedId}
  //   onChange={(val: { id: number }) => {
  //     router.push(`/erp/${entryName}/${val.id}`).catch((e) => {
  //       throw e;
  //     });
  //   }}
  //   listItemProps={{
  //     linkTo: (val: { id: number }) => `/erp/${entryName}/${val.id}`,
  //   }}
  //   filterKeys={["username", "firstname", "email", "companyName"]}
  //   onAddElement={onAddElement}
  //   showAddButton
  //   exclude={{ username: "Szablon" }}
  // />
};

export default ClientsList;
