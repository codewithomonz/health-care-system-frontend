import { Link } from "react-router";
const AuthPageHeader = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full mt-20">
      <div className="flex flex-col gap-4 items-start justify-center w-full px-8 md:px-12 lg:px-40">
        <Link to="/" className="">
          <img
            src={image}
            alt="logo"
            width={100}
            height={100}
            className="bg-slate-600 items-start rounded-sm"
          />
        </Link>
        <h4 className="font-bold text-2xl md:text-4xl text-cyan-600">
          {title}
        </h4>
        <p className="text-lg text-cyan-950">{description}</p>
      </div>
    </div>
  );
};

export default AuthPageHeader;
