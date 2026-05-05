# JobTrack Pro

JobTrack Pro is a high-performance, full-stack ready job application tracking platform designed for modern career seekers. It solves the complexity of managing multiple application pipelines with an intuitive, AI-enhanced interface.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, ShadCN UI
- **AI Integration**: Custom GenAI flows for intelligent application assistance
- **Icons**: Lucide React
- **Charts**: Recharts

## Core Features
- **Secure Authentication**: Mock role-based access control (Admin/Viewer) ready for Firebase integration.
- **Full CRUD**: Manage your applications with a comprehensive entry system.
- **AI Career Assistant**: Get status-aware suggestions and follow-up drafts using GenAI.
- **Visual Dashboard**: Real-time analytics on your application status distribution.
- **Dynamic List**: Search, filter, and sort your applications with optimized debounced performance.
- **Responsive & Modern UI**: Tailored for both mobile and desktop with a custom 'Space Grotesk' & 'Inter' font pairing.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd job-track-pro
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the app**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/store`: Redux slices and setup.
- `src/components/layout`: Dashboard and Sidebar layouts.
- `src/components/dashboard`: Analytics and Summary components.
- `src/components/applications`: Form and Table components.
- `src/ai/flows`: Intelligent GenAI flow implementations.

## Deployment
This project is ready for deployment on Vercel or Netlify. Simply connect your GitHub repository and follow the standard Next.js build steps.