# 💰 Spendture Website

> **Choose Spendture, Make your money venture.**

The official website for Spendture - a comprehensive financial management platform designed to help users track, manage, and optimize their spending with intelligent insights and real-time analytics.

## 🚀 Live Website

**[Visit Spendture](https://www.spendture.com)**

## ✨ Website Features

### 🎯 Core Website Functionality
- **Pre-launch Landing Page** - Engaging waitlist signup experience
- **Interactive Waitlist System** - Google Sheets integration for data collection
- **Real-time Visitor Tracking** - Analytics and user behavior insights
- **Social Sharing Integration** - Twitter, LinkedIn, WhatsApp, Facebook, Instagram
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - User preference support with smooth transitions

### 🎨 User Experience
- **Full-screen Confetti Celebrations** - Engaging signup confirmations
- **Live Activity Feed** - Real-time user signup notifications
- **Smooth Animations** - Framer Motion powered interactions
- **Loading States** - Skeleton loaders and progress indicators
- **Error Handling** - Graceful error states and user feedback

### 📊 Analytics & Data Collection
- **Visitor Tracking** - IP, location, referrer, and device information
- **Waitlist Management** - Name, email, age, and location collection
- **Google Sheets Integration** - Real-time data storage and management
- **Admin Dashboard** - Visitor and waitlist data visualization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful and consistent icons
- **React Router** - Client-side routing

### Backend & APIs
- **Vercel Serverless Functions** - API endpoints
- **Node.js** - Server runtime environment
- **Google Sheets API** - Data storage and management
- **Google Cloud Service Account** - Secure API authentication

### Deployment & Infrastructure
- **Vercel** - Frontend hosting and serverless functions
- **GitHub** - Version control and CI/CD
- **Google Cloud** - Service account and API integration
- **Custom Domain** - Professional branding

## 🏗️ Project Structure

```
spendture-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, cards, etc.)
│   │   ├── ConfettiCelebration.tsx
│   │   ├── LiveActivityFeed.tsx
│   │   ├── WaitlistSection.tsx
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── Index.tsx       # Main landing page
│   │   ├── WaitlistConfirmation.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useBackend.ts   # API integration
│   │   └── useScrollAnimation.ts
│   └── lib/                # Utility functions
├── api/                    # Vercel serverless functions
│   ├── waitlist.js        # Waitlist signup endpoint
│   ├── track-visitor.js   # Visitor tracking endpoint
│   ├── visitors.js        # Get visitors data
│   └── test.js           # API health check
├── public/                # Static assets
│   ├── favicon.ico
│   ├── spendture-og.png
│   └── ...
└── vercel.json           # Deployment configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Service Account (for Sheets integration)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adilsukumar/Spendture_Website.git
   cd Spendture_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file with your Google Sheets credentials
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="your_private_key"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to see the website.

### Deployment

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add the same environment variables from your .env file

## 📈 Website Analytics & Features

- **🎉 Interactive Confetti** - Full-screen celebrations on waitlist signup
- **📱 Social Sharing** - Multi-platform sharing with custom formatting
- **🔔 Real-time Notifications** - Live activity feed with user signups
- **📊 Google Sheets Integration** - Seamless data collection and management
- **🔒 Privacy-First** - GDPR compliant data handling
- **⚡ Performance Optimized** - Fast loading with Vite and Vercel
- **📱 Mobile Responsive** - Perfect experience on all devices

## 🌟 Key Website Highlights

1. **Engaging Pre-launch Experience** - Interactive waitlist with gamification
2. **Real-time Data Collection** - Visitor tracking and analytics
3. **Social Sharing Integration** - Easy referral system
4. **Professional Design** - Modern, clean, and trustworthy appearance
5. **Performance Optimized** - Fast loading and smooth interactions

## 📱 Supported Devices

- **Desktop** - All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile** - iOS Safari, Android Chrome, responsive design
- **Tablet** - iPad, Android tablets, optimized layouts

## 🔐 Security & Privacy

- **Secure API Endpoints** - Vercel serverless functions
- **Environment Variables** - Secure credential management
- **HTTPS Only** - SSL encryption for all traffic
- **Data Protection** - Minimal data collection, secure storage
- **Google Sheets Security** - Service account authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Spendture Pvt. Ltd. All rights reserved. See the [LICENSE](LICENSE) file for details.

**⚠️ IMPORTANT:** This software is protected by copyright and proprietary license. Unauthorized copying, distribution, or use is strictly prohibited and will result in legal action.

## 📞 Contact & Support

- **Website**: [www.spendture.com](https://www.spendture.com)
- **Email**: [official.spendture@gmail.com](mailto:official.spendture@gmail.com)
- **Twitter**: [@Spendture](https://twitter.com/spendture)
- **LinkedIn**: [@Spendture Pvt. Ltd.](https://linkedin.com/company/spendture)

## 🙏 Acknowledgments

- **Design Inspiration** - Modern SaaS landing pages
- **Icons** - Lucide React icon library
- **Animations** - Framer Motion community
- **Deployment** - Vercel platform
- **Analytics** - Google Sheets API

---

**Made with ❤️ for the web**

*Choose Spendture, Make your money venture.*

---

© 2025 Spendture Pvt. Ltd. All rights reserved.