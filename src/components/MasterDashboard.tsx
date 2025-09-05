import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  GitBranch, 
  Table, 
  Stethoscope, 
  Pill, 
  Code, 
  Book, 
  BarChart3,
  Users,
  Clock,
  AlertTriangle
} from "lucide-react";

const dashboardSections = [
  {
    id: "workflow",
    title: "Pediatric Workflow Steps",
    description: "Interactive step-by-step IMCI pediatric outpatient workflow",
    icon: <FileText className="h-6 w-6" />,
    features: ["7 workflow steps", "Role-based actions", "WHO IMCI aligned", "Reference links"],
    status: "Active",
    link: "#workflow",
    color: "bg-primary/10 border-primary"
  },
  {
    id: "flowchart",
    title: "Interactive Flowchart",
    description: "Visual decision tree for IMCI-based pediatric assessment",
    icon: <GitBranch className="h-6 w-6" />,
    features: ["Mermaid.js powered", "Clickable nodes", "Export options", "Decision diamonds"],
    status: "Active",
    link: "#flowchart",
    color: "bg-secondary/10 border-secondary"
  },
  {
    id: "vitals",
    title: "Clinical Data Tables",
    description: "Vital signs thresholds and growth standards dashboard",
    icon: <Table className="h-6 w-6" />,
    features: ["Filterable tables", "IMCI thresholds", "Growth standards", "Age-specific"],
    status: "Active",
    link: "#vitals",
    color: "bg-accent/10 border-accent"
  },
  {
    id: "symptoms",
    title: "Symptom → Diagnosis",
    description: "Symptom mapping to IMCI classifications and diagnoses",
    icon: <Stethoscope className="h-6 w-6" />,
    features: ["Card-based UI", "ICD-10 codes", "Treatment plans", "Severity levels"],
    status: "Active",
    link: "#symptoms",
    color: "bg-green-100 border-green-500"
  },
  {
    id: "prescriptions",
    title: "Prescription Selector",
    description: "Interactive tool for pediatric prescriptions and dosing",
    icon: <Pill className="h-6 w-6" />,
    features: ["Weight-based dosing", "First-line treatments", "Dose calculator", "Zambia STGs"],
    status: "Active",
    link: "#prescriptions",
    color: "bg-blue-100 border-blue-500"
  },
  {
    id: "diagnosis",
    title: "Diagnosis Codes",
    description: "Searchable ICD-10 codes for common pediatric conditions",
    icon: <Code className="h-6 w-6" />,
    features: ["ICD-10 integration", "Category filters", "Frequency indicators", "Treatment links"],
    status: "Active",
    link: "#diagnosis",
    color: "bg-purple-100 border-purple-500"
  },
  {
    id: "references",
    title: "Reference Library",
    description: "Clinical guidelines and official references sidebar",
    icon: <Book className="h-6 w-6" />,
    features: ["WHO guidelines", "Zambia STGs", "Job aids", "Download links"],
    status: "Active",
    link: "#references",
    color: "bg-orange-100 border-orange-500"
  }
];

const quickStats = [
  { label: "Workflow Steps", value: "7", icon: <FileText className="h-4 w-4" /> },
  { label: "Clinical Decisions", value: "15+", icon: <GitBranch className="h-4 w-4" /> },
  { label: "Vital Thresholds", value: "25+", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Common Diagnoses", value: "10", icon: <Code className="h-4 w-4" /> },
  { label: "References", value: "8", icon: <Book className="h-4 w-4" /> },
  { label: "Age Groups", value: "4", icon: <Users className="h-4 w-4" /> }
];

const recentUpdates = [
  { 
    item: "IMCI Guidelines Updated", 
    time: "2 hours ago", 
    type: "guidelines",
    description: "WHO IMCI Chart Booklet 2019 references integrated"
  },
  { 
    item: "Zambia STGs Added", 
    time: "1 day ago", 
    type: "reference",
    description: "National treatment protocols incorporated"
  },
  { 
    item: "Flowchart Enhanced", 
    time: "2 days ago", 
    type: "feature",
    description: "Added export functionality and interactive nodes"
  }
];

export function MasterDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">SHDAI IMCI-Powered Pediatric Workflow</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive dashboard for WHO/UNICEF IMCI-based child health diagnostics in Zambia. 
          Navigate through interactive tools, clinical references, and decision support systems.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-2 p-4">
              {stat.icon}
              <div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboardSections.map((section) => (
          <Card key={section.id} className={`${section.color} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">{section.status}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{section.description}</p>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Key Features:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button asChild className="w-full">
                <a href={section.link}>
                  Access {section.title}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Updates & Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{update.item}</h5>
                    <span className="text-xs text-muted-foreground">{update.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{update.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-orange-900">Clinical Reminder</h5>
            <p className="text-sm text-orange-800">
              Always verify patient weight and age before calculating medication doses. 
              Refer to IMCI danger signs for immediate assessment priorities.
            </p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" asChild>
                <a href="#vitals">View Vital Thresholds</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#prescriptions">Access Dose Calculator</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p><strong>Clinical Guidelines:</strong> WHO IMCI Chart Booklet 2019, Zambia Standard Treatment Guidelines 2025</p>
        <p><strong>Target Users:</strong> Healthcare workers, parents, and administrators in Zambian pediatric care settings</p>
        <p><strong>Last Updated:</strong> January 2025 | <strong>Version:</strong> 2.0.0</p>
      </div>
    </div>
  );
}