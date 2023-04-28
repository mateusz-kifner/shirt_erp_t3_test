import { useClipboard, useHover } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { type AddressType } from "~/schema/addressSchema";
import { IconCopy } from "@tabler/icons-react";
import EditableEnum from "./EditableEnum";
import EditableText from "./EditableText";
import { isEqual } from "lodash";
import type EditableInput from "~/types/EditableInput";
import { handleBlurForInnerElements } from "../../utils/handleBlurForInnerElements";
import { showNotification } from "~/lib/notifications";
import DisplayCell from "../basic/DisplayCell";

const provinces = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

interface EditableAddressProps
  extends Omit<EditableInput<AddressType>, "label"> {
  label?: AddressType & { name: string };
  maxLength?: number;
}

const EditableAddress = (props: EditableAddressProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    maxLength,
    leftSection,
    rightSection,
  } = props;
  const [address, setAddress] = useState<AddressType>(
    value
      ? value
      : initialValue
      ? initialValue
      : {
          streetName: "",
          streetNumber: "",
          apartmentNumber: "",
          secondLine: "",
          city: "",
          province: "",
          postCode: "",
        }
  );
  const [focus, setFocus] = useState<boolean>(false);
  const clipboard = useClipboard();
  const { hovered, ref } = useHover();

  const setAddressField = (key: string, val: string) => {
    const new_address = { ...address, [key]: val };
    const prevAddress = value
      ? value
      : initialValue
      ? initialValue
      : {
          streetName: "",
          streetNumber: "",
          apartmentNumber: "",
          secondLine: "",
          city: "",
          province: "",
          postCode: "",
        };
    if (!isEqual(prevAddress, new_address)) {
      onSubmit?.(new_address);
      setAddress(new_address);
    }
  };

  useEffect(() => {
    if (focus) {
      // setPrevAddress({ ...address })
    }
    // eslint-disable-next-line
  }, [focus]);

  useEffect(() => {
    if (value && !isEqual(address, value)) {
      setAddress({ ...value });
    }
    //eslint-disable-next-line
  }, [
    value?.streetName,
    value?.streetNumber,
    value?.apartmentNumber,
    value?.secondLine,
    value?.postCode,
    value?.city,
    value?.province,
  ]);

  const toString = () => {
    if (!address) return null;
    return (
      (address?.streetName ? "ul. " + address?.streetName : "") +
      " " +
      (address.streetNumber || "") +
      (address.apartmentNumber ? " / " + address.apartmentNumber : "") +
      "\n" +
      (address.secondLine ? address.secondLine + "\n" : "") +
      (address.postCode ? address.postCode + " " : "") +
      (address.city || "") +
      (address.postCode || address.city ? "\n" : "") +
      (address.province || address.province)
    );
  };

  return (
    <div
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
      onBlur={handleBlurForInnerElements(() => setFocus(false))}
      ref={ref}
    >
      <label>
        {label?.name}
        {
          <button
            className="border-1 inline-flex animate-pop items-center justify-center
        gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
      text-gray-200 no-underline transition-all  
      hover:bg-black hover:bg-opacity-30
        active:focus:scale-95 active:focus:animate-none 
        active:hover:scale-95 active:hover:animate-none"
            onClick={() => {
              const addressStr = toString();
              clipboard.copy(addressStr);
              showNotification({
                title: "Skopiowano do schowka",
                message: addressStr,
                icon: <IconCopy />,
              });
            }}
            tabIndex={-1}
          >
            <IconCopy size={16} />
          </button>
        }
      </label>

      {focus ? (
        <div
          style={{ position: "relative" }}
          className="flex flex-col gap-2"
          tabIndex={999999999} // ensure that focus can be captured on element
        >
          <EditableText
            label={label?.streetName ?? undefined}
            value={value?.streetName ?? ""}
            onSubmit={(value) =>
              value !== null && setAddressField("streetName", value)
            }
          />
          <div className="flex flex-grow gap-2">
            <EditableText
              label={label?.streetNumber ?? undefined}
              value={value?.streetNumber ?? ""}
              onSubmit={(value) =>
                value !== null && setAddressField("streetNumber", value)
              }
              style={{ flexGrow: 1 }}
            />
            <EditableText
              label={label?.apartmentNumber ?? undefined}
              value={value?.apartmentNumber ?? ""}
              onSubmit={(value) =>
                value !== null && setAddressField("apartmentNumber", value)
              }
              style={{ flexGrow: 1 }}
            />
          </div>
          <EditableText
            label={label?.secondLine ?? undefined}
            value={value?.secondLine ?? ""}
            onSubmit={(value) =>
              value !== null && setAddressField("secondLine", value)
            }
          />
          <EditableText
            label={label?.postCode ?? undefined}
            value={value?.postCode ?? ""}
            onSubmit={(value) =>
              value !== null && setAddressField("postCode", value)
            }
          />
          <EditableText
            label={label?.city ?? undefined}
            value={value?.city ?? ""}
            onSubmit={(value) =>
              value !== null && setAddressField("city", value)
            }
          />
          <EditableEnum
            label={label?.province ?? undefined}
            value={value?.province ?? ""}
            onSubmit={(value) =>
              value !== null && setAddressField("province", value)
            }
            enum_data={provinces}
          />
        </div>
      ) : (
        <DisplayCell
          leftSection={leftSection}
          disabled={disabled}
          rightSection={rightSection}
        >
          {" "}
          {toString()}
        </DisplayCell>
      )}
    </div>
  );
};

export default EditableAddress;
