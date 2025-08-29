import { Card, Group, Text, ActionIcon, Badge, Menu, Button, Stack } from '@mantine/core';
import { IconFlag, IconMessageCircle, IconNotes, IconPlus, IconChevronDown, IconFlask } from '@tabler/icons-react';
import { useState } from 'react';
import { AssessmentsDropdown } from './AssessmentsDropdown';
import classes from './PatientCard.module.css';

interface PatientData {
  id: string;
  name: string;
  assessment: number;
  results: string;
  notesMessages: number;
  notes: number;
  lastCompletion: string;
  nextVisit: string;
  lastLab: string;
  flagged: boolean;
}

interface PatientCardProps {
  patient: PatientData;
  onFlagToggle?: (id: string) => void;
}

export function PatientCard({ patient, onFlagToggle }: PatientCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlagged, setIsFlagged] = useState(patient.flagged);

  const handleFlagClick = () => {
    setIsFlagged(!isFlagged);
    onFlagToggle?.(patient.id);
  };

  // Calculate results percentage
  const getResultsPercentage = () => {
    if (patient.results === 'Complete') return '100%';
    if (patient.results.includes('%')) return patient.results;
    return patient.results;
  };

  return (
    <Card
      className={classes.card}
      shadow={isHovered ? 'md' : 'sm'}
      padding="md"
      radius="md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Header Row */}
      <Group justify="space-between" mb="sm" className={classes.headerRow}>
        {/* Left Section: Name */}
        <Text fw={600} size="xl" className={classes.patientName}>
          {patient.name}
        </Text>

        {/* Middle Section: Assessment and Results */}
        <Group gap="xl" className={classes.middleSection}>
          <AssessmentsDropdown 
            size="sm" 
            variant="light" 
            patientName={patient.name}
            compact={true}
          />
          <div>
            <Text size="xs" c="dimmed" fw={500} mb={2}>Result</Text>
            <Badge
              variant="light"
              color={getResultsPercentage() === '100%' ? 'green' : 'blue'}
              size="md"
            >
              {getResultsPercentage()}
            </Badge>
          </div>
        </Group>

        {/* Right Section: Dates and Add button */}
        <Group gap="md" className={classes.rightSection}>
          <div className={classes.dateGroup}>
            <Text size="xs" c="dimmed">Last: {patient.lastCompletion}</Text>
            <Text size="xs" c="blue" fw={500}>Next: {patient.nextVisit}</Text>
          </div>
          
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="light" color="blue" size="lg">
                <IconPlus size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Add Assessment</Menu.Label>
              <Menu.Item>PHQ-9 Depression</Menu.Item>
              <Menu.Item>GAD-7 Anxiety</Menu.Item>
              <Menu.Item>HRSN Screening</Menu.Item>
              <Menu.Item>Beck Depression</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            variant={isFlagged ? 'filled' : 'subtle'}
            color={isFlagged ? 'red' : 'gray'}
            onClick={handleFlagClick}
          >
            <IconFlag size={18} />
          </ActionIcon>
        </Group>
      </Group>

      {/* Under Name Row: Notes and Messages */}
      <Group gap="lg" mb="sm" className={classes.underNameRow}>
        <Group gap={6}>
          <IconNotes size={16} className={classes.icon} />
          <Text size="sm">Notes: {patient.notes}</Text>
        </Group>
        <Group gap={6}>
          <IconMessageCircle size={16} className={classes.icon} />
          <Text size="sm">Messages: {patient.notesMessages}</Text>
        </Group>
      </Group>

      {/* Last Lab Row */}
      <Group gap={6}>
        <IconFlask size={16} className={classes.icon} />
        <Text size="sm" c="dimmed">Last Lab: {patient.lastLab}</Text>
      </Group>
    </Card>
  );
}