import Link from "next/link";
import React, {
  type ComponentType,
  type ButtonHTMLAttributes,
  useId,
} from "react";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  small?: boolean;
  label: string;
  Icon: ComponentType<{ size: number; className: string; id?: string }>;
  href: string;
  entryName: string;
  gradient?: { from: string; to: string; deg: number };
  SecondNavigation?: ComponentType;
  debug?: boolean;
  active?: boolean;
}

function NavButton(props: NavButtonProps) {
  const { label, href, Icon, gradient, color } = props;
  const uuid = useId();
  return (
    <Link href={href} id={uuid}>
      <svg width="32" height="32" id={"outer" + uuid} key={"outer" + uuid}>
        <defs>
          <linearGradient id={"gradient_" + uuid}>
            <stop
              offset="0%"
              stopColor={gradient ? gradient.from : color ?? "#ffff00"}
            />
            <stop
              offset="100%"
              stopColor={gradient ? gradient.to : color ?? "#ffff00"}
            />
          </linearGradient>
          <mask id={"mask_" + uuid}>
            <g>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                className="fill-black"
              />
              <Icon
                size={32}
                className="stroke-white"
                key={"inner" + uuid}
                id={"inner" + uuid}
              />
            </g>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#gradient_${uuid})`}
          mask={`url(#mask_${uuid})`}
        />
      </svg>
      {/* <Icon size={32} className="stroke-white" /> */}

      {label}
    </Link>
  );
}

export default NavButton;
