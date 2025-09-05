import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import mermaid from "mermaid";

const flowchartDefinition = `
flowchart TD
    A[Registration] --> B{Age < 5 years?}
    B -->|Yes| C[Triage Assessment]
    B -->|No| D[Adult Pathway]
    
    C --> E{Danger Signs?}
    E -->|Yes| F[Emergency Care]
    E -->|No| G[Vital Signs Check]
    
    G --> H{Fast Breathing?}
    H -->|≥50/min 2-11mo or ≥40/min 12-59mo| I[Pneumonia Assessment]
    H -->|No| J[Other Symptoms]
    
    I --> K{SpO₂ < 90%?}
    K -->|Yes| L[Severe Pneumonia - Admit]
    K -->|No| M[Outpatient Treatment]
    
    J --> N{Fever?}
    N -->|Yes| O[Malaria Assessment]
    N -->|No| P[Diarrhea Check]
    
    O --> Q[RDT/Microscopy]
    Q -->|Positive| R[Malaria Treatment]
    Q -->|Negative| S[Other Fever Causes]
    
    P --> T{Dehydration?}
    T -->|Severe| U[IV Fluids - Admit]
    T -->|Some| V[ORS Treatment]
    T -->|None| W[Home Management]
    
    F --> X[Stabilize & Refer]
    L --> Y[Admission]
    M --> Z[Outpatient Follow-up]
    R --> Z
    S --> Z
    V --> Z
    W --> AA[Discharge]
    
    click A "javascript:alert('Registration: Patient demographics and payment')"
    click C "javascript:alert('Triage: IMCI danger signs assessment')"
    click G "javascript:alert('Vitals: Temperature, RR, SpO₂, weight')"
    click I "javascript:alert('Pneumonia: Fast breathing assessment')"
    click O "javascript:alert('Malaria: Fever >37.5°C assessment')"
    click P "javascript:alert('Diarrhea: Dehydration assessment')"
`;

export function InteractiveFlowchart() {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeMermaid = async () => {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
          primaryColor: '#FF6200',
          primaryTextColor: '#000000',
          primaryBorderColor: '#FFA500',
          lineColor: '#666666',
          secondaryColor: '#ADD8E6',
          tertiaryColor: '#90EE90'
        }
      });
      
      if (mermaidRef.current) {
        try {
          const { svg } = await mermaid.render('flowchart', flowchartDefinition);
          mermaidRef.current.innerHTML = svg;
          setIsLoaded(true);
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };

    initializeMermaid();
  }, []);

  const downloadSVG = () => {
    if (mermaidRef.current) {
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'imci-workflow.svg';
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const downloadPNG = () => {
    if (mermaidRef.current) {
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const data = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'imci-workflow.png';
              a.click();
              URL.revokeObjectURL(url);
            }
          });
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(data);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">IMCI Pediatric Workflow Flowchart</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadSVG}>
              <Download className="h-4 w-4 mr-1" />
              SVG
            </Button>
            <Button variant="outline" size="sm" onClick={downloadPNG}>
              <Download className="h-4 w-4 mr-1" />
              PNG
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-muted-foreground">
          Interactive flowchart for WHO IMCI pediatric assessment. Click on nodes for details.
        </div>
        <div 
          ref={mermaidRef} 
          className="w-full overflow-auto border rounded-lg p-4 bg-background"
          style={{ minHeight: '400px' }}
        >
          {!isLoaded && (
            <div className="flex items-center justify-center h-64">
              <div className="text-muted-foreground">Loading flowchart...</div>
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <p><strong>Key Decision Points:</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Danger Signs: Unable to drink/breastfeed, vomiting, convulsions, lethargy</li>
            <li>Fast Breathing: ≥50/min (2-11mo), ≥40/min (12-59mo)</li>
            <li>Hypoxia: SpO₂ &lt;90%</li>
            <li>Severe Dehydration: Sunken eyes, skin pinch &gt;2sec, restless/irritable</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}