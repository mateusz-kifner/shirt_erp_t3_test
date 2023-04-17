// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pl from "~/locales/pl.json";

// TODO: allow changing locale

function useTranslation() {
  // const router = useRouter();
  // const locale = router.locale ?? "pl";
  const locale = "pl"; // FORCE PL

  const [t, setT] = useState<typeof pl>(pl);
  useEffect(() => {
    if (locale !== "pl") {
      async function loadTranslation() {
        const translation = (await import(
          `../locales/${locale}.json`
        )) as typeof pl;
        setT(translation);
      }
      void loadTranslation();
    }
  }, [locale]);

  return t;
}

export default useTranslation;
