import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MorningCheckSimulator from './components/MorningCheckSimulator';
import MultiAgentPipeline from './components/MultiAgentPipeline';
import SettlementBreakdown from './components/SettlementBreakdown';
import VoiceAssistant from './components/VoiceAssistant';
import GuardrailsApproval from './components/GuardrailsApproval';
import CogneeMemoryGraph from './components/CogneeMemoryGraph';
import WhatsAppPreviewModal from './components/WhatsAppPreviewModal';
import SoundboxAlertModal from './components/SoundboxAlertModal';
import LiveThinkingOrbLoader from './components/LiveThinkingOrbLoader';
import OfflineSyncBanner from './components/OfflineSyncBanner';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMorningCheckRunning, setIsMorningCheckRunning] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
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
  };

  const handleLoaderComplete = () => {
    setIsMorningCheckRunning(false);
    setActiveTab('morning-check');
    const morningSection = document.getElementById('morning-check');
    if (morningSection) {
      morningSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVoice = () => {
    setActiveTab('voice');
    const voiceSection = document.getElementById('voice');
    if (voiceSection) {
      voiceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col selection:bg-[#00B9F1]/30 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Centered Thinking Orb 3-5s Loading Experience with Deep Backdrop Blur */}
      <LiveThinkingOrbLoader 
        isOpen={isMorningCheckRunning}
        onComplete={handleLoaderComplete}
        theme={theme}
      />

      {/* Offline Alert Banner */}
      <OfflineSyncBanner 
        isOffline={isOffline} 
        onSyncNow={() => setIsOffline(false)} 
      />

      {/* Capsule Glassmorphism Navbar */}
      <Navbar
        onRunMorningCheck={handleRunMorningCheck}
        isMorningCheckRunning={isMorningCheckRunning}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
      />

      {/* Main Single-Page App Content */}
      <main className="flex-1 space-y-8 pt-4 pb-12">
        
        {/* Hero Section with Live Thinking Orb Playground */}
        <HeroSection 
          theme={theme}
          onRunMorningCheck={handleRunMorningCheck}
          onOpenVoiceModal={handleOpenVoice}
        />

        {/* Proactive 9:00 AM Daily Morning Check Simulation */}
        <MorningCheckSimulator 
          theme={theme}
          isRunning={isMorningCheckRunning} 
          onRunCheck={handleRunMorningCheck}
          onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
        />

        {/* Multi-Agent Orchestration & n8n Pipeline */}
        <MultiAgentPipeline theme={theme} />

        {/* Settlement Reconciliation Math Engine (₹2,340 Gap) */}
        <SettlementBreakdown 
          theme={theme}
          onOpenDisputeModal={() => setIsSoundboxModalOpen(true)}
        />

        {/* Sarvam AI Multilingual Voice Copilot */}
        <VoiceAssistant 
          theme={theme}
          onOpenSoundboxChime={() => setIsSoundboxModalOpen(true)}
        />

        {/* Guardrails & Human-in-the-Loop Risk Scorer */}
        <GuardrailsApproval 
          theme={theme}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* Cognee Knowledge Graph & Persistent Memory */}
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
