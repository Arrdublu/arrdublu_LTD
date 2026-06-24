
import Image from 'next/image';

export function Logo() {
  const lightLogo = "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logo_blackArtboard-1.png?alt=media&token=577a50cf-ae11-45c7-8a98-e023e59df2d4";
  const darkLogo = "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021";

  return (
    <div className="relative w-36" style={{ height: '36px' }}>
        <Image
            src={lightLogo}
            fill
            alt="Arrdublu Logo"
            priority
            className="object-contain dark:hidden"
            sizes="(max-width: 768px) 100vw, 144px"
        />
        <Image
            src={darkLogo}
            fill
            alt="Arrdublu Logo"
            priority
            className="object-contain hidden dark:block"
            sizes="(max-width: 768px) 100vw, 144px"
        />
    </div>
  );
}
