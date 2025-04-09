import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Zap,
  Activity, 
  Sparkles,
  Play,
  Square,
  Timer
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SprintData {
  number: number;
  time: number;
}

type TimerStatus = 'ready' | 'running' | 'resting';

const RECOVERY_TIME = 60; // 60 seconds recovery time

const SprintTimer: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [recoveryTimer, setRecoveryTimer] = useState(RECOVERY_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [sprintNumber, setSprintNumber] = useState(1);
  const [sprints, setSprints] = useState<SprintData[]>([]);
  const [status, setStatus] = useState<TimerStatus>('ready');
  const timerRef = useRef<number | null>(null);
  const recoveryRef = useRef<number | null>(null);
  const { toast } = useToast();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatRecoveryTime = (time: number): string => {
    return `${time}s`;
  };

  const startTimer = () => {
    if (isRecovering) return;

    setIsRunning(true);
    setStatus('running');
    const startTime = Date.now() - timer;
    
    toast({
      title: "Sprint started!",
      description: "Timer is running",
    });

    timerRef.current = window.setInterval(() => {
      setTimer(Date.now() - startTime);
    }, 10);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isRunning) {
      const newSprint = { number: sprintNumber, time: timer };
      setSprints([...sprints, newSprint]);

      toast({
        title: "Sprint completed!",
        description: `Time: ${formatTime(timer)}`,
      });

      setIsRecovering(true);
      setStatus('resting');
      setRecoveryTimer(RECOVERY_TIME);
      setIsRunning(false);

      recoveryRef.current = window.setInterval(() => {
        setRecoveryTimer(prev => {
          if (prev <= 1) {
            if (recoveryRef.current) {
              clearInterval(recoveryRef.current);
              recoveryRef.current = null;
            }
            setIsRecovering(false);
            setStatus('ready');
            setSprintNumber(prevNumber => prevNumber + 1);
            setTimer(0);

            toast({
              title: "Recovery complete!",
              description: "Ready for next sprint",
            });

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recoveryRef.current) {
      clearInterval(recoveryRef.current);
      recoveryRef.current = null;
    }
    setTimer(0);
    setIsRunning(false);
    setIsRecovering(false);
    setStatus('ready');
    setSprintNumber(1);
    setSprints([]);
  };

  useEffect(() => {
    let recognition: any = null;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          
          if (event.results[i].isFinal) {
            console.log('Voice command detected:', transcript);
            
            if (transcript.includes('start') && !isRunning && !isRecovering) {
              startTimer();
            } else if ((transcript.includes('stop') || transcript.includes('end')) && isRunning) {
              stopTimer();
            }
          }
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice recognition error",
          description: "Please try again or use the buttons",
          variant: "destructive"
        });
      };
      
      try {
        recognition.start();
        console.log('Voice recognition started');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else {
      console.warn('Speech recognition not supported in this browser');
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support speech recognition. Please use the buttons instead.",
        variant: "destructive"
      });
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recoveryRef.current) {
        clearInterval(recoveryRef.current);
      }
    };
  }, [isRunning, isRecovering]);

  const buttonConfig = {
    text: isRunning ? 'STOP' : 'START',
    action: isRunning ? stopTimer : startTimer,
    bgColor: isRunning ? 'bg-marinovich-pink' : 'bg-marinovich-blue',
    disabled: isRecovering
  };

  const getStatusClass = () => {
    switch(status) {
      case 'ready': return 'text-marinovich-blue';
      case 'running': return 'text-marinovich-pink animate-pulse';
      case 'resting': return 'text-marinovich-purple';
      default: return '';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'ready': return 'Ready';
      case 'running': return 'Running';
      case 'resting': return `Resting (${formatRecoveryTime(recoveryTimer)})`;
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-marinovich-yellow to-marinovich-yellow/80 cartoon-border cartoon-shadow rounded-[2rem] p-6">
        <Brain 
          className="absolute top-4 left-4 text-marinovich-pink" 
          size={40} 
          strokeWidth={2} 
        />
        <Sparkles 
          className="absolute top-4 right-4 text-marinovich-yellow" 
          size={40} 
          strokeWidth={2} 
        />
        
        <div className="mb-4 bg-marinovich-purple cartoon-border rounded-3xl p-4">
          <h1 className="text-marinovich-cream font-bold text-2xl md:text-3xl text-center -rotate-1">
            MARINOVICH
          </h1>
          <h1 className="text-marinovich-cream font-bold text-2xl md:text-3xl text-center rotate-1">
            SPRINT TEST
            <Zap className="inline-block ml-2 text-marinovich-yellow" size={24} />
          </h1>
        </div>
        
        <div className="bg-marinovich-cream cartoon-border p-4 mb-4">
          <div className="bg-marinovich-yellow cartoon-border p-2 mb-4">
            <h2 className={`text-marinovich-pink font-bold text-5xl md:text-6xl time-display text-center ${isRunning ? 'animate-pulse' : ''}`}>
              {formatTime(timer)}
            </h2>
          </div>
          
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-marinovich-brown font-bold text-lg">SPRINT</p>
              <p className="text-marinovich-brown font-bold text-2xl">{sprintNumber}</p>
            </div>
            
            <div className="h-full w-[2px] bg-marinovich-brown mx-2"></div>
            
            <div className="text-center">
              <p className="text-marinovich-brown font-bold text-lg">STATUS</p>
              <p className={`font-bold text-2xl ${getStatusClass()}`}>
                {getStatusText()}
              </p>
            </div>

            <div className="h-full w-[2px] bg-marinovich-brown mx-2"></div>
            
            <div className="text-center">
              <p className="text-marinovich-brown font-bold text-lg">COMPLETED</p>
              <p className="text-marinovich-brown font-bold text-2xl">{sprints.length}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={buttonConfig.action}
          disabled={buttonConfig.disabled}
          className={`w-full cartoon-border ${buttonConfig.bgColor} py-4 text-marinovich-cream font-bold text-3xl ${isRecovering ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-1 transition-transform'}`}
        >
          {buttonConfig.text}
          {isRunning ? 
            <Square className="inline-block ml-2" size={24} /> : 
            <Play className="inline-block ml-2" size={24} fill="currentColor" />
          }
        </button>
        
        <Zap className="absolute bottom-12 left-0 -translate-x-1/2 text-marinovich-yellow" size={30} />
        <Zap className="absolute bottom-24 right-0 translate-x-1/2 text-marinovich-yellow" size={30} />
        <Activity className="absolute bottom-36 left-0 -translate-x-1/3 text-marinovich-blue" size={30} />
        <Timer className="absolute bottom-36 right-0 translate-x-1/3 text-marinovich-pink" size={30} />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-marinovich-brown text-sm">
          Voice commands: Say "start" to begin, "stop" to end a sprint
        </p>
        {sprints.length > 0 && (
          <button 
            onClick={resetTimer} 
            className="mt-4 px-4 py-2 bg-marinovich-pink text-white rounded-full hover:bg-marinovich-pink/80 transition"
          >
            Reset All
          </button>
        )}
      </div>
      
      {sprints.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <details className="cartoon-border p-4 bg-marinovich-cream">
            <summary className="font-bold text-marinovich-brown cursor-pointer">
              Sprint History ({sprints.length})
            </summary>
            <ul className="mt-2">
              {sprints.map((sprint, index) => (
                <li key={index} className="py-1 border-b border-marinovich-brown/20 flex justify-between">
                  <span>Sprint {sprint.number}</span>
                  <span className="font-bold">{formatTime(sprint.time)}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
};

export default SprintTimer;
