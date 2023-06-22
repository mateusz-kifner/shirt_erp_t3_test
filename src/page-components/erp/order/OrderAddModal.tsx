import { useEffect, useState } from "react";

import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

import Button from "~/components/basic/Button";
import Modal from "~/components/basic/Modal";
import EditableText from "~/components/editable/EditableText";
import { api } from "~/utils/api";

interface OrderAddModalProps {
  opened: boolean;
  onClose: (id?: number) => void;
}

const OrderAddModal = ({ opened, onClose }: OrderAddModalProps) => {
  const router = useRouter();
  const [orderName, setOrderName] = useState<string>("Klient");
  // const [template, setTemplate] = useState<Partial<OrderType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate: createOrder } = api.order.create.useMutation({
    onSuccess(data) {
      setTimeout(() => {
        router.push(`/erp/order/${data.id}`).catch((e) => {
          throw e;
        });
      }, 400);
    },
    onError(error) {
      setError("Klient o takiej nazwie istnieje.");
    },
  });

  useEffect(() => {
    if (!opened) {
      setOrderName("Zamówienie");
      // setTemplate(null);
      setError(null);
    }
  }, [opened]);

  return (
    <Modal open={opened} onOpenChange={() => onClose()}>
      <h3>Utwórz nowego klienta</h3>
      <div className="g-2 flex flex-col">
        {/* <EditableApiEntry
          label="Szablon"
          entryName="orders"
          Element={OrderListItem}
          onSubmit={(template) => {
            setTemplate(template);
            // username === "Klient" && setusername(template.username)
          }}
          value={template}
          withErase
          listProps={{ defaultSearch: "Szablon", filterKeys: ["username"] }}
        /> */}
        <EditableText
          label="Nazwa zamowienia"
          onSubmit={(val) => setOrderName(val ?? "")}
          value={orderName}
          required
        />

        <Button
          onClick={() => {
            if (orderName.length == 0)
              return setError("Musisz podać nie pustą nazwę zamówienia");
            // const new_order = {
            //   ...(template ? omit(template, "id") : {}),
            //   address: template?.address ? omit(template.address, "id") : null,
            //   username: username,
            //   orders: [],
            //   "orders-archive": [],
            // };
            // add(new_order)
            //   .then((data) => onClose(data?.data?.id))
            //   .catch(() => setError("Klient o takiej nazwie istnieje."));
            createOrder({ name: orderName });
          }}
        >
          <IconPlus />
          Utwórz zamówienie
        </Button>
        <div className="text-red-600">{error}</div>
      </div>
    </Modal>
  );
};

export default OrderAddModal;
