import { truncString } from "~/utils/truncString";
import { type ClientType } from "~/schema/clientSchema";
import { DefaultListItem } from "~/components/DefaultListItem";

interface ClientListItemProps {
  onChange?: (item: Partial<ClientType>) => void;
  value: Partial<ClientType>;
  active?: boolean;
  disabled?: boolean;
}

const ClientListItem = (props: ClientListItemProps) => {
  const value = props.value;
  return (
    <DefaultListItem
      firstElement={
        value
          ? (value?.firstname && value.firstname?.length > 0) ||
            (value?.lastname && value.lastname?.length > 0)
            ? truncString(
                `${value.firstname ?? ""} ${value.lastname ?? ""}`,
                40
              )
            : truncString(value?.username ?? "", 40)
          : "⸺"
      }
      secondElement={
        (value?.email ? truncString(value.email, 20) : "") +
        (value?.email || value?.companyName ? " | " : "") +
        (value?.companyName ? truncString(value.companyName, 20) : "")
      }
      avatarElement={`${value?.firstname?.[0] ?? ""}${
        value?.lastname?.[0] ?? ""
      }`}
      {...props}
    />
  );
};

export default ClientListItem;
