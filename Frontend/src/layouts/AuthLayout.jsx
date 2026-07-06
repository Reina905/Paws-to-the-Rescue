import { Link } from "react-router-dom";

export const AuthLayout = ({ image, title, subtitle, children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-tertiary-light">

      {/* Left Side */}
      <div className="hidden lg:block relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-primary/55"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
          <h1 className="text-5xl font-bold mb-5">
            Paws to the Rescue
          </h1>

          <p className="text-xl leading-8 max-w-md">
            Helping shelters connect with passionate volunteers to improve the
            lives of rescued cats.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex justify-center items-center p-8">

        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10">

          <Link
            to="/"
            className="text-primary font-semibold hover:underline"
          >
            ← Back to Home
          </Link>

          <h2 className="text-4xl font-bold mt-8">
            {title}
          </h2>

          <p className="text-gray-500 mt-3 mb-10">
            {subtitle}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
};