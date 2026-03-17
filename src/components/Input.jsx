import React, { useState, useEffect, useRef } from "react";
import "./input.css";
import { generateTaskVariants } from "../services/aiService";
import { 
  RiMailLine, 
  RiBarChartLine, 
  RiMessage3Line, 
  RiRefreshLine, 
  RiText, 
  RiErrorWarningLine, 
  RiFlag2Line, 
  RiSparklingLine,
  RiArrowDownSLine,
  RiMicLine,
  RiMicOffLine
} from "@remixicon/react";
import { micService } from "../services/micService";


const Input = ({ setVariants, setIsLoading, isLoading, mode, onModeChange }) => {
  console.log("Input Component Rendered with:", { mode, onModeChangeType: typeof onModeChange });


  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);


  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const modes = [
    { id: 'email', label: 'Email', icon: <RiMailLine size={16} /> },
    { id: 'analysis', label: 'Analysis', icon: <RiBarChartLine size={16} /> },
    { id: 'message', label: 'Message', icon: <RiMessage3Line size={16} /> },
    { id: 'rephrase', label: 'Rephrase', icon: <RiRefreshLine size={16} /> },
    { id: 'title', label: 'Title', icon: <RiText size={16} /> },
    { id: 'issue', label: 'Issue', icon: <RiErrorWarningLine size={16} /> },
    { id: 'conclusion', label: 'Conclusion', icon: <RiFlag2Line size={16} /> },
    { id: 'more', label: 'More coming soon...', disabled: true, icon: <RiSparklingLine size={16} /> }
  ];

  const handleMicToggle = () => {
    if (isListening) {
      micService.stop();
      setIsListening(false);
    } else {
      if (!micService.isSupported()) {
        setError("Speech recognition is not supported in this browser.");
        return;
      }
      
      micService.start({
        onResult: (transcript, isFinal) => {
          setText(transcript);
        },
        onError: (err) => {
          setError(`Speech recognition error: ${err}`);
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
      setIsListening(true);
    }
  };

  const handleGenerate = async () => {
    if (isListening) {
      micService.stop();
      setIsListening(false);
    }

    if (!text.trim()) return;

    
    setIsLoading(true);
    setError("");
    try {
      const result = await generateTaskVariants(text, mode);
      setVariants(result);

    } catch (err) {
      setError("Failed to generate variants. Check your API key.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="input-wrapper">
      {error && <div className="error-message">{error}</div>}

      <div className="header">
        <div className="points"># <span>{text.length} characters</span></div>
        <div className="powered"><span>powered by rocket.dev</span></div>
      </div>
      <div className="input-container">
        <textarea
          className="main-input"
          rows={4}
          placeholder="Enter your task description..."
          value={text}
          onChange={(e) => {
            const newText = e.target.value;
            setText(newText);
            micService.setTranscript(newText);
          }}
        />

        <div className="action-group">
        <div className="action-group left">
        <div className="mode-selector" ref={menuRef}>
          <button 
            className={`mode-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            <span className="mode-icon">
              {modes.find(m => m.id === mode)?.icon}
            </span>
            <span className="mode-label">
              {modes.find(m => m.id === mode)?.label}
            </span>

            <RiArrowDownSLine size={14} className={`chevron ${isMenuOpen ? 'up' : ''}`} />
          </button>
          
          {isMenuOpen && (
            <div className="mode-menu">
              {modes.map((m) => (
                <button
                  key={m.id}
                  className={`mode-option ${mode === m.id ? 'selected' : ''} ${m.disabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!m.disabled) {
                      if (typeof onModeChange === 'function') {
                        onModeChange(m.id);
                      } else {
                        console.error('onModeChange is not a function!', onModeChange);
                      }
                      setIsMenuOpen(false);
                    }
                  }}


                  disabled={m.disabled}
                  type="button"
                >
                  <span className="option-icon">{m.icon}</span>
                  <span className="option-label">{m.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        <div className="action-group right">
          <button 
            className={`action-btn ${isListening ? 'listening' : ''}`} 
            aria-label="Voice"
            onClick={handleMicToggle}
            type="button"
          >
            {isListening ? <RiMicLine size={18} /> : <RiMicOffLine size={18} />}
          </button>

          <button 
            className={`send-btn ${isLoading ? 'loading' : ''}`} 
            aria-label="Send"
            onClick={handleGenerate}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            )}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};


export default Input;

