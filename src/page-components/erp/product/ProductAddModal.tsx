import { useEffect, useState } from "react";

import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

import Button from "~/components/basic/Button";
import Modal from "~/components/basic/Modal";
import { api } from "~/utils/api";

interface ProductAddModalProps {
  opened: boolean;
  onClose: (id?: number) => void;
}

const ProductAddModal = ({ opened, onClose }: ProductAddModalProps) => {
  const router = useRouter();
  const [productName, setProductName] = useState<string>("Produkt");
  // const [template, setTemplate] = useState<Partial<ProductType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate: createProduct } = api.product.create.useMutation({
    onSuccess(data) {
      router.push(`/erp/product/${data.id}`).catch((e) => {
        throw e;
      });
    },
    onError(error) {
      //setError("Produkt o takiej nazwie istnieje.");
    },
  });

  useEffect(() => {
    if (!opened) {
      setProductName("Produkt");
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
          entryName="products"
          Element={ProductListItem}
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
            if (productName.length == 0)
              return setError("Musisz podać nie pustą nazwę produktu");
            // const new_product = {
            //   ...(template ? omit(template, "id") : {}),
            //   address: template?.address ? omit(template.address, "id") : null,
            //   username: username,
            //   orders: [],
            //   "orders-archive": [],
            // };
            // add(new_product)
            //   .then((data) => onClose(data?.data?.id))
            //   .catch(() => setError("Klient o takiej nazwie istnieje."));
            createProduct({ name: productName });
          }}
        >
          <IconPlus />
          Utwórz produkt
        </Button>
        <div className="text-red-600">{error}</div>
      </div>
    </Modal>
  );
};

export default ProductAddModal;
