
# Marinovich Sprint Timer

![Marinovich Sprint Timer](https://img.shields.io/badge/Sprint%20Timer-v1.0-blue)

A reactive web application for tracking high-intensity sprints with automated recovery periods, designed for athletes and coaches implementing the Marinovich training methodology.

## 🚀 Features

- **Interactive Sprint Timer**: Start and stop sprint timers with millisecond precision
- **Automated Recovery Tracking**: 60-second recovery countdown between sprints
- **Voice Control**: Hands-free operation with voice commands ("start", "stop")
- **Sprint History**: Keeps track of all completed sprints in a session
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Visual Feedback**: Clear status indicators and progress tracking

## 📋 How It Works

1. **Start a Sprint**: Click the START button or say "start" to begin timing a sprint
2. **End a Sprint**: Click the STOP button or say "stop" to end the current sprint
3. **Recovery Period**: A 60-second recovery countdown begins automatically
4. **Next Sprint**: After recovery, the timer resets and is ready for the next sprint
5. **View History**: Expand the Sprint History section to review all completed sprints

## 🎯 Use Cases

- **Speed Training**: Time short bursts of maximum effort sprints
- **HIIT Workouts**: Perfect for high-intensity interval training
- **Sports Conditioning**: Implement structured sprint/recovery protocols
- **Performance Tracking**: Monitor sprint times over multiple sessions

## 🧠 Voice Command Reference

- Say **"start"** to begin a sprint
- Say **"stop"** or **"end"** to complete a sprint

## 💻 Technical Implementation

Built with modern web technologies:

- **React**: Component-based UI architecture
- **TypeScript**: Type-safe JavaScript for reliable code
- **Tailwind CSS**: Utility-first styling for responsive design
- **Web Speech API**: Browser-based voice recognition

## 🔧 Browser Compatibility

The voice recognition feature uses the Web Speech API which is supported in:
- Chrome (desktop & Android)
- Edge
- Safari (partial support)
- Firefox (may require enabling experimental features)

For browsers without speech recognition support, the button interface works universally.

## ⚡ The Marinovich Method

This timer is inspired by training methodologies focused on:
- Short, maximum-effort sprints
- Structured recovery periods
- Progressive performance tracking
- Optimizing power output and recovery

## 🚦 Getting Started

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📈 Future Enhancements

- User accounts for saving session history
- Custom recovery time settings
- Export/sharing of sprint data
- Audio cues and countdown sounds

---

Made with ❤️ using React + TypeScript
