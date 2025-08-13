import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface FlowchartNode {
  id: string;
  question: string;
  type: 'question' | 'assessment' | 'result';
  options?: FlowchartOption[];
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  recommendation?: string;
  nextActions?: string[];
}

interface FlowchartOption {
  text: string;
  value: string;
  nextNodeId: string;
  riskModifier?: number;
}

interface SymptomAssessment {
  symptoms: string[];
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  urgency: 'routine' | 'same-day' | 'urgent' | 'emergency';
}

const DynamicSymptomFlowchart: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [visitedNodes, setVisitedNodes] = useState<string[]>(['start']);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [riskScore, setRiskScore] = useState(0);
  const [assessment, setAssessment] = useState<SymptomAssessment | null>(null);

  // IMCI-based symptom flowchart nodes
  const flowchartNodes: Record<string, FlowchartNode> = {
    start: {
      id: 'start',
      type: 'question',
      question: 'What is the child\'s age?',
      options: [
        { text: '2-11 months', value: '2-11_months', nextNodeId: 'age_2_11' },
        { text: '12-59 months', value: '12-59_months', nextNodeId: 'age_12_59' },
        { text: 'Under 2 months', value: 'under_2_months', nextNodeId: 'newborn_danger' }
      ]
    },
    age_2_11: {
      id: 'age_2_11',
      type: 'question',
      question: 'Does the child have any of these danger signs?',
      options: [
        { text: 'Not able to feed/drink', value: 'cannot_feed', nextNodeId: 'emergency', riskModifier: 10 },
        { text: 'Vomits everything', value: 'vomits_all', nextNodeId: 'emergency', riskModifier: 10 },
        { text: 'Has had convulsions', value: 'convulsions', nextNodeId: 'emergency', riskModifier: 15 },
        { text: 'Lethargic or unconscious', value: 'unconscious', nextNodeId: 'emergency', riskModifier: 15 },
        { text: 'None of the above', value: 'no_danger', nextNodeId: 'main_symptoms' }
      ]
    },
    age_12_59: {
      id: 'age_12_59',
      type: 'question',
      question: 'Does the child have any of these danger signs?',
      options: [
        { text: 'Not able to feed/drink', value: 'cannot_feed', nextNodeId: 'emergency', riskModifier: 10 },
        { text: 'Vomits everything', value: 'vomits_all', nextNodeId: 'emergency', riskModifier: 10 },
        { text: 'Has had convulsions', value: 'convulsions', nextNodeId: 'emergency', riskModifier: 15 },
        { text: 'Lethargic or unconscious', value: 'unconscious', nextNodeId: 'emergency', riskModifier: 15 },
        { text: 'None of the above', value: 'no_danger', nextNodeId: 'main_symptoms' }
      ]
    },
    newborn_danger: {
      id: 'newborn_danger',
      type: 'question',
      question: 'Does the baby have any of these signs?',
      options: [
        { text: 'Fast breathing (60+ breaths/min)', value: 'fast_breathing', nextNodeId: 'emergency', riskModifier: 12 },
        { text: 'Chest indrawing', value: 'chest_indrawing', nextNodeId: 'emergency', riskModifier: 15 },
        { text: 'Fever or low body temperature', value: 'fever_hypothermia', nextNodeId: 'emergency', riskModifier: 10 },
        { text: 'Not feeding well', value: 'poor_feeding', nextNodeId: 'urgent', riskModifier: 8 },
        { text: 'None of the above', value: 'no_newborn_danger', nextNodeId: 'newborn_assessment' }
      ]
    },
    main_symptoms: {
      id: 'main_symptoms',
      type: 'question',
      question: 'What is the main problem today?',
      options: [
        { text: 'Cough or difficult breathing', value: 'cough_breathing', nextNodeId: 'cough_assessment', riskModifier: 3 },
        { text: 'Diarrhea', value: 'diarrhea', nextNodeId: 'diarrhea_assessment', riskModifier: 2 },
        { text: 'Fever', value: 'fever', nextNodeId: 'fever_assessment', riskModifier: 3 },
        { text: 'Ear problem', value: 'ear_problem', nextNodeId: 'ear_assessment', riskModifier: 1 },
        { text: 'Malnutrition concern', value: 'malnutrition', nextNodeId: 'nutrition_assessment', riskModifier: 4 }
      ]
    },
    cough_assessment: {
      id: 'cough_assessment',
      type: 'question',
      question: 'How long has the child had cough?',
      options: [
        { text: 'Less than 14 days', value: 'cough_acute', nextNodeId: 'breathing_assessment', riskModifier: 2 },
        { text: '14 days or more', value: 'cough_chronic', nextNodeId: 'chronic_cough', riskModifier: 4 }
      ]
    },
    breathing_assessment: {
      id: 'breathing_assessment',
      type: 'question',
      question: 'Check the child\'s breathing:',
      options: [
        { text: 'Fast breathing (2-11m: 50+, 12-59m: 40+)', value: 'fast_breathing', nextNodeId: 'pneumonia', riskModifier: 6 },
        { text: 'Chest indrawing', value: 'chest_indrawing', nextNodeId: 'severe_pneumonia', riskModifier: 10 },
        { text: 'Normal breathing', value: 'normal_breathing', nextNodeId: 'cough_cold', riskModifier: 1 }
      ]
    },
    diarrhea_assessment: {
      id: 'diarrhea_assessment',
      type: 'question',
      question: 'How long has the child had diarrhea?',
      options: [
        { text: 'Less than 14 days', value: 'acute_diarrhea', nextNodeId: 'dehydration_check', riskModifier: 2 },
        { text: '14 days or more', value: 'persistent_diarrhea', nextNodeId: 'persistent_diarrhea_result', riskModifier: 5 }
      ]
    },
    dehydration_check: {
      id: 'dehydration_check',
      type: 'question',
      question: 'Check for signs of dehydration:',
      options: [
        { text: 'Two or more signs: restless/irritable, sunken eyes, drinks eagerly/thirsty, skin pinch slow', value: 'some_dehydration', nextNodeId: 'some_dehydration_result', riskModifier: 6 },
        { text: 'Lethargic/unconscious, sunken eyes, cannot drink, skin pinch very slow', value: 'severe_dehydration', nextNodeId: 'severe_dehydration_result', riskModifier: 12 },
        { text: 'No signs of dehydration', value: 'no_dehydration', nextNodeId: 'no_dehydration_result', riskModifier: 1 }
      ]
    },
    // Result nodes
    emergency: {
      id: 'emergency',
      type: 'result',
      question: '',
      riskLevel: 'critical',
      recommendation: 'EMERGENCY: Refer URGENTLY to hospital',
      nextActions: [
        'Call ambulance or arrange immediate transport',
        'Give first dose of antibiotic if available',
        'Keep child warm',
        'Continue breastfeeding if conscious'
      ]
    },
    urgent: {
      id: 'urgent',
      type: 'result',
      question: '',
      riskLevel: 'high',
      recommendation: 'URGENT: Refer to health facility today',
      nextActions: [
        'Arrange transport to nearest health facility',
        'Give paracetamol for fever',
        'Continue feeding',
        'Return immediately if condition worsens'
      ]
    },
    pneumonia: {
      id: 'pneumonia',
      type: 'result',
      question: '',
      riskLevel: 'medium',
      recommendation: 'Pneumonia: Give antibiotic and follow up',
      nextActions: [
        'Give appropriate antibiotic (Amoxicillin)',
        'Advise on home care',
        'Follow up in 2 days',
        'Return immediately if breathing becomes difficult'
      ]
    },
    severe_pneumonia: {
      id: 'severe_pneumonia',
      type: 'result',
      question: '',
      riskLevel: 'high',
      recommendation: 'Severe Pneumonia: Refer urgently',
      nextActions: [
        'Refer urgently to hospital',
        'Give first dose of antibiotic',
        'Manage fever',
        'Keep warm and continue feeding'
      ]
    }
  };

  const getCurrentNode = (): FlowchartNode => {
    return flowchartNodes[currentNodeId] || flowchartNodes.start;
  };

  const handleAnswer = useCallback((option: FlowchartOption) => {
    const newAnswers = { ...answers, [currentNodeId]: option.value };
    setAnswers(newAnswers);
    
    // Update risk score
    const newRiskScore = riskScore + (option.riskModifier || 0);
    setRiskScore(newRiskScore);
    
    // Add to visited nodes
    setVisitedNodes(prev => [...prev, option.nextNodeId]);
    
    // Move to next node
    setCurrentNodeId(option.nextNodeId);
    
    // Check if we've reached a result node
    const nextNode = flowchartNodes[option.nextNodeId];
    if (nextNode.type === 'result') {
      generateAssessment(newAnswers, newRiskScore, nextNode);
    }
    
    toast.success(`Answer recorded: ${option.text}`);
  }, [currentNodeId, answers, riskScore]);

  const generateAssessment = (finalAnswers: Record<string, string>, finalRiskScore: number, resultNode: FlowchartNode) => {
    const symptoms = Object.values(finalAnswers);
    
    let urgency: SymptomAssessment['urgency'] = 'routine';
    if (finalRiskScore >= 10) urgency = 'emergency';
    else if (finalRiskScore >= 6) urgency = 'urgent';
    else if (finalRiskScore >= 3) urgency = 'same-day';
    
    const newAssessment: SymptomAssessment = {
      symptoms,
      riskScore: finalRiskScore,
      riskLevel: resultNode.riskLevel || 'low',
      recommendations: [
        resultNode.recommendation || '',
        ...(resultNode.nextActions || [])
      ],
      urgency
    };
    
    setAssessment(newAssessment);
    toast.success('Assessment complete!');
  };

  const resetFlowchart = () => {
    setCurrentNodeId('start');
    setVisitedNodes(['start']);
    setAnswers({});
    setRiskScore(0);
    setAssessment(null);
    toast.info('Assessment reset. Starting over.');
  };

  const currentNode = getCurrentNode();
  const progress = (visitedNodes.length / Object.keys(flowchartNodes).length) * 100;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'urgent': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'same-day': return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-black">
            <span>IMCI Dynamic Symptom Assessment</span>
            <Button
              onClick={resetFlowchart}
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress: {visitedNodes.length} steps</span>
              <span>Risk Score: {riskScore}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          {assessment ? (
            // Assessment Results
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getUrgencyIcon(assessment.urgency)}
                <h3 className="text-lg font-semibold text-black">Assessment Complete</h3>
              </div>
              
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Badge className={`${getRiskLevelColor(assessment.riskLevel)} text-white`}>
                    {assessment.riskLevel.toUpperCase()} RISK
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    {assessment.urgency.toUpperCase()} PRIORITY
                  </Badge>
                  <Badge variant="secondary">
                    Score: {assessment.riskScore}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-black">Recommendations:</h4>
                  <ul className="space-y-2">
                    {assessment.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-black">Symptoms Reported:</h4>
                  <div className="flex flex-wrap gap-1">
                    {assessment.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {symptom.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Question Flow
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-black mb-2">
                  {currentNode.question}
                </h3>
                {currentNode.type === 'question' && (
                  <p className="text-sm text-gray-600 mb-4">
                    Please select the most appropriate answer:
                  </p>
                )}
              </div>
              
              {currentNode.options && (
                <div className="grid gap-2">
                  {currentNode.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className="justify-start text-left h-auto p-4 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="flex-1">{option.text}</span>
                        {option.riskModifier && option.riskModifier > 5 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicSymptomFlowchart;