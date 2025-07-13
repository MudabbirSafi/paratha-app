# Paratha Ordering App

A modern food ordering app built with Expo and React Native, featuring a complete checkout flow with multiple payment methods.

## Features

- 🍽️ **Food Menu** - Browse delicious parathas and other items
- 🛒 **Shopping Cart** - Add items and manage quantities
- 💳 **Checkout Flow** - Complete checkout with multiple payment methods:
  - Credit/Debit Card
  - UPI Payment
  - Cash on Delivery
- 🎨 **Modern UI** - Beautiful design with dark/light theme support
- 📱 **Cross Platform** - Works on iOS, Android, and Web

## Tech Stack

- **Framework**: Expo with React Native
- **Navigation**: Expo Router
- **State Management**: Zustand
- **UI Components**: Custom components with theme support
- **Styling**: React Native StyleSheet with theme system

## Getting Started

### Prerequisites

- Node.js 20+ (required for latest Expo CLI)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd paratha-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Building for Web

```bash
npm run build:web
```

## Deployment

### Netlify Deployment

This app is configured for easy deployment to Netlify:

1. **Connect to Netlify**:

   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Netlify will automatically detect the build settings

2. **Build Settings** (automatically configured):

   - Build Command: `npm run build:web`
   - Publish Directory: `dist`
   - Node Version: 20 (set in netlify.toml)

3. **Manual Deployment**:

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

### Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration purposes.

## Project Structure

```
paratha-app/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── checkout/          # Checkout flow
│   └── auth/              # Authentication screens
├── components/            # Reusable UI components
├── store/                 # Zustand stores
├── services/              # API services
├── utils/                 # Utility functions
├── constants/             # App constants and mock data
└── types/                 # TypeScript type definitions
```

## Payment Flow

The app includes a complete checkout flow:

1. **Cart Page** → Add items and click "Checkout"
2. **Checkout Page** → Review order and select payment method
3. **Payment Page** → Choose payment option and complete payment
4. **Success Page** → Order confirmation and next steps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
