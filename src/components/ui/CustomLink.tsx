// src/components/ui/CustomLink.tsx
import React from "react";
import Link from "next/link";
import { LinkProps } from "next/link";

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  children,
  interactive = true,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={`${className} ${interactive ? "interactive" : ""}`}
      style={{ cursor: "none !important" }}
    >
      <span style={{ cursor: "none !important" }}>{children}</span>
    </Link>
  );
};

export default CustomLink;
