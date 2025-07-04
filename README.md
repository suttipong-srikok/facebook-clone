# Facebook Clone

A modern React application that replicates Facebook's core functionality, built with Vite for optimal development experience.

## Features

- **News Feed**: Scrollable feed with posts from users
- **Post Creation**: Create new posts with text content
- **Interactive Posts**: Like posts and leave comments
- **Comment System**: Add comments and like individual comments
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Facebook-inspired interface with clean, modern styling

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Custom styling with Facebook-inspired design system

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd facebook-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── PostCreator.jsx     # Post creation component
│   ├── Post.jsx            # Individual post component
│   └── Comment.jsx         # Comment component
├── pages/
│   └── NewsFeed.jsx        # Main news feed page
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## Features in Detail

### News Feed
- Displays a list of posts in chronological order
- Supports infinite scrolling (can be extended)
- Responsive layout that adapts to different screen sizes

### Post Creation
- Expandable post composer
- Support for text content
- Real-time character validation
- Placeholder actions for photos, feelings, and check-ins

### Post Interactions
- Like/unlike functionality with visual feedback
- Comment system with threaded replies
- Share functionality (UI ready, can be extended)
- Timestamp display with relative time formatting

### Comments
- Add new comments to posts
- Like individual comments
- Display comment author and timestamp
- Responsive comment layout

## Customization

The application uses a modular CSS approach where each component has its own stylesheet. You can easily customize:

- **Colors**: Modify the CSS custom properties in `index.css`
- **Layout**: Adjust component-specific styles in individual CSS files
- **Icons**: Replace Lucide React icons with your preferred icon library
- **Data**: Replace mock data with real API calls

## Future Enhancements

- User authentication and profiles
- Image and video upload support
- Real-time notifications
- Friend system and messaging
- News feed algorithm
- Dark mode support
- Progressive Web App (PWA) features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Facebook's user interface and interaction patterns
- Built with modern React best practices
- Uses Vite for an enhanced development experience
