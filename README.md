# APP LINK -> https://mock-interview-platform-sand.vercel.app/

# AI-Powered Mock Interview Platform

A modern, responsive web application that provides AI-driven mock interviews to help users prepare for their job interviews. The platform uses voice-based interactions powered by Vapi AI and provides real-time feedback.

## 🚀 Features

- **AI-Powered Interviews**: Conduct realistic mock interviews using Vapi AI voice agent
- **User Authentication**: Secure sign-in and sign-up functionality
- **Responsive Design**: Beautiful and responsive UI that works on all devices
- **Real-time Feedback**: Get instant feedback on your interview performance
- **Modern UI/UX**: Clean and intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: 
  - Next.js 
  - React 
  - Tailwind CSS
  - Radix UI Components
  - React Hook Form for form handling

- **Backend**:
  - Firebase (Authentication & Database)
  

- **AI Integration**:
  - Vapi AI for voice interactions
  - Google AI SDK

## 📦 Installation



2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Firebase and Vapi AI credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
VAPI_API_KEY=your_vapi_api_key
```

4. Run the development server:
```bash
npm run dev
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🔧 Configuration

The project uses several key configurations:

- **Tailwind CSS**: For styling and responsive design
- **ESLint**: For code quality and consistency
- **TypeScript**: For type safety and better development experience


