# Social Network

A modern full-stack React application that replicates social media core functionality with user authentication, database persistence, and real-time interactions.

## Features

- **User Authentication**: Register and login with secure JWT tokens
- **User Profiles**: Personal profiles with customizable information
  - **Own Profile**: View and edit your profile information, cover photo, and posts
  - **Other Users' Profiles**: View other users' profiles, follow them, and send messages
  - **Profile Navigation**: Click on any user's name in posts or comments to visit their profile
- **News Feed**: Scrollable feed with posts from users
- **Post Creation**: Create new posts with text content
- **Interactive Posts**: Like posts and leave comments with real-time updates
- **Comment System**: Add comments and like individual comments
- **Data Persistence**: All data stored in PostgreSQL database
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Social network-inspired interface with clean, modern styling

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Custom styling with modern social network design system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Docker** - Containerization for easy deployment

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Docker and Docker Compose (recommended)
- PostgreSQL (if running without Docker)

### Quick Start with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-network
   ```

2. **Development Mode**: Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. Open your browser and visit:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001/api`
   - Database: `localhost:5432`

4. **Create an account** or use sample data to start exploring!

### Manual Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-network
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Set up PostgreSQL database and create `.env` file based on `.env.example`

5. Start the services:
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend (Next.js)
   npm run dev
   ```

### Docker Installation (Alternative)

If you prefer to use Docker, you can run the application using Docker Compose:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-network
   ```

2. **Development Mode**: Build and start the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Open your browser and visit `http://localhost:3000`

**Production Mode**: For a production build with Nginx:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
Then visit `http://localhost:80`

**Useful Docker Commands**:
```bash
# Stop the application
docker-compose down

# Rebuild the Docker image
docker-compose build --no-cache

# View logs
docker-compose logs -f

# Run in background (detached mode)
docker-compose up -d
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Docker Scripts
- `npm run docker:build` - Build the Docker image
- `npm run docker:up` - Start the Docker containers
- `npm run docker:dev` - Build and start containers (development)
- `npm run docker:down` - Stop and remove Docker containers
- `npm run docker:logs` - View container logs

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with profile access
│   ├── PostCreator.jsx     # Post creation component
│   ├── Post.jsx            # Individual post component with user navigation
│   ├── Comment.jsx         # Comment component with clickable authors
│   └── AppContent.tsx      # Main app content with page routing
├── pages/
│   ├── NewsFeed.jsx        # Main news feed page
│   ├── Profile.jsx         # User profile page (own and others)
│   ├── Login.jsx           # User login page
│   └── Register.jsx        # User registration page
├── contexts/
│   └── AuthContext.jsx     # Authentication context
├── services/
│   └── api.js              # API service functions
└── app/                    # Next.js App Router
    ├── layout.tsx          # Root layout
    ├── page.tsx            # Home page
    └── globals.css         # Global styles
```

## Features in Detail

### User Profiles
- **Personal Profile Page**: View your own profile with all your posts and information
- **Profile Customization**: Edit profile information, bio, and profile pictures
- **Cover Photos**: Add and customize cover photos for your profile
- **Profile Navigation**: Seamless navigation between your profile and the news feed
- **Other Users' Profiles**: View other users' profiles by clicking their names
- **Social Actions**: Follow other users and send them messages (UI ready)
- **Profile Stats**: View post count, join date, and profile visibility settings

### News Feed
- Displays a list of posts in chronological order
- Supports infinite scrolling (can be extended)
- Responsive layout that adapts to different screen sizes
- **Interactive Navigation**: Click on any user's name to visit their profile

### Post Creation
- Expandable post composer
- Support for text content
- Real-time character validation
- Placeholder actions for photos, feelings, and check-ins

### Post Interactions
- Like/unlike functionality with visual feedback
- Comment system with threaded replies
- **User Navigation**: Click on post authors or comment authors to view their profiles
- Share functionality (UI ready, can be extended)
- Timestamp display with relative time formatting

### Comments
- Add new comments to posts
- Like individual comments
- **Clickable Authors**: Click on comment authors to navigate to their profiles
- Display comment author and timestamp
- Responsive comment layout

## Navigation and User Experience

### Profile Navigation
- **Header Navigation**: Click the profile icon in the header to access your own profile
- **Home Navigation**: Click the home icon to return to the news feed
- **User Discovery**: Click on any user's name in posts or comments to view their profile
- **Seamless Routing**: Smooth navigation between profiles and feed without page refreshes

### Interactive Elements
- **Clickable Names**: All user names are clickable and styled with modern blue color
- **Hover Effects**: Visual feedback when hovering over clickable elements
- **Responsive Design**: All navigation works perfectly on mobile and desktop devices

### Profile Features
- **Own Profile View**: Edit profile information, view all your posts
- **Other Users' Profiles**: Follow users, send messages (UI implemented)
- **Profile Customization**: Cover photos, profile pictures, bio editing
- **Social Actions**: Follow/unfollow functionality and messaging (ready for backend implementation)

## Customization

The application uses a modular CSS approach where each component has its own stylesheet. You can easily customize:

- **Colors**: Modify the CSS custom properties in `index.css`
- **Layout**: Adjust component-specific styles in individual CSS files
- **Icons**: Replace Lucide React icons with your preferred icon library
- **Data**: Replace mock data with real API calls

## Future Enhancements

- Image and video upload support for posts and profiles
- Real-time notifications and messaging system
- Advanced news feed algorithm and filtering
- Friend system with mutual connections
- Dark mode support
- Progressive Web App (PWA) features
- Story/status update functionality
- Group creation and management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern social media user interface and interaction patterns
- Built with modern React best practices
- Uses Vite for an enhanced development experience
