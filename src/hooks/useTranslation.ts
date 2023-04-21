// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import pl from "~/locales/pl.json";
import en from "~/locales/en.json";

function useTranslation() {
  const router = useRouter();
  const locale = router.locale ?? "pl";

  return (locale === "pl" ? pl : en) as typeof pl;
}

export default useTranslation;
