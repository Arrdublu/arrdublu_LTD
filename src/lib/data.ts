import type { Service, CaseStudy, ExchangeRates } from './types';

// Mock exchange rates should be consistent with the provider
export const MOCK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157,
  JMD: 155,
};


export const services: Service[] = [
  {
    id: 'brand-identity',
    name: 'Brand Identity Suite',
    category: 'Creative',
    description: 'Craft a memorable brand that resonates. Our package includes logo design, color palette creation, typography guidelines, and a comprehensive brand style guide to ensure consistency across all platforms.',
    price: 1200,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b'],
    paymentLink: 'https://book.stripe.com/9B68wP9YOeqg6Ky3zg93y0a',
    whatsIncluded: ['Logo Design (3 concepts)', 'Color Palette & Typography', 'Brand Style Guide', 'Business Card Design', 'Social Media Profile Images'],
    goodToKnow: ['Project timeline is typically 2-3 weeks.', 'Includes 2 rounds of revisions for the chosen logo concept.'],
    caseStudyIds: ['global-rebrand'],
  },
  {
    id: 'cinematic-production',
    name: 'Cinematic Production',
    category: 'Creative',
    description: 'High-end 6K commercial photography and video. Meticulously directed and graded to match premium brand standards.',
    price: 3500,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9'],
    paymentLink: 'https://book.stripe.com/9B6aEXef41Dugl88TA93y0g',
    whatsIncluded: [
      '6K resolution cinematic capture',
      'Professional color grading & finishing',
      'High-end lighting design',
      'Location scouting and management',
      'Licensed background music',
      'Digital delivery of final assets',
    ],
    caseStudyIds: ['annual-corporate-summit', 'luxury-real-estate-showcase'],
  },
  {
    id: 'lifestyle-photography',
    name: 'Lifestyle Product Photography',
    category: 'Lifestyle',
    description: 'Showcase your products in their natural element. Our lifestyle photography session captures your products in authentic, relatable scenarios that connect with your target audience.',
    price: 950,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4'],
    paymentLink: 'https://buy.stripe.com/placeholder_lifestyle-photography',
  },
  {
    id: 'holographic-production',
    name: 'Holographic Production',
    category: 'Creative',
    description: 'Immersive holographic production services for futuristic tech launches, virtual events, and engaging web presences. Our holographic cluster nodes and WebGL solutions align to bring your vision to life.',
    price: 3500,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b'],
    paymentLink: 'https://buy.stripe.com/placeholder_holographic',
    whatsIncluded: ['3D Motion Graphics', 'WebGL Space Integration', 'Holographic Node Clustering', 'Immersive Web Design'],
    goodToKnow: ['Advanced technological operational details included.', 'Best suited for futuristic tech launches.'],
    caseStudyIds: ['futuristic-tech-launch'],
  },
  {
    id: 'cognitive-seo',
    name: 'Cognitive SEO',
    category: 'SEO',
    description: 'Algorithmic dominance frameworks and advanced search structures to own the digital conversation.',
    price: 3500,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4'],
    paymentLink: 'https://buy.stripe.com/placeholder_cognitive_seo',
  },
  {
    id: 'luxury-identity',
    name: 'Luxury Identity',
    category: 'Creative',
    description: 'Elite brand curation, high-end storytelling, and identity systems designed for premium market positioning.',
    price: 8000,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9'],
    paymentLink: 'https://buy.stripe.com/placeholder_luxury_identity',
  },
  {
    id: 'virtual-production',
    name: 'Virtual Production',
    category: 'Creative',
    description: 'Next-gen Unreal Engine 5 integrations and curved LED stage cinematic capture for reality-bending narratives.',
    price: 15000,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b'],
    paymentLink: 'https://buy.stripe.com/placeholder_virtual_production',
  },
  {
    id: 'event-photo',
    name: 'Event Photography & Videography',
    category: 'Lifestyle',
    description: 'Capturing the raw energy, elegance, and key milestones of your events in 6K resolution. Meticulously timed, light-balanced, and color-graded to match elite brand or personal standards.',
    price: 120,
    unit: 'hr',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9'],
    paymentLink: 'https://buy.stripe.com/placeholder_event_photo',
    whatsIncluded: [
      '6K resolution cinematic captures',
      'Professional color-grading and finishing',
      'Flexible hourly packages',
      'High-end lighting setups',
      'Digital delivery within 5-7 business days'
    ],
    goodToKnow: [
      'Minimum booking of 1 hour.',
      'Includes travel within metropolitan area; additional fees apply for regional locations.',
      'Standard turnaround is 5-7 business days.'
    ],
    caseStudyIds: ['annual-corporate-summit']
  },
  {
    id: 'video-editing',
    name: 'Video Editing & VFX',
    category: 'Creative',
    description: 'Professional video editing and visual effects services. We transform raw footage into captivating cinematic stories, tailored to your brand.',
    price: 75,
    unit: 'hr',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    previews: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4'],
    paymentLink: 'https://buy.stripe.com/placeholder_video_editing',
    whatsIncluded: [
      'Advanced color grading',
      'Audio mixing & sound design',
      'Custom motion graphics',
      'VFX integration',
      'Flexible revisions'
    ],
    goodToKnow: [
      'Minimum booking of 1 hour.',
      'Project files are delivered upon request.',
      'Rush delivery available for an additional fee.'
    ]
  }
];

