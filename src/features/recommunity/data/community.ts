import { faker } from '@faker-js/faker'
import {
  CommunityCategory,
  DetailedCommunityItem,
  MemberRange,
} from './sidebar'

faker.seed(123)

const COMMUNITIES: DetailedCommunityItem[] = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    icon: 'heroicons:light-bulb-solid',
    count: '120',
    description: 'A community for tech lovers to share ideas and innovations.',
    category: 'Technology',
    createdAt: new Date('2025-01-10T09:00:00Z'),
    updatedAt: new Date('2025-06-01T12:30:00Z'),
    members: 120,
    isPublic: true,
    reviews: [
      {
        name: 'Alice Smith',
        updatedAt: new Date('2025-05-15'),
        starRating: 4,
        comment: 'Great discussions on the latest tech trends!',
        images: [
          '/images/community/reviews/tech-review-01.webp',
          '/images/community/reviews/tech-review-02.webp',
        ],
      },
      {
        name: 'Bob Johnson',
        updatedAt: new Date('2025-04-20'),
        starRating: 5,
        comment: 'Very active and engaging community.',
      },
    ],
  },
  {
    id: 2,
    name: 'Fitness Fanatics',
    icon: 'heroicons:fire-solid',
    count: '85',
    description: 'Join fitness enthusiasts to share workout tips and goals.',
    category: 'Health & Fitness',
    createdAt: new Date('2025-02-15T14:20:00Z'),
    updatedAt: new Date('2025-05-25T10:45:00Z'),
    members: 85,
    isPublic: false,
    reviews: [
      {
        name: 'Carol White',
        updatedAt: new Date('2025-05-10'),
        starRating: 3,
        comment: 'Good community, but needs more active members.',
      },
    ],
  },
  {
    id: 3,
    name: 'Book Club',
    icon: 'heroicons:book-open-solid',
    count: '50',
    description: 'A place for book lovers to discuss their favorite reads.',
    category: 'Literature',
    createdAt: new Date('2025-03-05T11:10:00Z'),
    updatedAt: new Date('2025-06-03T15:15:00Z'),
    members: 50,
    isPublic: true,
    reviews: [
      {
        name: 'David Brown',
        updatedAt: new Date('2025-06-01'),
        starRating: 5,
        comment: 'Amazing book discussions, highly recommend!',
        images: ['/images/community/reviews/book-review-01.webp'],
      },
    ],
  },
]

const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { label: 'All', value: 'all', count: '3' },
  { label: 'Technology', value: 'Technology', count: '1' },
  { label: 'Health & Fitness', value: 'Health & Fitness', count: '1' },
  { label: 'Literature', value: 'Literature', count: '1' },
]

const MEMBER_RANGES: MemberRange[] = [
  {
    label: '0 - 50',
    value: { min: 0, max: 50 },
    count: '1',
  },
  {
    label: '51 - 100',
    value: { min: 51, max: 100 },
    count: '1',
  },
  {
    label: '101 - 200',
    value: { min: 101, max: 200 },
    count: '1',
  },
]

export { COMMUNITIES, COMMUNITY_CATEGORIES, MEMBER_RANGES }
