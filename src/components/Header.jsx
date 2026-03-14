import React, { useState, useEffect } from 'react';
import './header.css';
import { RiSparklingLine } from '@remixicon/react';

const Header = () => {
    const [showInput, setShowInput] = useState(false);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('GEMINI_API_KEY');
        if (savedKey) setApiKey(savedKey);
    }, []);

    const handleSave = () => {
        localStorage.setItem('GEMINI_API_KEY', apiKey);
        setShowInput(false);
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <div className="logo">
                    <RiSparklingLine size={24} color="#9712c0" />
                    <span className="brand-name">Rocket Task</span>
                </div>
            </div>
            <div className="header-right">
                {showInput ? (
                    <div className="api-input-group">
                        <input 
                            type="password" 
                            placeholder="Enter Gemini API Key..." 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="api-key-input"
                        />
                        <button onClick={handleSave} className="save-btn">Save</button>
                        <button onClick={() => setShowInput(false)} className="cancel-btn">×</button>
                    </div>
                ) : (
                    <button className="api-key-btn" onClick={() => setShowInput(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"></path>
                        </svg>
                        API Key
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
