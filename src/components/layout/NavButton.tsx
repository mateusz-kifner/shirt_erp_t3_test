import Link from "next/link";
import React, {
  type ComponentType,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  small?: boolean;
  label: string;
  Icon: ReactNode;
  href: string;
  entryName: string;
  gradient?: { from: string; to: string; deg: number };
  SecondNavigation?: ComponentType;
  debug?: boolean;
  active?: boolean;
}

function NavButton(props: NavButtonProps) {
  const { label, href, Icon } = props;
  return (
    <Link href={href} className="">
      {Icon}
      {label}
    </Link>
  );
}

export default NavButton;
