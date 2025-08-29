import { Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { useMedplumProfile, useMedplumNavigate } from '@medplum/react';
import { notifications } from '@mantine/notifications';
import { PatientCardV2 } from '../components/PatientCardV2';
import { SimpleDashboardLayout } from '../components/SimpleDashboardLayout';
import classes from './PatientDashboardV2.module.css';

// Mock data with new structure
const mockPatientsV2 = [
  {
    id: '1',
    name: 'Cary Douglas',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9' },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7' },
      { id: 'qfv30', name: 'Frequency - Alcohol', code: 'QFV-30days' },
      { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI' },
    ],
    engagement: 87.9,
    lastCompletion: 'November 02',
    improvement: 629.6,
    tags: [
      { id: '1', type: 'account' as const, label: 'Account', value: 'Complete', color: '#4A90E2' },
      { id: '2', type: 'location' as const, label: 'Location', value: 'Toronto', color: '#F5A623' },
      { id: '3', type: 'modality' as const, label: 'Modality', value: 'CBT', color: '#BD10E0' },
      { id: '4', type: 'type' as const, label: 'Type', value: 'Individual', color: '#F8E71C' },
    ]
  },
  {
    id: '2',
    name: 'Diane Smart',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9' },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7' },
      { id: 'swls', name: 'Life Satisfaction', code: 'SWLS' },
      { id: 'rosenberg', name: 'Self-Esteem', code: 'ROSENBERG-SES' },
      { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI' },
    ],
    engagement: 92.6,
    lastCompletion: 'November 05',
    improvement: 105.8,
    tags: [
      { id: '1', type: 'account' as const, label: 'Account', value: 'Complete', color: '#4A90E2' },
      { id: '2', type: 'location' as const, label: 'Location', value: 'North York', color: '#F5A623' },
      { id: '3', type: 'modality' as const, label: 'Modality', value: 'IPT', color: '#BD10E0' },
      { id: '4', type: 'type' as const, label: 'Type', value: 'Individual', color: '#F8E71C' },
    ]
  },
  {
    id: '3',
    name: 'Fred Black',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9' },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7' },
      { id: 'brwai', name: 'Therapeutic Alliance', code: 'BR-WAI' },
    ],
    engagement: 87.0,
    lastCompletion: 'November 02',
    improvement: 40.0,
    tags: [
      { id: '1', type: 'account' as const, label: 'Account', value: 'No Account', color: '#4A90E2' },
      { id: '2', type: 'location' as const, label: 'Location', value: 'North York', color: '#F5A623' },
      { id: '3', type: 'modality' as const, label: 'Modality', value: 'CBT', color: '#BD10E0' },
      { id: '4', type: 'type' as const, label: 'Type', value: 'Couples', color: '#F8E71C' },
    ]
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9' },
      { id: 'spin', name: 'Social Anxiety', code: 'SPIN' },
      { id: 'adhd', name: 'ADHD Self Report Scale', code: 'ADHD-SRS' },
      { id: 'swls', name: 'Life Satisfaction', code: 'SWLS' },
    ],
    engagement: 95.3,
    lastCompletion: 'November 08',
    improvement: 82.4,
    tags: [
      { id: '1', type: 'account' as const, label: 'Account', value: 'Complete', color: '#4A90E2' },
      { id: '2', type: 'location' as const, label: 'Location', value: 'Toronto', color: '#F5A623' },
      { id: '3', type: 'modality' as const, label: 'Modality', value: 'CBT', color: '#BD10E0' },
      { id: '4', type: 'type' as const, label: 'Type', value: 'Individual', color: '#F8E71C' },
      { id: '5', type: 'custom' as const, label: 'Program', value: 'Intensive', color: '#7ED321' },
    ]
  },
  {
    id: '5',
    name: 'Michael Chen',
    assessments: [
      { id: 'phq9', name: 'Depression', code: 'PHQ-9' },
      { id: 'gad7', name: 'Generalized Anxiety', code: 'GAD-7' },
      { id: 'ocir', name: 'Obsessive-Compulsive', code: 'OCI-R' },
      { id: 'bgq', name: 'Brief Grief Questionnaire', code: 'BGQ' },
    ],
    engagement: 78.5,
    lastCompletion: 'October 30',
    improvement: 156.3,
    tags: [
      { id: '1', type: 'account' as const, label: 'Account', value: 'Complete', color: '#4A90E2' },
      { id: '2', type: 'location' as const, label: 'Location', value: 'Scarborough', color: '#F5A623' },
      { id: '3', type: 'modality' as const, label: 'Modality', value: 'IPT', color: '#BD10E0' },
      { id: '4', type: 'type' as const, label: 'Type', value: 'Individual', color: '#F8E71C' },
      { id: '5', type: 'custom' as const, label: 'Insurance', value: 'Blue Cross', color: '#7ED321' },
    ]
  }
];

export function PatientDashboardV2() {
  const profile = useMedplumProfile();
  const navigate = useMedplumNavigate();
  const [patients, setPatients] = useState(mockPatientsV2);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get provider name from profile
  const providerName = profile?.name?.[0]?.text || 
    (profile?.name?.[0]?.given?.[0] && profile?.name?.[0]?.family 
      ? `${profile.name[0].given[0]} ${profile.name[0].family}`
      : 'Sally Smith');

  const handlePatientClick = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      // Navigate to the mock patient detail page
      navigate(`/Patient/mock/${patientId}`);
    }
  };

  const handleAssessmentAdd = (patientId: string, assessment: any) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, assessments: [...patient.assessments, assessment] }
          : patient
      )
    );
  };

  const handleAssessmentRemove = (patientId: string, assessmentId: string) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, assessments: patient.assessments.filter(a => a.id !== assessmentId) }
          : patient
      )
    );
  };

  const handleTagAdd = (patientId: string, tag: any) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, tags: [...patient.tags, tag] }
          : patient
      )
    );
  };

  const handleAddPatient = () => {
    notifications.show({
      title: 'Add Patient',
      message: 'Add patient functionality would open here',
      color: 'green',
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter patients based on search
  const filteredPatients = patients.filter((patient) => {
    return patient.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SimpleDashboardLayout
      patientCount={filteredPatients.length}
      onSearch={handleSearch}
      onAddPatient={handleAddPatient}
      userName={providerName}
    >
      {/* Patient Cards */}
      <Stack gap="md" style={{ width: '100%' }}>
        {filteredPatients.map((patient) => (
          <PatientCardV2
            key={patient.id}
            patient={patient}
            onPatientClick={handlePatientClick}
            onAssessmentAdd={handleAssessmentAdd}
            onAssessmentRemove={handleAssessmentRemove}
            onTagAdd={handleTagAdd}
          />
        ))}
      </Stack>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className={classes.emptyState}>
          <Text size="lg" c="dimmed">
            No patients found matching your criteria
          </Text>
        </div>
      )}
    </SimpleDashboardLayout>
  );
}