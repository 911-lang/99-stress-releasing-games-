import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RefreshCcw, Heart, Droplet, Zap, Maximize2, X, Sun, Moon, Volume2, Music4 } from 'lucide-react';

// --- Utility: List of 99 Stress Relief Game Concepts ---
const gameConcepts = Array.from({ length: 99 }, (_, i) => {
    const gameId = i + 1;
    let title, icon, category, isPlayable = false;

    if (gameId === 1) {
        title = "4-7-8 Breathing Guide";
        icon = <Heart className="w-6 h-6" />;
        category = "Meditation";
        isPlayable = true;
    } else if (gameId === 2) {
        title = "Infinite Tapper";
        icon = <Droplet className="w-6 h-6" />;
        category = "Focus";
        isPlayable = true;
    } else if (gameId === 3) {
        title = "Gentle Tones";
        icon = <Volume2 className="w-6 h-6" />;
        category = "Sound Therapy";
        isPlayable = true;
    } else if (gameId === 99) {
        title = "The Last Laugh";
        icon = <Zap className="w-6 h-6" />;
        category = "Humor";
    } else {
        const categories = ["Focus", "Color", "Tapping", "Visual", "Sound", "Puzzle"];
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        title = `Zen Game ${gameId} - ${randomCat} Focus`;
        icon = <Maximize2 className="w-6 h-6" />;
        category = randomCat;
    }

    return { id: gameId, title, icon, category, isPlayable };
});

// --- Game 1: 4-7-8 Breathing Guide ---

