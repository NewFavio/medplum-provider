import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Badge,
  Card,
  Grid,
  Divider
} from '@mantine/core';
import { 
  IconArrowLeft, 
  IconUser, 
  IconClipboard,
  IconNotes,
  IconFileText,
  IconActivity
} from '@tabler/icons-react';
import { DashboardLayout } from '../components/DashboardLayout';
import classes from './PatientDetailView.module.css';

// Mock data - in production this would come from API
const mockPatientsData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Cary Douglas',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    phone: '(416) 555-0123',
    email: 'cary.douglas@email.com',
    address: '123 Queen St W, Toronto, ON M5H 2M9',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9', lastCompleted: '2024-11-02', score: 12 },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7', lastCompleted: '2024-11-02', score: 8 },
      { id: 'qfv30', name: 'Frequency - Alcohol', code: 'QFV-30days', lastCompleted: '2024-10-28', score: 3 },
      { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI', lastCompleted: '2024-11-01', score: 85 },
    ],
    engagement: 87.9,
    improvement: 629.6,
    lastVisit: '2024-11-02',
    nextAppointment: '2024-11-09 2:00 PM',
    provider: 'Dr. Sally Smith',
    diagnosis: ['Major Depressive Disorder', 'Generalized Anxiety Disorder'],
    medications: ['Sertraline 50mg', 'Lorazepam 1mg PRN'],
    insuranceProvider: 'Blue Cross',
    insuranceId: 'BC123456789'
  },
  '2': {
    id: '2',
    name: 'Diane Smart',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    phone: '(416) 555-0456',
    email: 'diane.smart@email.com',
    address: '456 King St E, North York, ON M2N 3Y7',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9', lastCompleted: '2024-11-05', score: 6 },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7', lastCompleted: '2024-11-05', score: 5 },
      { id: 'swls', name: 'Life Satisfaction', code: 'SWLS', lastCompleted: '2024-11-03', score: 28 },
    ],
    engagement: 92.6,
    improvement: 105.8,
    lastVisit: '2024-11-05',
    nextAppointment: '2024-11-12 3:30 PM',
    provider: 'Dr. Sally Smith',
    diagnosis: ['Adjustment Disorder with Mixed Anxiety and Depression'],
    medications: ['Escitalopram 10mg'],
    insuranceProvider: 'Sun Life',
    insuranceId: 'SL987654321'
  },
  '3': {
    id: '3',
    name: 'Fred Black',
    dateOfBirth: '1978-11-08',
    gender: 'Male',
    phone: '(416) 555-0789',
    email: 'fred.black@email.com',
    address: '789 Yonge St, North York, ON M2M 4E9',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9', lastCompleted: '2024-11-02', score: 15 },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7', lastCompleted: '2024-11-02', score: 11 },
      { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI', lastCompleted: '2024-10-30', score: 72 },
    ],
    engagement: 87.0,
    improvement: 40.0,
    lastVisit: '2024-11-02',
    nextAppointment: '2024-11-10 10:00 AM',
    provider: 'Dr. Sally Smith',
    diagnosis: ['Major Depressive Disorder', 'Social Anxiety Disorder'],
    medications: ['Venlafaxine 150mg', 'Propranolol 20mg PRN'],
    insuranceProvider: 'No Insurance',
    insuranceId: 'N/A'
  },
  '4': {
    id: '4',
    name: 'Sarah Johnson',
    dateOfBirth: '1995-05-18',
    gender: 'Female',
    phone: '(416) 555-0234',
    email: 'sarah.johnson@email.com',
    address: '321 Bay St, Toronto, ON M5J 2R8',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9', lastCompleted: '2024-11-08', score: 4 },
      { id: 'spin', name: 'Social Anxiety', code: 'SPIN', lastCompleted: '2024-11-08', score: 22 },
      { id: 'adhd', name: 'ADHD Self Report Scale', code: 'ADHD-SRS', lastCompleted: '2024-11-06', score: 42 },
    ],
    engagement: 95.3,
    improvement: 82.4,
    lastVisit: '2024-11-08',
    nextAppointment: '2024-11-15 1:00 PM',
    provider: 'Dr. Sally Smith',
    diagnosis: ['ADHD Combined Type', 'Social Anxiety Disorder'],
    medications: ['Methylphenidate 20mg', 'Sertraline 100mg'],
    insuranceProvider: 'Blue Cross',
    insuranceId: 'BC456789123'
  },
  '5': {
    id: '5',
    name: 'Michael Chen',
    dateOfBirth: '1982-09-30',
    gender: 'Male',
    phone: '(416) 555-0567',
    email: 'michael.chen@email.com',
    address: '654 Dundas St E, Scarborough, ON M4M 1S5',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9', lastCompleted: '2024-10-30', score: 18 },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7', lastCompleted: '2024-10-30', score: 14 },
      { id: 'ocir', name: 'Obsessive-Compulsive', code: 'OCI-R', lastCompleted: '2024-10-28', score: 32 },
    ],
    engagement: 78.5,
    improvement: 156.3,
    lastVisit: '2024-10-30',
    nextAppointment: '2024-11-11 4:00 PM',
    provider: 'Dr. Sally Smith',
    diagnosis: ['OCD', 'Major Depressive Disorder', 'Complicated Grief'],
    medications: ['Fluvoxamine 200mg', 'Clonazepam 0.5mg BID'],
    insuranceProvider: 'Blue Cross',
    insuranceId: 'BC789123456'
  }
};

