import { AppEvent } from '../models/event.model';

export const MOCK_EVENTS: AppEvent[] = [
  {
    id: 1,
    title: 'Electric Night: Live Concert Series',
    description: 'High-energy live performances from top indie and electronic artists. DJ sets, live visuals, and dancing under the stars.',
    startDate: '2025-12-20T20:00:00Z',
    endDate: '2025-12-21T02:00:00Z',
    category: 'PARTY',
    capacity: 500,
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    price: 45.00,
    attendees: 350,
    creator: {
      id: 10,
      name: 'Ava Carter',
      email: 'ava@example.com'
    },
    
    location: {
      name: 'The Pavilion',
      street: '123 Sunset Blvd',
      city: 'San Francisco',
      country: 'USA',
      postalCode: '94102'
    },
    tags: [{ name: 'concert' }, { name: 'music' }, { name: 'live' }]
  },
  {
    id: 2,
    title: 'Startup Mixer & Pitch Night',
    description: 'Founders, builders, and investors meet for lightning pitches and networking.',
    startDate: '2025-12-22T17:00:00Z',
    endDate: '2025-12-22T20:00:00Z',
    category: 'TECH',
    capacity: 200,
    attendees: 150,
    isVirtual: true,
    virtualLink: 'https://meet.google.com/abc-defg-hij',
    posterUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    price: 0.00,
    creator: {
      id: 11,
      name: 'Noah Lee',
      email: 'noah@example.com'
    },
    tags: [{ name: 'networking' }, { name: 'startup' }]
  },
  {
    id: 3,
    title: 'Creative Jam: Art & Code',
    description: 'Hands-on night blending generative art, live coding, and collaborative murals.',
    startDate: '2025-12-18T19:00:00Z',
    endDate: '2025-12-18T22:00:00Z',
    category: 'ART_CULTURE',
    capacity: 80,
    attendees: 65,
    posterUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    price: 25.00,
    creator: {
      id: 12,
      name: 'Maya Rivera',
      email: 'maya@example.com'
    },
    location: {
      name: 'Warehouse 19',
      street: '19 Arts Ave',
      city: 'Austin',
      country: 'USA',
      postalCode: '73301'
    },
    tags: [{ name: 'art' }, { name: 'coding' }]
  }
];
