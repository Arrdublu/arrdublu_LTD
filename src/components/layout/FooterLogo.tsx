
'use client';

import Image from 'next/image';

export function FooterLogo() {
  const newLogo = "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_Mobile_Logo.png?alt=media&token=fbd8239d-6373-4b15-a82d-d6ae3bca07f0";

  return (
    <div className="relative w-36" style={{ height: '36px' }}>
        <Image
            src={newLogo}
            fill
            alt="Arrdublu Logo"
            priority
            className="object-contain dark:hidden"
            sizes="(max-width: 768px) 100vw, 144px"
        />
        <Image
            src={newLogo}
            fill
            alt="Arrdublu Logo"
            priority
            className="object-contain hidden dark:block"
            sizes="(max-width: 768px) 100vw, 144px"
        />
    </div>
  );
}