export function PatientDetailView() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  const patient = mockPatientsData[patientId || ''];
  
  if (!patient) {
    return (
      <DashboardLayout userName="Sally Smith">
        <Container>
          <Paper p="xl" radius="md" withBorder>
            <Text size="lg" c="dimmed" ta="center">
              Patient not found
            </Text>
            <Group justify="center" mt="md">
              <Button 
                leftSection={<IconArrowLeft size={16} />} 
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </Group>
          </Paper>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName="Sally Smith">
      <Container fluid className={classes.container}>
        {/* Header */}
        <Group justify="space-between" mb="lg">
          <Group>
            <Button 
              variant="subtle" 
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Title order={2}>{patient.name}</Title>
          </Group>
          <Group>
            <Button variant="outline" leftSection={<IconNotes size={16} />}>
              Add Note
            </Button>
            <Button leftSection={<IconClipboard size={16} />}>
              Start Assessment
            </Button>
          </Group>
        </Group>

        <Grid gutter="md">
          {/* Left Column - Patient Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              {/* Basic Information */}
              <Card withBorder className={classes.infoCard}>
                <Group mb="md">
                  <IconUser size={20} />
                  <Text fw={600}>Patient Information</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Date of Birth</Text>
                    <Text size="sm">{patient.dateOfBirth}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Gender</Text>
                    <Text size="sm">{patient.gender}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Phone</Text>
                    <Text size="sm">{patient.phone}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Email</Text>
                    <Text size="sm">{patient.email}</Text>
                  </Group>
                  <Divider my="xs" />
                  <Text size="sm" c="dimmed">Address</Text>
                  <Text size="sm">{patient.address}</Text>
                </Stack>
              </Card>

              {/* Insurance Information */}
              <Card withBorder className={classes.infoCard}>
                <Group mb="md">
                  <IconFileText size={20} />
                  <Text fw={600}>Insurance</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Provider</Text>
                    <Text size="sm">{patient.insuranceProvider}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">ID</Text>
                    <Text size="sm">{patient.insuranceId}</Text>
                  </Group>
                </Stack>
              </Card>

              {/* Appointments */}
              <Card withBorder className={classes.infoCard}>
                <Group mb="md">
                  <IconActivity size={20} />
                  <Text fw={600}>Appointments</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Last Visit</Text>
                    <Text size="sm">{patient.lastVisit}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Next Appointment</Text>
                    <Text size="sm" fw={600} c="green">{patient.nextAppointment}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Provider</Text>
                    <Text size="sm">{patient.provider}</Text>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>

          {/* Right Column - Clinical Info */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {/* Metrics */}
              <Card withBorder>
                <Text fw={600} mb="md">Performance Metrics</Text>
                <Group grow>
                  <Paper p="md" radius="md" bg="blue.0">
                    <Text size="xs" c="dimmed">Engagement</Text>
                    <Text size="xl" fw={700} c="blue">{patient.engagement}%</Text>
                  </Paper>
                  <Paper p="md" radius="md" bg="green.0">
                    <Text size="xs" c="dimmed">Improvement</Text>
                    <Text size="xl" fw={700} c="green">+{patient.improvement}%</Text>
                  </Paper>
                </Group>
              </Card>

              {/* Assessments */}
              <Card withBorder>
                <Text fw={600} mb="md">Recent Assessments</Text>
                <Stack gap="sm">
                  {patient.assessments.map((assessment: any) => (
                    <Paper key={assessment.id} p="sm" withBorder>
                      <Group justify="space-between">
                        <div>
                          <Text fw={500}>{assessment.name}</Text>
                          <Text size="xs" c="dimmed">Code: {assessment.code}</Text>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Badge color="blue" size="lg">{assessment.score}</Badge>
                          <Text size="xs" c="dimmed" mt={4}>
                            {assessment.lastCompleted}
                          </Text>
                        </div>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Card>

              {/* Diagnosis */}
              <Card withBorder>
                <Text fw={600} mb="md">Diagnosis</Text>
                <Group gap="xs">
                  {patient.diagnosis.map((diag: string) => (
                    <Badge key={diag} variant="light" color="grape">
                      {diag}
                    </Badge>
                  ))}
                </Group>
              </Card>

              {/* Medications */}
              <Card withBorder>
                <Text fw={600} mb="md">Current Medications</Text>
                <Group gap="xs">
                  {patient.medications.map((med: string) => (
                    <Badge key={med} variant="light" color="cyan">
                      {med}
                    </Badge>
                  ))}
                </Group>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}