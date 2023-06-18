import { useEffect, useState } from "react";

import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

import Button from "~/components/basic/Button";
import Modal from "~/components/basic/Modal";

interface OrderAddModalProps {
  opened: boolean;
  onClose: (id?: number) => void;
}

const OrderAddModal = ({ opened, onClose }: OrderAddModalProps) => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Klient");
  // const [template, setTemplate] = useState<Partial<OrderType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const { mutate: createOrder } = api.order.create.useMutation({
  //   onSuccess(data) {
  //     router.push(`/erp/order/${data.id}`).catch((e) => {
  //       throw e;
  //     });
  //   },
  //   onError(error) {
  //     setError("Klient o takiej nazwie istnieje.");
  //   },
  // });

  useEffect(() => {
    if (!opened) {
      setUsername("Klient");
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
        />
        <EditableText
          label="Nazwa użytkownika"
          onSubmit={setusername}
          value={username}
          required
        /> */}

        <Button
          onClick={() => {
            if (username.length == 0)
              return setError("Musisz podać nie pustą nazwę użytkownika");
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
            // createOrder({ username });
          }}
        >
          <IconPlus />
          Utwórz klienta
        </Button>
        <div className="text-red-600">{error}</div>
      </div>
    </Modal>
  );
};

export default OrderAddModal;
