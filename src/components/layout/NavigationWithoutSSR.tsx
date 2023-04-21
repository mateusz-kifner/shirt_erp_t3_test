import dynamic from "next/dynamic";

// HACK: This is required because Next.js hates Svg in Svg
const NavigationWithoutSSR = dynamic(() => import("./Navigation"), {
  ssr: false,
});

export default NavigationWithoutSSR;
