# BJJ Schedule App - Technical Specification

## Project Overview

The BJJ Schedule App is a comprehensive platform designed to centralize Brazilian Jiu-Jitsu class schedules worldwide, allowing users to easily search and browse classes based on location, time, academy, instructor, and other criteria.

## Core Objectives

1. Create a centralized database of BJJ class schedules from academies worldwide
2. Provide an intuitive search interface for users to find classes based on various criteria
3. Enable academies to easily manage and update their class schedules
4. Implement notification systems for users to stay updated on schedule changes
5. Support multiple languages to serve the global BJJ community

## Technical Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context API + SWR for data fetching
- **Internationalization**: next-i18next
- **Maps Integration**: Google Maps API
- **Calendar Integration**: react-big-calendar + Google Calendar API

### Backend
- **Platform**: Supabase
- **Database**: PostgreSQL (provided by Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime Updates**: Supabase Realtime

### DevOps
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Supabase (Backend)
- **Monitoring**: Sentry

## Detailed Feature Specifications

### 1. Class Schedule Management

#### Academy Dashboard
- Academy profile creation and management
- Bulk schedule upload via CSV/Excel
- Recurring class setup with exceptions handling
- Class categorization (Fundamentals, Advanced, No-Gi, Kids, Competition, etc.)
- Instructor assignment to classes
- Temporary schedule changes (holidays, special events)

#### Class Details
- Title
- Description
- Category/Type
- Level (Beginner, Intermediate, Advanced, All Levels)
- Instructor(s)
- Start/End time
- Recurring pattern
- Location (mat area within academy)
- Maximum capacity
- Requirements (gi/no-gi, belt level)

### 2. Search Functionality

#### Search Parameters
- Location (city, region, country)
- Date/Time range
- Class type/category
- Instructor
- Academy
- Belt level requirements

#### Search Results
- List view with filtering options
- Map view showing academy locations
- Calendar view for time-based browsing
- Sorting options (distance, time, rating)

### 3. User Features

#### User Profiles
- Favorite academies and classes
- Training history
- Belt level and experience
- Preferences for notifications

#### Notifications
- Email notifications for schedule changes
- Push notifications (web/mobile)
- Calendar sync with Google/Apple/Outlook calendars
- Custom notification preferences

#### Social Features
- Class attendance tracking
- Training partners connection
- Optional check-in feature

### 4. Maps Integration

- Interactive map showing academy locations
- Filtering options on map view
- Directions to academies
- Distance calculation from user location

### 5. Multi-language Support

- Initial languages: English, Japanese, Portuguese, Spanish
- Language detection based on browser settings
- Easy language switching
- Regional formatting for dates, times, and addresses

## Database Schema (Supabase)

### Tables

#### academies
- id (PK)
- name
- description
- address
- city
- region
- country
- latitude
- longitude
- logo_url
- website
- phone
- email
- created_at
- updated_at

#### instructors
- id (PK)
- academy_id (FK)
- name
- bio
- belt_level
- profile_image_url
- created_at
- updated_at

#### class_categories
- id (PK)
- name
- description
- color_code

#### classes
- id (PK)
- academy_id (FK)
- category_id (FK)
- title
- description
- start_time
- end_time
- recurring_pattern
- max_capacity
- requirements
- created_at
- updated_at

#### class_instructors (junction table)
- class_id (FK)
- instructor_id (FK)

#### users
- id (PK)
- email
- name
- belt_level
- profile_image_url
- language_preference
- created_at
- updated_at

#### user_favorites
- user_id (FK)
- academy_id (FK)
- class_id (FK)
- created_at

#### notifications
- id (PK)
- user_id (FK)
- type
- content
- read
- created_at

## API Endpoints

### Authentication
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- POST /auth/reset-password

### Academies
- GET /academies
- GET /academies/:id
- POST /academies
- PUT /academies/:id
- DELETE /academies/:id

### Classes
- GET /classes
- GET /classes/:id
- POST /classes
- PUT /classes/:id
- DELETE /classes/:id
- GET /classes/search

### Users
- GET /users/:id
- PUT /users/:id
- GET /users/:id/favorites
- POST /users/:id/favorites
- DELETE /users/:id/favorites/:favoriteId

### Notifications
- GET /notifications
- PUT /notifications/:id
- DELETE /notifications/:id

## UI/UX Design Guidelines

### Design Principles
- Mobile-first approach
- Clean, minimalist interface
- Intuitive navigation
- Consistent color scheme based on BJJ themes

### Color Palette
- Primary: #1E40AF (Blue - representing blue belt)
- Secondary: #10B981 (Green - representing green belt)
- Accent: #F59E0B (Yellow/Gold - representing gold medals)
- Dark: #1F2937 (Dark blue/black - representing black belt)
- Light: #F3F4F6 (White - representing white belt)

### Typography
- Primary Font: Inter (sans-serif)
- Secondary Font: Roboto Mono (for time displays)
- Font Sizes: Following responsive scale

### Components
- Custom buttons with belt-color themes
- Card components for class displays
- Calendar components with BJJ-themed indicators
- Map markers customized for academies

## Development Phases

### Phase 1: MVP (8 weeks)
- Basic academy and class management
- Simple search functionality
- User authentication
- Core database structure
- Basic UI implementation

### Phase 2: Enhanced Features (6 weeks)
- Advanced search capabilities
- Notification system
- Calendar integration
- Map view improvements
- Performance optimizations

### Phase 3: Social & Advanced Features (6 weeks)
- Social features implementation
- Multi-language support
- Analytics dashboard for academies
- Mobile responsiveness improvements
- Advanced filtering options

### Phase 4: Refinement & Scaling (4 weeks)
- Performance optimization
- Security enhancements
- Scalability improvements
- Bug fixes and UI polish
- Documentation

## Deployment Strategy

### Development Environment
- Local development with Supabase local instance
- Feature branch workflow

### Staging Environment
- Vercel preview deployments
- Supabase staging project
- Automated testing

### Production Environment
- Vercel production deployment
- Supabase production project
- CDN integration for static assets
- Database backups and monitoring

## Monitoring and Analytics

- Sentry for error tracking
- Google Analytics for user behavior
- Custom analytics dashboard for academies
- Performance monitoring with Vercel Analytics

## Security Considerations

- Authentication via Supabase with JWT
- Role-based access control
- Data encryption for sensitive information
- Regular security audits
- GDPR compliance for user data
- Rate limiting for API endpoints

## Future Expansion Possibilities

- Mobile applications (iOS/Android)
- Online class booking and payment integration
- Live class attendance tracking
- Instructor reviews and ratings
- Tournament calendar integration
- Training progress tracking
- Video content integration for techniques

## Resource Requirements

### Development Team
- 1 Project Manager
- 2 Frontend Developers
- 1 Backend Developer
- 1 UI/UX Designer
- 1 QA Engineer

### Infrastructure
- Supabase Professional Plan
- Vercel Pro Plan
- Google Maps API subscription
- Email service provider

## Success Metrics

- Number of academies registered
- Number of active users
- Search volume
- User retention rate
- Schedule update frequency
- Cross-platform usage statistics
- Language distribution