import { 
  Card, 
  Group, 
  Text, 
  Badge, 
  Menu, 
  Stack, 
  ActionIcon,
  Button,
} from '@mantine/core';
import { 
  IconDots, 
  IconArrowUp,
  IconPlus,
  IconCircleFilled
} from '@tabler/icons-react';
import { useState } from 'react';
import { AssessmentDropdown, type Assessment } from './AssessmentDropdown';
import classes from './PatientCardV2.module.css';

interface PatientTag {
  id: string;
  type: 'account' | 'location' | 'modality' | 'type' | 'custom';
  label: string;
  value: string;
  color: string;
}

interface PatientDataV2 {
  id: string;
  name: string;
  assessments: Assessment[];
  engagement: number;
  lastCompletion: string;
  improvement: number;
  tags: PatientTag[];
}

interface PatientCardV2Props {
  patient: PatientDataV2;
  onPatientClick?: (id: string) => void;
  onAssessmentAdd?: (patientId: string, assessment: Assessment) => void;
  onAssessmentRemove?: (patientId: string, assessmentId: string) => void;
  onTagAdd?: (patientId: string, tag: PatientTag) => void;
}

export function PatientCardV2({ patient, onPatientClick, onAssessmentAdd, onAssessmentRemove, onTagAdd }: PatientCardV2Props) {

  const getTagColor = (type: string) => {
    switch (type) {
      case 'account': return '#4A90E2';
      case 'location': return '#F5A623';
      case 'modality': return '#BD10E0';
      case 'type': return '#F8E71C';
      default: return '#7ED321';
    }
  };

  const handleAddAssessment = (assessment: Assessment) => {
    onAssessmentAdd?.(patient.id, assessment);
  };

  const handleRemoveAssessment = (assessmentId: string) => {
    onAssessmentRemove?.(patient.id, assessmentId);
  };

  return (
    <>
      <Card 
        className={classes.card} 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder
        style={{ cursor: 'pointer', overflow: 'visible' }}
        onClick={() => onPatientClick?.(patient.id)}>
        {/* Header Row with Name, Assessment, and Metrics */}
        <Group justify="space-between" mb="sm" align="flex-start">
          {/* Left: Patient Name */}
          <Text fw={700} size="lg" className={classes.patientName}>
            {patient.name}
          </Text>

          {/* Center: Assessment Dropdown */}
          <AssessmentDropdown
            assessments={patient.assessments || []}
            patientName={patient.name}
            patientId={patient.id}
            onAssessmentAdd={handleAddAssessment}
            onAssessmentRemove={handleRemoveAssessment}
          />

          {/* Right: Status Metrics */}
          <Group gap="md" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" c="dimmed">Engagement</Text>
              <Text size="md" fw={600}>{patient.engagement}%</Text>
            </Stack>
            <Stack gap={2}>
              <Text size="xs" c="dimmed">Last Completion</Text>
              <Text size="sm">{patient.lastCompletion}</Text>
            </Stack>
            <Stack gap={2}>
              <Text size="xs" c="dimmed">Improvement</Text>
              <Group gap={2}>
                <IconArrowUp size={14} color="#2D7A32" />
                <Text size="md" fw={600} c="green">{patient.improvement}%</Text>
              </Group>
            </Stack>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots size={20} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>View Details</Menu.Item>
                <Menu.Item>Send Message</Menu.Item>
                <Menu.Item>Export Data</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red">Archive Patient</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        {/* Action Links Row */}
        <Group gap="xs" mb="md">
          <Text 
            size="sm" 
            c="blue" 
            className={classes.actionLink}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Results clicked for', patient.name);
            }}
            style={{ cursor: 'pointer' }}
          >
            Results
          </Text>
          <Text size="sm" c="dimmed">|</Text>
          <Text 
            size="sm" 
            c="blue" 
            className={classes.actionLink}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Notes clicked for', patient.name);
            }}
            style={{ cursor: 'pointer' }}
          >
            Notes
          </Text>
          <Text size="sm" c="dimmed">|</Text>
          <Text 
            size="sm" 
            c="blue" 
            className={classes.actionLink}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Manage clicked for', patient.name);
            }}
            style={{ cursor: 'pointer' }}
          >
            Manage
          </Text>
        </Group>

        {/* Tags System */}
        <Group gap="xs">
          {patient.tags.map((tag) => (
            <Badge
              key={tag.id}
              leftSection={<IconCircleFilled size={8} />}
              variant="light"
              size="sm"
              className={classes.tag}
              style={{ 
                backgroundColor: `${getTagColor(tag.type)}15`,
                color: getTagColor(tag.type),
                borderColor: getTagColor(tag.type)
              }}
            >
              {tag.label}: {tag.value}
            </Badge>
          ))}
          <ActionIcon 
            variant="light" 
            color="green" 
            size="sm"
            onClick={() => {
              // Handle add tag
              const newTag: PatientTag = {
                id: Date.now().toString(),
                type: 'custom',
                label: 'New Tag',
                value: 'Value',
                color: '#7ED321'
              };
              onTagAdd?.(patient.id, newTag);
            }}
          >
            <IconPlus size={14} />
          </ActionIcon>
        </Group>
      </Card>
    </>
  );
}