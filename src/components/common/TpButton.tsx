import React from "react";
import { Link } from "react-router-dom";

export interface TpButtonProps {
  text: string;
  to?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
}

export const TpButton: React.FC<TpButtonProps> = ({
  text,
  to,
  href,
  type,
  className = "",
  wrapperClassName = "tp-service-btn pt-30",
  disabled = false,
  onClick,
  target,
  rel,
}) => {
  const content = (
    <>
      <span>
        <span className="text-1">{text}</span>
        <span className="text-2">{text}</span>
      </span>
      <i>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
          />
        </svg>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
          />
        </svg>
      </i>
    </>
  );

  const btnClass = `tp-btn ${className}`.trim();

  let element;
  if (to) {
    element = (
      <Link to={to} className={btnClass} onClick={onClick} data-discover="true">
        {content}
      </Link>
    );
  } else if (href) {
    element = (
      <a
        href={href}
        className={btnClass}
        onClick={onClick}
        target={target}
        rel={rel}
        data-discover="true"
      >
        {content}
      </a>
    );
  } else {
    element = (
      <button
        type={type || "button"}
        className={btnClass}
        disabled={disabled}
        onClick={onClick}
        data-discover="true"
      >
        {content}
      </button>
    );
  }

  if (!wrapperClassName) {
    return element;
  }

  return <div className={wrapperClassName}>{element}</div>;
};

export default TpButton;
