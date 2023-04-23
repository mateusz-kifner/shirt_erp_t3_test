import { truncString } from "~/utils/truncString";
import { getRandomColorByNumber } from "../../../utils/getRandomColor";
import { type ClientType } from "~/schema/clientSchema";
import Button from "~/components/basic/Button";

interface ClientListItemProps {
  onChange?: (item: Partial<ClientType>) => void;
  value: Partial<ClientType>;
  active?: boolean;
  disabled?: boolean;
}

const ClientListItem = ({
  value,
  onChange,
  active,
  disabled,
}: ClientListItemProps) => {
  return (
    <Button disabled={disabled} onClick={() => onChange?.(value)}>
      {value && (
        <div
          style={{
            background: `radial-gradient(circle, transparent 64%, ${getRandomColorByNumber(
              value.id
            )}  66%)`,
          }}
        >
          {value?.firstname?.[0]}
          {value?.lastname?.[0]}
        </div>
      )}
      <span>
        {value
          ? (value?.firstname && value.firstname?.length > 0) ||
            (value?.lastname && value.lastname?.length > 0)
            ? truncString(
                `${value.firstname ?? ""} ${value.lastname ?? ""}`,
                40
              )
            : truncString(value?.username ?? "", 40)
          : "⸺"}
      </span>
      <span>
        {(value?.email ? truncString(value.email, 20) : "") +
          (value?.email || value?.companyName ? " | " : "") +
          (value?.companyName ? truncString(value.companyName, 20) : "")}
      </span>
    </Button>
  );
};

export default ClientListItem;
