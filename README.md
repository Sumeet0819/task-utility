# 🚀 Rocket Task - AI Powered Utility

Rocket Task is a premium, AI-driven productivity utility designed to streamline common text-based workflows. Whether you're drafting emails, analyzing complex data, or rephrasing messages for clarity, Rocket Task uses Google's Gemini AI to provide instant, high-quality variants.

![Rocket Task Preview](https://via.placeholder.com/1200x600/1c1c1c/9712c0?text=Rocket+Task+AI+Utility)

## ✨ Features

- **Multi-Mode Generation**: Switch between specialized modes for tailored AI outputs:
  - 📧 **Email**: Draft professional emails and subject lines.
  - 📊 **Analysis**: Generate deep analytical insights and reasoning.
  - 💬 **Message**: Create natural conversational replies for chat apps.
  - 🔄 **Rephrase**: Find better ways to express your thoughts.
  - 📝 **Title**: Capture core actions in concise task titles.
  - ⚠️ **Issue**: Structure clear bug reports or issue descriptions.
  - 🏁 **Conclusion**: Summarize key takeaways effortlessly.
- **Glassmorphism UI**: A sleek, modern interface with frosted glass effects and smooth animations.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Privacy First**: Your Gemini API key is stored locally in your browser, never on a server.

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **AI Engine**: Google Gemini AI (`@google/genai`)
- **Icons**: [Remix Icons](https://remixicon.com/)
- **Styling**: Vanilla CSS with modern flexbox/grid and glassmorphism.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rocket-task.git
   cd rocket-task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Setup API Key

1. Open the app in your browser.
2. Click the **API Key** button in the top-right header.
3. Paste your Gemini API key and click **Save**.
4. You're ready to start generating!

## 📂 Folder Structure

- `src/components`: UI components (Header, Input, VariantsDisplay).
- `src/services`: AI logic and integration with Google Gemini.
- `src/assets`: Static assets and global styles.

## 📜 License

Created by [rocket.dev](https://rocket.dev). For personal or enterprise productivity.
