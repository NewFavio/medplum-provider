import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  Group, 
  Stack, 
  Paper,
  Transition,
  ActionIcon,
  Modal,
  ScrollArea,
  Card,
  Badge,
  Divider,
  Portal
} from '@mantine/core';
import { 
  IconChevronDown, 
  IconChevronUp,
  IconX,
  IconPlus
} from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import classes from './AssessmentDropdown.module.css';

export interface Assessment {
  id: string;
  name: string;
  code: string;
  description?: string;
  questions?: number;
}

interface AssessmentDropdownProps {
  assessments: Assessment[];
  patientName: string;
  patientId: string;
  onAssessmentAdd?: (assessment: Assessment) => void;
  onAssessmentRemove?: (assessmentId: string) => void;
  className?: string;
}

// Comprehensive Assessment Library
const assessmentLibrary: Assessment[] = [
  // Mental Health Assessments
  { id: 'phq9', name: 'Depression', code: 'PHQ-9', description: 'Patient Health Questionnaire-9', questions: 9 },
  { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7', description: 'Generalized Anxiety Disorder 7-item scale', questions: 7 },
  { id: 'spin', name: 'Social Anxiety', code: 'SPIN', description: 'Social Phobia Inventory', questions: 17 },
  { id: 'ocir', name: 'Obsessive-Compulsive', code: 'OCI-R', description: 'Obsessive-Compulsive Inventory-Revised', questions: 18 },
  
  // Behavioral Assessments
  { id: 'qfv30', name: 'Frequency - Alcohol', code: 'QFV-30days', description: 'Alcohol frequency questionnaire', questions: 4 },
  { id: 'edeq', name: 'Eating Disorders', code: 'EDE-Q', description: 'Eating Disorder Examination Questionnaire', questions: 34 },
  { id: 'adhd', name: 'ADHD Self Report Scale', code: 'ADHD-SRS', description: 'ADHD screening tool', questions: 18 },
  
  // Therapeutic Assessments
  { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI', description: 'Barrett-Lennard Relationship Inventory', questions: 12 },
  { id: 'rosenberg', name: 'Self-Esteem', code: 'ROSENBERG-SES', description: 'Rosenberg Self-Esteem Scale', questions: 10 },
  { id: 'swls', name: 'Life Satisfaction', code: 'SWLS', description: 'Satisfaction with Life Scale', questions: 5 },
  { id: 'bgq', name: 'Brief Grief Questionnaire', code: 'BGQ', description: 'Grief assessment tool', questions: 5 },
  
  // Additional Assessments
  { id: 'pcl5', name: 'PTSD Checklist', code: 'PCL-5', description: 'PTSD Checklist for DSM-5', questions: 20 },
  { id: 'bdi2', name: 'Beck Depression Inventory', code: 'BDI-II', description: 'Beck Depression Inventory-II', questions: 21 },
  { id: 'bas', name: 'Beck Anxiety Inventory', code: 'BAI', description: 'Beck Anxiety Inventory', questions: 21 },
  { id: 'pss', name: 'Perceived Stress Scale', code: 'PSS', description: 'Perceived Stress Scale', questions: 10 },
];

export function AssessmentDropdown({ 
  assessments = [], 
  patientName,
  patientId,
  onAssessmentAdd, 
  onAssessmentRemove,
  className
}: AssessmentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Close dropdown when clicking outside
  useClickOutside(() => setIsOpen(false), null, dropdownRef.current ? [dropdownRef.current] : []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleRemoveAssessment = (assessmentId: string, assessmentName: string) => {
    if (confirmRemove === assessmentId) {
      onAssessmentRemove?.(assessmentId);
      notifications.show({
        title: 'Assessment Removed',
        message: `${assessmentName} has been removed from ${patientName}`,
        color: 'red',
      });
      setConfirmRemove(null);
    } else {
      setConfirmRemove(assessmentId);
      // Reset confirmation after 3 seconds
      setTimeout(() => setConfirmRemove(null), 3000);
    }
  };

  const handleAddAssessment = (assessment: Assessment) => {
    // Check if assessment already exists
    const exists = assessments.some(a => a.id === assessment.id);
    if (exists) {
      notifications.show({
        title: 'Assessment Already Added',
        message: `${assessment.name} is already assigned to ${patientName}`,
        color: 'yellow',
      });
      return;
    }
    
    onAssessmentAdd?.(assessment);
    notifications.show({
      title: 'Assessment Added',
      message: `${assessment.name} has been added to ${patientName}`,
      color: 'green',
    });
  };

  const formatAssessmentDisplay = (assessment: Assessment) => {
    return `${assessment.name} (${assessment.code})`;
  };

  return (
    <div 
      className={`${classes.dropdownContainer} ${className}`} 
      style={{ zIndex: isOpen ? 10000 : 1 }}
    >
      {/* Trigger Button */}
      <Button
        ref={buttonRef}
        variant="subtle"
        size="sm"
        rightSection={isOpen ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        onClick={(e) => {
          e.stopPropagation();
          if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
              top: rect.bottom + 8,
              left: rect.left
            });
          }
          setIsOpen(!isOpen);
        }}
        className={classes.triggerButton}
      >
        {assessments.length} assessments
      </Button>

      {/* Dropdown Content */}
      <Portal>
        <Transition
          mounted={isOpen}
          transition="slide-down"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <Paper
              ref={dropdownRef}
              style={{
                ...styles,
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 99999
              }}
              className={classes.dropdown}
              shadow="md"
              p="sm"
              withBorder
              onClick={(e) => e.stopPropagation()}
            >
            <Stack gap="xs">
              {/* Assessment List */}
              {assessments.length > 0 ? (
                <>
                  {assessments.map((assessment) => (
                    <Group
                      key={assessment.id}
                      justify="space-between"
                      className={classes.assessmentItem}
                      wrap="nowrap"
                    >
                      <div className={classes.assessmentText}>
                        <Text fw={500} size="sm" className={classes.assessmentName}>
                          {assessment.name}
                        </Text>
                        <Text size="sm" c="dimmed" className={classes.assessmentCode}>
                          ({assessment.code})
                        </Text>
                      </div>
                      <ActionIcon
                        size="sm"
                        variant={confirmRemove === assessment.id ? 'filled' : 'subtle'}
                        color={confirmRemove === assessment.id ? 'red' : 'gray'}
                        onClick={() => handleRemoveAssessment(assessment.id, assessment.name)}
                        className={classes.removeButton}
                        title={confirmRemove === assessment.id ? 'Click again to confirm' : 'Remove assessment'}
                      >
                        <IconX size={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                </>
              ) : (
                <Text size="sm" c="dimmed" ta="center" py="md">
                  No assessments assigned
                </Text>
              )}

              <Divider />

              {/* Add Assessment Button */}
              <Button
                fullWidth
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                  setIsOpen(false);
                  setLibraryModalOpen(true);
                }}
                className={classes.addButton}
              >
                Add Assessment
              </Button>
            </Stack>
          </Paper>
        )}
      </Transition>
    </Portal>

      {/* Assessment Library Modal */}
      <Modal
        opened={libraryModalOpen}
        onClose={() => setLibraryModalOpen(false)}
        title={
          <div>
            <Text size="lg" fw={600}>Assessment Library</Text>
            <Text size="sm" c="dimmed">Select assessments for {patientName}</Text>
          </div>
        }
        size="lg"
        className={classes.libraryModal}
      >
        <ScrollArea h={500}>
          <Stack gap="sm">
            {/* Mental Health Section */}
            <div>
              <Text size="sm" fw={600} c="dimmed" mb="xs">MENTAL HEALTH</Text>
              {assessmentLibrary.filter(a => ['phq9', 'gad7', 'spin', 'ocir', 'pcl5', 'bdi2', 'bas', 'pss'].includes(a.id)).map((assessment) => (
                <Card key={assessment.id} padding="sm" mb="xs" withBorder className={classes.libraryItem}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{assessment.name}</Text>
                      <Group gap="xs">
                        <Badge size="sm" variant="light">{assessment.code}</Badge>
                        <Text size="xs" c="dimmed">• {assessment.questions} Questions</Text>
                      </Group>
                      {assessment.description && (
                        <Text size="xs" c="dimmed" mt={4}>{assessment.description}</Text>
                      )}
                    </div>
                    <Group gap="xs">
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => {
                          // View sample functionality
                          notifications.show({
                            title: 'View Sample',
                            message: 'Sample viewing functionality would open here',
                          });
                        }}
                      >
                        View Sample
                      </Button>
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => handleAddAssessment(assessment)}
                        disabled={assessments.some(a => a.id === assessment.id)}
                      >
                        {assessments.some(a => a.id === assessment.id) ? 'Added' : 'Add'}
                      </Button>
                    </Group>
                  </Group>
                </Card>
              ))}
            </div>

            {/* Behavioral Section */}
            <div>
              <Text size="sm" fw={600} c="dimmed" mb="xs">BEHAVIORAL</Text>
              {assessmentLibrary.filter(a => ['qfv30', 'edeq', 'adhd'].includes(a.id)).map((assessment) => (
                <Card key={assessment.id} padding="sm" mb="xs" withBorder className={classes.libraryItem}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{assessment.name}</Text>
                      <Group gap="xs">
                        <Badge size="sm" variant="light">{assessment.code}</Badge>
                        <Text size="xs" c="dimmed">• {assessment.questions} Questions</Text>
                      </Group>
                      {assessment.description && (
                        <Text size="xs" c="dimmed" mt={4}>{assessment.description}</Text>
                      )}
                    </div>
                    <Group gap="xs">
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => {
                          notifications.show({
                            title: 'View Sample',
                            message: 'Sample viewing functionality would open here',
                          });
                        }}
                      >
                        View Sample
                      </Button>
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => handleAddAssessment(assessment)}
                        disabled={assessments.some(a => a.id === assessment.id)}
                      >
                        {assessments.some(a => a.id === assessment.id) ? 'Added' : 'Add'}
                      </Button>
                    </Group>
                  </Group>
                </Card>
              ))}
            </div>

            {/* Therapeutic Section */}
            <div>
              <Text size="sm" fw={600} c="dimmed" mb="xs">THERAPEUTIC</Text>
              {assessmentLibrary.filter(a => ['brwai', 'rosenberg', 'swls', 'bgq'].includes(a.id)).map((assessment) => (
                <Card key={assessment.id} padding="sm" mb="xs" withBorder className={classes.libraryItem}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{assessment.name}</Text>
                      <Group gap="xs">
                        <Badge size="sm" variant="light">{assessment.code}</Badge>
                        <Text size="xs" c="dimmed">• {assessment.questions} Questions</Text>
                      </Group>
                      {assessment.description && (
                        <Text size="xs" c="dimmed" mt={4}>{assessment.description}</Text>
                      )}
                    </div>
                    <Group gap="xs">
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => {
                          notifications.show({
                            title: 'View Sample',
                            message: 'Sample viewing functionality would open here',
                          });
                        }}
                      >
                        View Sample
                      </Button>
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => handleAddAssessment(assessment)}
                        disabled={assessments.some(a => a.id === assessment.id)}
                      >
                        {assessments.some(a => a.id === assessment.id) ? 'Added' : 'Add'}
                      </Button>
                    </Group>
                  </Group>
                </Card>
              ))}
            </div>
          </Stack>
        </ScrollArea>
      </Modal>
    </div>
  );
}