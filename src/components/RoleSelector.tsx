
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Stethoscope, Shield, ChevronDown } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
  selectedRole: string | null;
}

const RoleSelector = ({ onRoleSelect, selectedRole }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'caregiver',
      name: 'Caregiver/Parent',
      icon: Users,
      description: 'Access symptom checker and child health records',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'healthWorker',
      name: 'Health Worker',
      icon: Stethoscope,
      description: 'Clinical decision support and patient management',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      description: 'System management and surveillance oversight',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const currentRole = roles.find(role => role.id === selectedRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          {currentRole ? (
            <>
              <currentRole.icon className="h-4 w-4" />
              <span>{currentRole.name}</span>
            </>
          ) : (
            <>
              <Users className="h-4 w-4" />
              <span>Select Role</span>
            </>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className="p-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.color}`}>
                <role.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{role.name}</div>
                <div className="text-sm text-gray-500 mt-1">{role.description}</div>
              </div>
              {selectedRole === role.id && (
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
