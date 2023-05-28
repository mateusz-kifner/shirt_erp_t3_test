import { useEffect, useState } from "react";

import { useClipboard, useHover } from "@mantine/hooks";
import { isEqual } from "lodash";

import EditableEnum from "~/components/editable/EditableEnum";
import EditableText from "~/components/editable/EditableText";
import { handleBlurForInnerElements } from "~/utils/handleBlurForInnerElements";

import DisplayCellExpanding from "~/components/basic/DisplayCellExpanding";
import { type AddressType } from "~/schema/addressSchema";
import type EditableInput from "~/types/EditableInput";
import InputLabel from "../input/InputLabel";

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
    if (!address) return undefined;
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
      <InputLabel
        label={label?.name}
        copyValue={toString()}
        required={required}
      />
      <DisplayCellExpanding>
        {focus ? (
          <div
            style={{ position: "relative" }}
            className="flex flex-grow flex-col gap-2"
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
          toString()
        )}
      </DisplayCellExpanding>
    </div>
  );
};

export default EditableAddress;
