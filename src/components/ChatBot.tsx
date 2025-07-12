
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, Mic, Camera } from 'lucide-react';
import { toast } from 'sonner';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I\'m SHDAI Assistant. I can help you with symptom checking, vaccination information, and health guidance. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    console.log('User message:', message);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('fever') || msg.includes('cough') || msg.includes('symptom')) {
      return 'I can help you check symptoms. For fever and cough in children, please use our AI Symptom Checker for a detailed assessment. Would you like me to guide you through the process?';
    }
    
    if (msg.includes('vaccine') || msg.includes('immunization')) {
      return 'Vaccination is crucial for child health. SHDAI tracks immunization schedules and sends reminders. What specific vaccine information do you need?';
    }
    
    if (msg.includes('rash') || msg.includes('skin') || msg.includes('photo')) {
      return 'For skin conditions, our Computer Vision tool can analyze photos. Please use the Vision Diagnostics feature for image analysis. Would you like me to explain how it works?';
    }
    
    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('serious')) {
      return '🚨 For medical emergencies, please seek immediate medical attention or contact your nearest health facility. SHDAI provides preliminary assessment but cannot replace professional medical care.';
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('help')) {
      return 'Hello! I can assist you with:\n• Symptom checking and diagnosis\n• Vaccination schedules and reminders\n• Health education and guidance\n• Computer vision analysis\n• Disease surveillance information\n\nWhat would you like to know?';
    }

    return 'I understand you\'re asking about health-related concerns. For the most accurate assistance, please use our specialized tools: Symptom Checker for diagnosis, Computer Vision for image analysis, or describe your specific health question.';
  };

  const quickQuestions = [
    'Check symptoms for fever and cough',
    'Vaccination schedule for 2-year-old',
    'How to use computer vision?',
    'Emergency care guidelines'
  ];

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-96 z-50 shadow-2xl border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>SHDAI Assistant</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-100">AI Assistant Online</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.sender === 'bot' && (
                        <Bot className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      )}
                      {msg.sender === 'user' && (
                        <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-6"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask about symptoms, vaccines, or health..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  AI-Powered
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
