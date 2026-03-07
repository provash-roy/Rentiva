import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        width={90}
        height={30}
        alt="Rentiva"
        className="object-contain"
        priority
      />
    </Link>
  );
}
