# Marinovich Sprint Timer

![Marinovich Sprint Timer](https://img.shields.io/badge/Sprint%20Timer-v1.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.11-38bdf8)

## 🎯 Philosophy & Purpose

![Screenshot 2025-04-14 233236](https://github.com/user-attachments/assets/ac62bc51-b41a-49a4-8eb3-94bcfa97a7fd)

The Marinovich Sprint Timer is built on the training principles of renowned athletic trainer Marv Marinovich. This tool digitizes his proven sprint test protocol, which is designed to:

- **Measure Anaerobic Capacity**: Track an athlete's ability to maintain maximum power output
- **Assess Recovery Efficiency**: Monitor how well athletes recover between high-intensity efforts
- **Track Performance Degradation**: Observe the decline in sprint performance over multiple efforts
- **Build Mental Toughness**: Push athletes to their limits in a structured environment

The test protocol is simple yet demanding:
1. Perform a 100m sprint at maximum effort
2. Rest for exactly 60 seconds
3. Repeat until performance significantly degrades
4. Analyze the results to assess fitness level

## 🚀 Features

- **Precision Sprint Timer**: Millisecond-accurate timing for performance tracking
- **Automated Recovery**: 60-second countdown timer between sprints
- **Voice Control**: Hands-free operation with voice commands
- **Sprint History**: Session-based performance tracking
- **Progressive Web App**: Works offline and can be installed on mobile devices
- **Responsive Design**: Optimized for field use on any device

## 💻 Technical Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4.11
- **State Management**: React Hooks + Context
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation

### Development Tools
- **Package Manager**: npm/bun
- **Type Checking**: TypeScript
- **Linting**: ESLint with TypeScript support
- **Code Formatting**: Prettier
- **Dev Server**: Vite with HMR

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.11",
  "@radix-ui/react-*": "^1.x",
  "lucide-react": "^0.462.0"
}
```

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   └── SprintTimer/ # Main timer implementation
├── hooks/           # Custom React hooks
├── lib/            # Utility functions
├── styles/         # Global styles
└── pages/          # Route components
```

### Key Features Implementation

#### Voice Recognition
```typescript
// Uses Web Speech API for hands-free control
const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
```

#### Timer Precision
```typescript
// High-precision timing using performance.now()
const startTime = performance.now();
const interval = setInterval(() => {
  const elapsed = performance.now() - startTime;
}, 10); // Updates every 10ms
```

## 🚦 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/marinovich-sprint.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Usage

1. **Starting a Sprint**
   - Click START button or say "start"
   - Timer begins with millisecond precision
   - Visual feedback indicates sprint is active

2. **Ending a Sprint**
   - Click STOP button or say "stop"
   - Sprint time is recorded
   - Recovery period begins automatically

3. **Recovery Period**
   - 60-second countdown displays
   - Progress bar shows time remaining
   - Next sprint is blocked until recovery completes

4. **Viewing Results**
   - Expand Sprint History panel
   - Review all sprint times
   - Analyze performance degradation

## 🔧 Browser Support

- **Full Support**: Chrome, Edge, Opera
- **Voice Recognition**: 
  - Chrome (desktop & Android)
  - Edge
  - Safari (partial)
  - Firefox (experimental)

## 🛠️ Development

### Running Tests
```bash
npm run test        # Run unit tests
npm run test:e2e   # Run end-to-end tests
npm run test:ci    # CI pipeline tests
```

### Code Style
```bash
npm run lint       # Check code style
npm run format     # Format code
```
