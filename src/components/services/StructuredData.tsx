export default function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ARRDUBLU",
    "url": "https://arrdublu.us/service",
    "logo": "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_Mobile_Logo.png?alt=media",
    "priceRange": "$75 - $15000",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creative & Production Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Branding & Strategy",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Brand Identity Suite",
                "description": "Logo design, color palette, typography system."
              },
              "price": "1200.00",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Luxury Identity",
                "description": "Elite brand curation and storytelling."
              },
              "price": "8000.00",
              "priceCurrency": "USD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Film & Virtual Production",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Virtual Production",
                "description": "Next-gen Unreal Engine 5 integrations and curved LED stage capture."
              },
              "price": "15000.00",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Event Photography & Videography",
                "description": "12K resolution live event coverage."
              },
              "price": "120.00",
              "priceCurrency": "USD",
              "unitCode": "HUR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Video Editing & Post-Production",
                "description": "VFX, music video, and multi-cam editing."
              },
              "price": "75.00",
              "priceCurrency": "USD",
              "unitCode": "HUR"
            }
          ]
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
