'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IActiveProps {
  label: string;
  href: string;
}

const ActiveLink = ({ label, href }: IActiveProps) => {
  const pathName = usePathname();
  const isActive = pathName == href;
  return (
    <Link
      href={href}
      className={`text-[17px]  px-5 py-2.5 ${isActive ? 'bg-primary rounded text-white' : 'text-gray-500'}`}
    >
      {label}
    </Link>
  );
};

export default ActiveLink;
