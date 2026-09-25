import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveDemoTour from './components/InteractiveDemoTour';
import MorningCheckSimulator from './components/MorningCheckSimulator';
import MultiAgentPipeline from './components/MultiAgentPipeline';
import SettlementBreakdown from './components/SettlementBreakdown';
import VoiceAssistant from './components/VoiceAssistant';
import GuardrailsApproval from './components/GuardrailsApproval';
import CogneeMemoryGraph from './components/CogneeMemoryGraph';
import WhatsAppPreviewModal from './components/WhatsAppPreviewModal';
import SoundboxAlertModal from './components/SoundboxAlertModal';
import LiveThinkingOrbLoader from './components/LiveThinkingOrbLoader';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMorningCheckRunning, setIsMorningCheckRunning] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSoundboxModalOpen, setIsSoundboxModalOpen] = useState(false);
  
  // Pure Black & White theme (dark mode default)
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleRunMorningCheck = () => {
    setIsMorningCheckRunning(true);
    setActiveTab('morning-check');
    const morningSection = document.getElementById('morning-check');
    if (morningSection) {
      morningSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [voiceDemoKey, setVoiceDemoKey] = useState(0);

  const handleOpenVoice = () => {
    setActiveTab('voice');
    setVoiceDemoKey(prev => prev + 1);
    const voiceSection = document.getElementById('voice');
    if (voiceSection) {
      voiceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col selection:bg-[#00B9F1]/30 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Capsule Glassmorphism Navbar */}
      <Navbar
        onRunMorningCheck={handleRunMorningCheck}
        isMorningCheckRunning={isMorningCheckRunning}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
      />

      {/* Main Single-Page App Content */}
      <main className="flex-1 space-y-6 pt-4 pb-12">
        
        {/* Hero Section with Quick Demo Launch */}
        <HeroSection 
          theme={theme}
          onRunMorningCheck={handleRunMorningCheck}
          onOpenVoiceModal={handleOpenVoice}
        />

        {/* 2-Minute Hackathon Demo Guided Tour Bar */}
        <InteractiveDemoTour 
          theme={theme}
          onRunMorningCheck={handleRunMorningCheck}
          onOpenVoice={handleOpenVoice}
          onOpenSoundbox={() => setIsSoundboxModalOpen(true)}
          onApproveDispute={() => {
            const el = document.getElementById('guardrails');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Step 1: Proactive 9:00 AM Daily Morning Check Simulation */}
        <MorningCheckSimulator 
          theme={theme}
          isRunning={isMorningCheckRunning} 
          onRunCheck={handleRunMorningCheck}
          onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
        />

        {/* Step 2: Sarvam AI Multilingual Voice Copilot (Automatic Hindi Demo) */}
        <VoiceAssistant 
          theme={theme}
          triggerDemoCount={voiceDemoKey}
          onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
        />

        {/* Step 3: Settlement Reconciliation Math Engine (₹2,340 Gap & Recovery Lifecycle) */}
        <SettlementBreakdown 
          theme={theme}
          onOpenDisputeModal={() => setIsSoundboxModalOpen(true)}
        />

        {/* Step 4: Guardrails & Human-in-the-Loop Risk Scorer (🟢 / 🟡 / 🔴) */}
        <GuardrailsApproval 
          theme={theme}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* Step 5: Multi-Agent Orchestration & n8n Pipeline */}
        <MultiAgentPipeline theme={theme} />

        {/* Step 6: Cognee Knowledge Graph & Persistent Memory */}
        <CogneeMemoryGraph theme={theme} />

      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Interactive Modals */}
      <WhatsAppPreviewModal 
        theme={theme}
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />

      <SoundboxAlertModal 
        theme={theme}
        isOpen={isSoundboxModalOpen} 
        onClose={() => setIsSoundboxModalOpen(false)} 
      />

    </div>
  );
}
