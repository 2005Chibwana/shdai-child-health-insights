import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Languages } from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { toast } from 'sonner';

interface VoiceInterfaceProps {
  onTranscription?: (text: string, language: string) => void;
  onSpeakText?: (text: string) => void;
  supportedLanguages?: string[];
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  onTranscription,
  onSpeakText,
  supportedLanguages = ['en-US', 'bem-ZM', 'ny-MW', 'sw-KE'] // English, Bemba, Nyanja, Swahili
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isListening, setIsListening] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [lastTranscription, setLastTranscription] = useState('');

  // Language mapping for display
  const languageNames = {
    'en-US': 'English',
    'bem-ZM': 'Bemba',
    'ny-MW': 'Nyanja/Chewa',
    'sw-KE': 'Swahili'
  };

  const { speak, cancel: cancelSpeak, speaking } = useSpeechSynthesis();
  
  const { listen, stop, supported: speechSupported } = useSpeechRecognition({
    onResult: (result: string) => {
      setLastTranscription(result);
      
      // Simple language detection (in real app, would use more sophisticated detection)
      const detectedLang = detectLanguage(result);
      setDetectedLanguage(detectedLang);
      
      if (onTranscription) {
        onTranscription(result, detectedLang || selectedLanguage);
      }
      
      toast.success(`Voice input received: "${result.substring(0, 50)}..."`);
    },
    onError: (error: any) => {
      console.error('Speech recognition error:', error);
      toast.error('Voice recognition failed. Please try again.');
      setIsListening(false);
    },
    onEnd: () => {
      setIsListening(false);
    }
  });

  // Simple language detection based on common words
  const detectLanguage = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Bemba common words
    if (lowerText.includes('bwino') || lowerText.includes('muli') || lowerText.includes('twatotela')) {
      return 'bem-ZM';
    }
    
    // Nyanja/Chewa common words
    if (lowerText.includes('muli bwanji') || lowerText.includes('zikomo') || lowerText.includes('ndili')) {
      return 'ny-MW';
    }
    
    // Swahili common words
    if (lowerText.includes('habari') || lowerText.includes('jambo') || lowerText.includes('asante')) {
      return 'sw-KE';
    }
    
    return 'en-US'; // Default to English
  };

  const handleStartListening = useCallback(() => {
    if (!speechSupported) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }

    setIsListening(true);
    listen({ 
      continuous: true,
      language: selectedLanguage,
      interimResults: true 
    });
    toast.info('Listening... Speak now.');
  }, [listen, selectedLanguage, speechSupported]);

  const handleStopListening = useCallback(() => {
    setIsListening(false);
    stop();
    toast.info('Voice input stopped.');
  }, [stop]);

  const handleSpeak = useCallback((text: string) => {
    if (speaking) {
      cancelSpeak();
    }
    
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => 
      voice.lang.startsWith(selectedLanguage.split('-')[0])
    ) || voices[0];

    speak({ 
      text, 
      voice: selectedVoice,
      rate: 0.8,
      pitch: 1.0 
    });
    
    if (onSpeakText) {
      onSpeakText(text);
    }
  }, [speak, speaking, cancelSpeak, selectedLanguage, onSpeakText]);

  const sampleTexts = {
    'en-US': 'Hello, I can help you check your child\'s symptoms.',
    'bem-ZM': 'Muli bwino, ndefwaya ukubafunsha abanobe abana.',
    'ny-MW': 'Muli bwanji, nditha kukuthandizani kuyang\'ana matenda a mwana wanu.',
    'sw-KE': 'Habari, ninaweza kukusaidia kuangalia dalili za mtoto wako.'
  };

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Languages className="h-5 w-5 text-accent" />
          Multilingual Voice Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Select Language</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="border-accent/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languageNames[lang as keyof typeof languageNames] || lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Voice Controls */}
        <div className="flex gap-2">
          <Button
            onClick={isListening ? handleStopListening : handleStartListening}
            variant={isListening ? "destructive" : "default"}
            className={isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}
            disabled={!speechSupported}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Listening
              </>
            )}
          </Button>

          <Button
            onClick={() => handleSpeak(sampleTexts[selectedLanguage as keyof typeof sampleTexts])}
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-white"
            disabled={speaking}
          >
            {speaking ? (
              <>
                <VolumeX className="h-4 w-4 mr-2" />
                Speaking...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Test Voice
              </>
            )}
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex gap-2 flex-wrap">
          {isListening && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              🎤 Listening
            </Badge>
          )}
          {speaking && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              🔊 Speaking
            </Badge>
          )}
          {detectedLanguage && detectedLanguage !== selectedLanguage && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Detected: {languageNames[detectedLanguage as keyof typeof languageNames]}
            </Badge>
          )}
        </div>

        {/* Last Transcription */}
        {lastTranscription && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-black mb-1">Last Input:</p>
            <p className="text-sm text-gray-700">{lastTranscription}</p>
          </div>
        )}

        {/* Browser Support Warning */}
        {!speechSupported && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Speech recognition is not supported in this browser. Please use Chrome or Edge for the best experience.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;