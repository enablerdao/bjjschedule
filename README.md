# BJJ Schedule App

A comprehensive platform for finding and managing Brazilian Jiu-Jitsu classes worldwide.

## Features

- Search for BJJ classes by location, time, instructor, and class type
- View academies on an interactive map
- Academy profiles with class schedules
- Multi-language support (English, Japanese, Portuguese, Spanish)
- User notifications for schedule changes
- Calendar integration

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Maps**: Google Maps API
- **Internationalization**: next-i18next

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Supabase account
- Google Maps API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bjj-schedule-app.git
cd bjj-schedule-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_APP_URL=http://localhost:12000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:12000](http://localhost:12000) in your browser.

## Database Setup

The application uses Supabase as its backend. You'll need to create the following tables:

- academies
- instructors
- class_categories
- classes
- class_instructors
- users
- user_favorites
- notifications

Refer to the `specification.md` file for the detailed schema.

## Deployment

### Deploying to Render

The application can be easily deployed to Render using the included `render.yaml` configuration file:

1. Create a new account or log in to [Render](https://render.com/)
2. Connect your GitHub repository
3. Click "New" and select "Blueprint"
4. Select your repository and Render will automatically detect the `render.yaml` file
5. Configure the required environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
6. Click "Apply" to deploy the application

Alternatively, you can use the one-click deploy button:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deployment

Alternatively, you can deploy to other platforms:

```bash
npm run build
# or
yarn build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
