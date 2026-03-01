import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className="relative h-10 w-10">
      <Image
        src={src || "/images/placeholder.jpg"}
        alt="Avatar"
        fill
        className="rounded-full object-cover border border-gray-300"
      />
    </div>
  );
};

export default Avatar;
