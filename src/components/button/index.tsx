const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = (
  props,
) => {
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer relative inline-block px-4 py-2 font-medium group"
    >
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <span className="relative text-black group-hover:text-white">
        {props.children}
      </span>
    </div>
  );
};

export default Button;
