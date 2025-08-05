import Image from "next/image"

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center text-center mb-6">
      <Image 
        src={picture} 
        className="rounded-full border border-[var(--border)] mr-2" 
        alt={name}
        width={18}
        height={18} />
      <div className="text-md">{name}</div>
    </div>
  );
};

export default Avatar;
