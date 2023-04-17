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
  const { label, href, Icon, gradient, color, active } = props;
  const uuid = useId();
  return (
    <Link
      href={href}
      id={uuid}
      className={` flex items-center gap-3 rounded-md bg-black 
      bg-opacity-0 p-2 transition-all hover:bg-opacity-10 active:hover:scale-95 active:hover:animate-none
      active:focus:scale-95  active:focus:animate-none disabled:pointer-events-none 
      disabled:bg-stone-700 dark:bg-white 
       dark:text-gray-200 dark:hover:bg-opacity-10 ${
         active
           ? "bg-opacity-10 dark:bg-opacity-10"
           : "bg-opacity-0 dark:bg-opacity-0"
       }`}
      style={{ color: gradient ? gradient.to : color ?? "#0C8599" }}
    >
      <svg width="14rem" height="42" id={"outer" + uuid} key={"outer" + uuid}>
        <defs>
          <linearGradient
            id={"gradient_" + uuid}
            x1="0.02"
            y1="0.37"
            x2="0.98"
            y2="0.63"
          >
            <stop
              offset="0%"
              stopColor={gradient ? gradient.from : color ?? "#0C8599"}
            />
            <stop
              offset="100%"
              stopColor={gradient ? gradient.to : color ?? "#0C8599"}
            />
          </linearGradient>
          <mask id={"mask_" + uuid}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              className="fill-black"
            />
            <Icon
              size={42}
              className="stroke-white"
              key={"inner" + uuid}
              id={"inner" + uuid}
            />
            <text x="50" y="27" className=" fill-white font-bold tracking-wide	">
              {label}
            </text>
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
    </Link>
  );
}

export default NavButton;
