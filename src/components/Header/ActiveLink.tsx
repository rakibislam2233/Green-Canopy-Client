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
      className={` text-sm md:text-base ${isActive ? 'border-b border-primary text-primary' : 'text-gray-500'}`}
    >
      {label}
    </Link>
  );
};

export default ActiveLink;
