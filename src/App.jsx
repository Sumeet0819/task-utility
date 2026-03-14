import React, { useState } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import VariantsDisplay from './components/VariantsDisplay'
import './App.css'

const App = () => {
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectVariant = (variant) => {
    navigator.clipboard.writeText(variant)
      .then(() => {
        console.log("Copied to clipboard:", variant);
        // Optional: you could add a toast notification here
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <main className='main-container'>
      <h1 className="sr-only">Rocket Task - AI Powered Task & Utility Generator</h1>
      <Header />
      
      <div className='center-content'>
        {variants.length > 0 || isLoading ? (
          <VariantsDisplay 
            variants={variants} 
            isLoading={isLoading} 
            onSelect={handleSelectVariant} 
          />
        ) : (
          <div className='title'>Your Task <span>Utility</span></div>
        )}
      </div>

      <Input 
        setVariants={setVariants} 
        setIsLoading={setIsLoading} 
        isLoading={isLoading}
      />
    </main>
  )
}

export default App

