import React, { useState } from 'react';
import { Menu, Button, Group, Text, Badge } from '@mantine/core';
import { IconChevronDown, IconClipboardList, IconBrain, IconStethoscope, IconShield } from '@tabler/icons-react';
import { HRSNQuestionnaireModal } from './HRSNQuestionnaireModal';
import { PHQ9QuestionnaireModal } from './PHQ9QuestionnaireModal';

interface AssessmentsDropdownProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'light' | 'outline' | 'default' | 'subtle' | 'transparent';
  patientName?: string;
  compact?: boolean;
}

interface AssessmentStatus {
  name: string;
  status: 'up-to-date' | 'overdue' | 'not-started';
  lastCompleted?: string;
  icon: React.ReactNode;
}

export function AssessmentsDropdown({ 
  size = 'sm', 
  variant = 'light',
  patientName = '',
  compact = false
}: AssessmentsDropdownProps) {
  const [isHRSNOpen, setIsHRSNOpen] = useState(false);
  const [isPHQ9Open, setIsPHQ9Open] = useState(false);
  const [isPRIMEMDOpen, setIsPRIMEMDOpen] = useState(false);
  const [isBergerOpen, setIsBergerOpen] = useState(false);

  // Mock assessment data - in a real app, this would come from your backend
  const assessments: AssessmentStatus[] = [
    {
      name: 'HRSN Screening',
      status: 'up-to-date',
      lastCompleted: '2024-01-15',
      icon: <IconClipboardList size={16} />
    },
    {
      name: 'PHQ-9 Depression',
      status: 'overdue',
      lastCompleted: '2023-12-01',
      icon: <IconBrain size={16} />
    },
    {
      name: 'PRIME-MD',
      status: 'not-started',
      icon: <IconStethoscope size={16} />
    },
    {
      name: 'BERGER HIV Stigma',
      status: 'up-to-date',
      lastCompleted: '2024-01-10',
      icon: <IconShield size={16} />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up-to-date':
        return 'green';
      case 'overdue':
        return 'red';
      case 'not-started':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'up-to-date':
        return 'Up to Date';
      case 'overdue':
        return 'Overdue';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const handleAssessmentClick = (assessment: AssessmentStatus) => {
    switch (assessment.name) {
      case 'HRSN Screening':
        setIsHRSNOpen(true);
        break;
      case 'PHQ-9 Depression':
        setIsPHQ9Open(true);
        break;
      case 'PRIME-MD':
        setIsPRIMEMDOpen(true);
        break;
      case 'BERGER HIV Stigma':
        setIsBergerOpen(true);
        break;
    }
  };

  return (
    <>
      <Menu shadow="md" width={compact ? 300 : 400}>
        <Menu.Target>
          <Button 
            size={size} 
            variant={variant}
            rightSection={<IconChevronDown size={14} />}
          >
            {compact ? '4 Assessments' : 'Assessments'}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>
            <Text size="sm" fw={500} mb="xs">Assessment Status</Text>
          </Menu.Label>
          
          {assessments.map((assessment, index) => (
            <Menu.Item
              key={index}
              leftSection={assessment.icon}
              onClick={() => handleAssessmentClick(assessment)}
            >
              <Group justify="space-between" w="100%">
                <Text size="sm">{assessment.name}</Text>
                <Group gap="xs">
                  <Badge 
                    size="xs" 
                    color={getStatusColor(assessment.status)}
                    variant="light"
                  >
                    {getStatusText(assessment.status)}
                  </Badge>
                  {assessment.lastCompleted && (
                    <Text size="xs" c="dimmed">
                      {new Date(assessment.lastCompleted).toLocaleDateString()}
                    </Text>
                  )}
                </Group>
              </Group>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      {/* Render only the modals that are open */}
      {isHRSNOpen && (
        <HRSNQuestionnaireModal
          opened={isHRSNOpen}
          onClose={() => setIsHRSNOpen(false)}
          patientName={patientName}
        />
      )}
      {isPHQ9Open && (
        <PHQ9QuestionnaireModal
          opened={isPHQ9Open}
          onClose={() => setIsPHQ9Open(false)}
          patientName={patientName}
        />
      )}
      {isPRIMEMDOpen && (
        <div>PRIME-MD Modal (to be implemented)</div>
      )}
      {isBergerOpen && (
        <div>BERGER HIV Stigma Modal (to be implemented)</div>
      )}
    </>
  );
}
