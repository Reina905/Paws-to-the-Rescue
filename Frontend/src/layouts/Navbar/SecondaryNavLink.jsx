import React from 'react'
import { Link } from 'react-router-dom'

export const SecondaryNavLink = ({
  to,
  children,
  className = "",
}) => {
  return (
    <Link
      to={to}
      className={`font-semibold py-2 px-3 rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  );
};