const BreathingGuide = ({ onBack }) => {
    const [phase, setPhase] = useState('Breathe In');
    const [isAnimating, setIsAnimating] = useState(false);
    const [instruction, setInstruction] = useState("Tap to Start");

    useEffect(() => {
        let timer;
        let startCycle = 0;

        if (isAnimating) {
            const cycle = () => {
                // Inhale (4s)
                setPhase('Breathe In (4)');
                setInstruction("Inhale deeply...");
                timer = setTimeout(() => {
                    // Hold (7s)
                    setPhase('Hold (7)');
                    setInstruction("Hold your breath...");
                    timer = setTimeout(() => {
                        // Exhale (8s)
                        setPhase('Breathe Out (8)');
                        setInstruction("Exhale slowly and completely...");
                        timer = setTimeout(() => {
                            // Cycle restarts after 8s
                            cycle();
                        }, 8000);
                    }, 7000);
                }, 4000);
            };
            cycle();
        } else {
            setInstruction("Tap to Start");
        }

        return () => clearTimeout(timer);
    }, [isAnimating]);

    const handleToggle = () => {
        setIsAnimating(prev => !prev);
        setPhase(prev => (prev === 'Tap to Start' ? 'Breathe In' : 'Tap to Start'));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">4-7-8 Breathing</h2>
            
            <div 
                className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full cursor-pointer transition-all duration-1000 ease-in-out shadow-2xl ${isAnimating ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-gray-700 shadow-gray-700/50'}`}
                onClick={handleToggle}
                style={{
                    transform: isAnimating && (phase.includes('In') || phase.includes('Hold')) ? 'scale(1.2)' : 'scale(1)',
                    opacity: isAnimating && phase.includes('Out') ? 0.7 : 1,
                    animation: isAnimating ? 'breathe-animation 19s infinite linear' : 'none',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-4xl font-light select-none">{phase.split('(')[0]}</p>
                </div>
            </div>

            <style>{`
                @keyframes breathe-animation {
                    0% { box-shadow: 0 0 0 0 rgba(100, 116, 139, 0.7); }
                    50% { box-shadow: 0 0 50px 10px rgba(167, 139, 250, 0.9); }
                    100% { box-shadow: 0 0 0 0 rgba(100, 116, 139, 0.7); }
                }
            `}</style>
            
            <p className="mt-8 text-xl text-gray-300 h-8">{instruction}</p>
            <button 
                onClick={onBack} 
                className="mt-10 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-colors flex items-center shadow-lg"
            >
                <X className="w-5 h-5 mr-2" /> Back to Hub
            </button>
        </div>
    );
};

// --- Game 2: Infinite Tapper (Bubble Pop) ---

const InfiniteTapper = ({ onBack }) => {
    const [taps, setTaps] = useState(0);

    const handleTap = (e) => {
        setTaps(prev => prev + 1);
        
        // Create a visual bubble/splash effect at the tap location
        const container = e.currentTarget.getBoundingClientRect();
        const splash = document.createElement('div');
        splash.className = 'absolute bg-blue-400 rounded-full opacity-70 animate-splash pointer-events-none';
        
        splash.style.width = '30px';
        splash.style.height = '30px';
        splash.style.left = `${e.clientX - container.left - 15}px`;
        splash.style.top = `${e.clientY - container.top - 15}px`;

        e.currentTarget.appendChild(splash);

        setTimeout(() => {
            splash.remove();
        }, 800);
    };

    return (
        <div className="flex flex-col items-center h-full p-4 relative">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">Infinite Tapper</h2>
            <p className="text-gray-300 mb-4">Just tap, tap, tap. No goals, just relaxation.</p>

            <div 
                className="flex-grow w-full bg-gray-900 rounded-xl overflow-hidden relative cursor-crosshair active:cursor-grabbing"
                onMouseDown={handleTap}
                onTouchStart={handleTap}
            >
                <div className="absolute top-4 left-4 bg-gray-700/80 p-3 rounded-xl text-xl font-mono shadow-inner">
                    Taps: {taps}
                </div>
                {/* CSS for splash animation */}
                <style>{`
                    @keyframes splash {
                        0% { transform: scale(0.5); opacity: 0.8; }
                        100% { transform: scale(2.5); opacity: 0; }
                    }
                    .animate-splash {
                        animation: splash 0.8s ease-out forwards;
                    }
                `}</style>
            </div>

            <button 
                onClick={onBack} 
                className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-colors flex items-center shadow-lg"
            >
                <X className="w-5 h-5 mr-2" /> Back to Hub
            </button>
        </div>
    );
};

// --- Game 3: Gentle Tones (Sound Generator) ---

const GentleTones = ({ onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFrequency, setCurrentFrequency] = useState(440); // A4
    const [audioContext, setAudioContext] = useState(null);
    const [oscillator, setOscillator] = useState(null);
    const [gainNode, setGainNode] = useState(null);

    // Initialize Audio Context on first play attempt
    const initAudio = useCallback(() => {
        if (audioContext) return;
        const newContext = new (window.AudioContext || window.webkitAudioContext)();
        const newGainNode = newContext.createGain();
        newGainNode.connect(newContext.destination);
        newGainNode.gain.setValueAtTime(0.5, newContext.currentTime); // Set volume
        
        setAudioContext(newContext);
        setGainNode(newGainNode);
    }, [audioContext]);

    // Start or stop the oscillator
    const toggleTone = useCallback(() => {
        if (!audioContext) {
            initAudio();
            // Wait for context to be set before calling toggleTone again in useEffect
            return;
        }

        if (isPlaying) {
            // Stop
            if (oscillator) {
                oscillator.stop();
                setOscillator(null);
            }
            setIsPlaying(false);
        } else {
            // Start
            const newOscillator = audioContext.createOscillator();
            newOscillator.type = 'sine'; // Sine wave is soothing
            newOscillator.frequency.setValueAtTime(currentFrequency, audioContext.currentTime);
            newOscillator.connect(gainNode);
            newOscillator.start();
            setOscillator(newOscillator);
            setIsPlaying(true);
        }
    }, [isPlaying, audioContext, currentFrequency, gainNode, oscillator, initAudio]);

    // Update frequency if the slider changes
    useEffect(() => {
        if (oscillator && audioContext) {
            oscillator.frequency.setValueAtTime(currentFrequency, audioContext.currentTime);
        }
    }, [currentFrequency, oscillator, audioContext]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (oscillator) {
                oscillator.stop();
            }
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [oscillator, audioContext]);
    
    // Auto-start after context is initialized
    useEffect(() => {
        if (audioContext && !isPlaying) {
            toggleTone();
        }
    }, [audioContext]);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-green-400">Gentle Tones</h2>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-sm">
                <p className="text-xl mb-4 text-center">Frequency: <span className="font-mono text-yellow-400">{currentFrequency.toFixed(0)} Hz</span></p>
                
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="1"
                    value={currentFrequency}
                    onChange={(e) => setCurrentFrequency(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-green-500"
                />

                <button
                    onClick={toggleTone}
                    className={`mt-8 w-full py-3 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isPlaying ? <Music4 className="w-6 h-6 mr-2" /> : <Volume2 className="w-6 h-6 mr-2" />}
                    {isPlaying ? 'Stop Tone' : 'Start Tone'}
                </button>
            </div>

            <p className="mt-6 text-sm text-gray-400">Low frequencies (100-300 Hz) are typically more calming.</p>
            
            <button 
                onClick={onBack} 
                className="mt-10 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-colors flex items-center shadow-lg"
            >
                <X className="w-5 h-5 mr-2" /> Back to Hub
            </button>
        </div>
    );
};


// --- Game Card Component ---
const GameCard = ({ game, onClick }) => (
    <div
        className={`p-4 rounded-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full ${
            game.isPlayable 
                ? 'bg-gray-700 hover:bg-indigo-500 hover:shadow-xl shadow-lg border-2 border-indigo-500/50' 
                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
        }`}
        onClick={() => game.isPlayable && onClick(game.id)}
    >
        <div className={`p-3 rounded-full mb-3 ${game.isPlayable ? 'bg-indigo-400 text-gray-900' : 'bg-gray-600 text-gray-300'}`}>
            {game.icon}
        </div>
        <h3 className="text-sm font-semibold mb-1 leading-tight text-white">{game.title}</h3>
        <p className="text-xs text-gray-400 uppercase">{game.category}</p>
        {game.isPlayable && <span className="mt-2 text-xs font-bold text-yellow-400">PLAY!</span>}
    </div>
);


// --- Main App Component ---
const App = () => {
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleSelectGame = useCallback((id) => {
        setSelectedGameId(id);
    }, []);

    const handleBack = useCallback(() => {
        setSelectedGameId(null);
    }, []);

    const renderGame = useMemo(() => {
        if (!selectedGameId) return null;

        switch (selectedGameId) {
            case 1:
                return <BreathingGuide onBack={handleBack} />;
            case 2:
                return <InfiniteTapper onBack={handleBack} />;
            case 3:
                return <GentleTones onBack={handleBack} />;
            default:
                const game = gameConcepts.find(g => g.id === selectedGameId);
                return (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <h2 className="text-3xl font-bold mb-4 text-pink-400">{game.title}</h2>
                        <p className="text-xl mb-8 text-gray-300">This game is conceptual. Feel free to explore the fully functional games!</p>
                        <button 
                            onClick={handleBack} 
                            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-colors flex items-center shadow-lg"
                        >
                            <X className="w-5 h-5 mr-2" /> Back to Hub
                        </button>
                    </div>
                );
        }
    }, [selectedGameId, handleBack]);

    const headerContent = (
        <div className={`p-4 md:p-6 shadow-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-2xl font-extrabold transition-colors ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {selectedGameId ? 'Mini Game Mode' : '99 Stress Relief Hub'}
            </h1>
            <div className='flex items-center space-x-4'>
                <button
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-yellow-400 bg-gray-700 hover:bg-gray-600' : 'text-gray-800 bg-gray-200 hover:bg-gray-300'}`}
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                {selectedGameId && (
                    <button
                        onClick={handleBack}
                        className="p-2 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center"
                    >
                        <RefreshCcw className="w-4 h-4 mr-1" /> Reset
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors`}>
            {headerContent}
            
            <main className={`p-4 md:p-8 flex justify-center items-start ${selectedGameId ? 'h-[calc(100vh-80px)]' : ''}`}>
                <div className="w-full h-full max-w-6xl">
                    {selectedGameId ? (
                        // Game View
                        <div className={`rounded-xl shadow-2xl h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex justify-center items-center`}>
                            {renderGame}
                        </div>
                    ) : (
                        // Dashboard View
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4">
                            {gameConcepts.map(game => (
                                <GameCard 
                                    key={game.id} 
                                    game={game} 
                                    onClick={handleSelectGame}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;

