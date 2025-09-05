import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Stethoscope, FileText, TestTube, Pill, Home } from "lucide-react";

const workflowSteps = [
  {
    id: "arrival",
    title: "Arrival & Registration",
    description: "Patient demographics, medical card, payment processing",
    roles: ["Nurse", "Receptionist"],
    actions: ["Capture demographics", "Verify insurance", "Process payment", "Generate patient ID"],
    links: [
      { text: "IMCI Chart Booklet", url: "https://www.who.int/publications/i/item/9789241506823" },
      { text: "Zambia STGs", url: "#" }
    ],
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "triage",
    title: "Triage & Vital Signs",
    description: "IMCI danger signs assessment, vital signs, growth monitoring",
    roles: ["Nurse", "Clinical Officer"],
    actions: ["Check danger signs", "Measure vitals", "Plot growth charts", "Assess urgency"],
    links: [
      { text: "WHO Pocket Book", url: "https://www.who.int/publications/i/item/978-92-4-151571-6" },
      { text: "IMCI Job Aid", url: "#" }
    ],
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "consultation",
    title: "Clinical Consultation",
    description: "History taking, physical examination, IMCI classification",
    roles: ["Doctor", "Clinical Officer"],
    actions: ["Take history", "Physical examination", "IMCI classification", "Treatment plan"],
    links: [
      { text: "IMCI Guidelines", url: "https://www.who.int/maternal_child_adolescent/documents/imci_gps/en/" },
      { text: "Zambia Clinical Protocols", url: "#" }
    ],
    icon: <Users className="h-4 w-4" />
  },
  {
    id: "laboratory",
    title: "Laboratory & Diagnostics",
    description: "Test ordering, sample collection, result interpretation",
    roles: ["Lab Technician", "Doctor"],
    actions: ["Order tests", "Collect samples", "Process results", "Interpret findings"],
    links: [
      { text: "WHO Lab Guidelines", url: "#" },
      { text: "Malaria RDT Guide", url: "#" }
    ],
    icon: <TestTube className="h-4 w-4" />
  },
  {
    id: "diagnosis",
    title: "Diagnosis & Prescription",
    description: "ICD-10 coding, treatment selection, prescription writing",
    roles: ["Doctor", "Clinical Officer"],
    actions: ["Assign ICD-10 code", "Select treatment", "Write prescription", "Patient education"],
    links: [
      { text: "ICD-10 Reference", url: "#" },
      { text: "Zambia National Formulary", url: "#" }
    ],
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "pharmacy",
    title: "Pharmacy & Dispensing",
    description: "Medication dispensing, stock management, patient counseling",
    roles: ["Pharmacist", "Pharmacy Technician"],
    actions: ["Verify prescription", "Dispense medication", "Counsel patient", "Update stock"],
    links: [
      { text: "Pediatric Dosing Guide", url: "#" },
      { text: "Drug Interaction Checker", url: "#" }
    ],
    icon: <Pill className="h-4 w-4" />
  },
  {
    id: "discharge",
    title: "Discharge & Follow-up",
    description: "Home care instructions, follow-up scheduling, danger signs education",
    roles: ["Nurse", "Doctor"],
    actions: ["Provide instructions", "Schedule follow-up", "Educate on danger signs", "Discharge summary"],
    links: [
      { text: "Home Care Guidelines", url: "#" },
      { text: "Follow-up Protocols", url: "#" }
    ],
    icon: <Home className="h-4 w-4" />
  }
];

export function StepperAccordion() {
  const [activeStep, setActiveStep] = useState<string>("arrival");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">IMCI Pediatric Workflow Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible value={activeStep} onValueChange={setActiveStep}>
          {workflowSteps.map((step, index) => (
            <AccordionItem key={step.id} value={step.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  {step.icon}
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-11 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Responsible Roles:</h4>
                    <div className="flex gap-2">
                      {step.roles.map((role) => (
                        <Badge key={role} variant="secondary">{role}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Actions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {step.actions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Reference Links:</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.links.map((link, idx) => (
                        <Button key={idx} variant="outline" size="sm" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {link.text}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}