export const caseStudies: CaseStudy[] = [
    {
        id: 'global-rebrand',
        title: 'The Saint T Collective',
        category: 'Creative',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
        description: 'We orchestrated a complete brand evolution for an elite event design firm, elevating their identity to mirror their artistry.',
        link: '/discover/case-studies/global-rebrand',
        dataAiHint: 'corporate meeting',
        status: 'Live',
    },
    {
        id: 'annual-corporate-summit',
        title: 'Annual Corporate Summit',
        category: 'Event Videography',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
        description: 'Dynamic video coverage for a major tech corporation\'s annual three-day summit.',
        link: '/discover/case-studies/annual-corporate-summit',
        dataAiHint: 'corporate summit',
        status: 'Archived',
    },
    {
        id: 'executive-portraits',
        title: 'Executive Branding Portraits',
        category: 'Lifestyle',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
        description: 'Crafted a powerful visual identity for a C-suite executive, enhancing their professional brand and online presence.',
        link: '/discover/case-studies/executive-portraits',
        dataAiHint: 'executive portrait',
        status: 'Live',
    },
    {
        id: 'production-makeup-collaboration',
        title: 'Flawless on Film: A Collaboration with Ioka Beautiful Purpose',
        category: 'Production Makeup',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
        description: 'A seamless collaboration ensuring talent looked impeccable on camera, delivering a great experience and fostering long-term retention.',
        link: '/discover/case-studies/production-makeup-collaboration',
        dataAiHint: 'makeup production',
        status: 'Archived',
    },
    {
      id: 'luxury-lifestyle-launch',
      title: 'Luxury Lifestyle Brand Launch',
      category: 'Social Media Strategy',
      image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
      description: 'Launched a new luxury brand on social media, achieving explosive growth and engagement through a targeted visual content strategy.',
      link: '/discover/case-studies/luxury-lifestyle-launch',
      dataAiHint: 'luxury lifestyle',
      status: 'Live',
    },
    {
        id: 'viral-post',
        title: 'KFC Viral Visual: The Power of a Single Post',
        category: 'Social Media Graphic',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
        description: 'How one strategically designed graphic for a local cafe led to a 500% increase in weekly engagement and record foot traffic.',
        link: '/discover/case-studies/viral-post',
        dataAiHint: 'cafe social',
        status: 'Live',
    },
    {
        id: 'executive-identity',
        title: 'Executive Identity: Crafting a Lasting Impression',
        category: 'Business Card Design',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
        description: 'Designed a premium business card for a top consulting firm, resulting in a measurable increase in client callbacks.',
        link: '/discover/case-studies/executive-identity',
        dataAiHint: 'business networking',
        status: 'Live',
    },
    {
        id: 'futuristic-tech-launch',
        title: 'Futuristic Tech Launch: A 3D Animated Reveal',
        category: '3D Motion Graphics',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
        description: 'Created a stunning 3D animated product reveal for a next-generation gadget, generating massive pre-launch buzz.',
        link: '/discover/case-studies/futuristic-tech-launch',
        dataAiHint: 'tech circuit',
        status: 'Live',
    },
    {
        id: 'luxury-real-estate-showcase',
        title: 'Luxury Real Estate Showcase',
        category: 'Cinematic Home Tour',
        image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
        description: 'A compelling video tour that brought a high-value property to life, resulting in a faster sale at the desired price point.',
        link: '/discover/case-studies/luxury-real-estate-showcase',
        dataAiHint: 'luxury home',
        status: 'Live',
    }
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
    return caseStudies.find((study) => study.id === id);
}

// Mock async function to simulate a database call
export async function getServicesByIds(ids: string[]): Promise<Service[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = services.filter((service) => ids.includes(service.id));
      resolve(result);
    }, 500);
  });
}

export async function getCaseStudiesByIds(ids: string[]): Promise<CaseStudy[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = caseStudies.filter((study) => ids.includes(study.id));
            resolve(result);
        }, 300);
    });
}
