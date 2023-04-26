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
    <button
      className="border-1 inline-flex h-20 animate-pop select-none items-center
        justify-center gap-3 rounded-sm  stroke-gray-200 
        px-4 py-0 
         text-gray-200  transition-all 
        disabled:pointer-events-none  disabled:bg-stone-700 
        hover:bg-black 
        hover:bg-opacity-20 active:focus:scale-95 active:focus:animate-none
        active:hover:scale-95 active:hover:animate-none"
      disabled={disabled}
      onClick={() => onChange?.(value)}
    >
      {value && (
        <div
          className="flex h-10 w-10 select-none items-center justify-center rounded-full text-base font-bold text-stone-800 dark:text-stone-200"
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
      <div className="flex flex-col items-start gap-2">
        <span className=" text-stone-800 dark:text-stone-200">
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
        <span className="text-sm text-stone-600 dark:text-stone-400">
          {(value?.email ? truncString(value.email, 20) : "") +
            (value?.email || value?.companyName ? " | " : "") +
            (value?.companyName ? truncString(value.companyName, 20) : "")}
        </span>
      </div>
    </button>
  );
};

export default ClientListItem;
