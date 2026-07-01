import React from 'react'

export const Link = ({variant = "primary", children, ...props}) => {
    const variants = {
        primary:
          "bg-primary text-white",
        secondary:
         "bg-secondary",
    };

  return (
    <>
    <Link className={`py-2 px-3 rounded-2xl ${variants[variant]}`} {...props}>
        {children}
    </Link>
    </>
  )
}
