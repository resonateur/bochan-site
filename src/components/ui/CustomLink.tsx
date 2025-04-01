// src/components/ui/CustomLink.tsx
import React from "react";
import Link from "next/link";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
  forceNavigation?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  children,
  interactive = true,
  forceNavigation = false,
  ...props
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // If we want to force navigation even when on the same route
    if (forceNavigation && router.asPath === props.href) {
      e.preventDefault();
      window.location.href = props.href.toString();
    }
  };

  return (
    <Link
      {...props}
      className={`${className} ${interactive ? "interactive" : ""}`}
      style={{ cursor: "none !important" }}
      onClick={handleClick}
    >
      <span style={{ cursor: "none !important" }}>{children}</span>
    </Link>
  );
};

export default CustomLink;
