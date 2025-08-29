import { Container, Title, Grid, TextInput, Group, Select, Text } from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { useMedplumProfile } from '@medplum/react';
import { PatientCard } from '../components/PatientCard';
import classes from './PatientDashboard.module.css';

// Mock data for 6 patients
const mockPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    assessment: 3,
    results: '100%',
    notesMessages: 5,
    notes: 3,
    lastCompletion: '08/25',
    nextVisit: '09/15',
    lastLab: '08/20/25',
    flagged: false,
  },
  {
    id: '2',
    name: 'Michael Chen',
    assessment: 2,
    results: '85%',
    notesMessages: 2,
    notes: 7,
    lastCompletion: '08/20',
    nextVisit: '09/08',
    lastLab: '08/15/25',
    flagged: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    assessment: 5,
    results: '25%',
    notesMessages: 8,
    notes: 2,
    lastCompletion: '08/18',
    nextVisit: '09/03',
    lastLab: '08/10/25',
    flagged: false,
  },
  {
    id: '4',
    name: 'James Williams',
    assessment: 1,
    results: '100%',
    notesMessages: 0,
    notes: 5,
    lastCompletion: '08/28',
    nextVisit: '09/20',
    lastLab: '08/22/25',
    flagged: false,
  },
  {
    id: '5',
    name: 'Maria Garcia',
    assessment: 4,
    results: '75%',
    notesMessages: 3,
    notes: 1,
    lastCompletion: '08/22',
    nextVisit: '09/10',
    lastLab: '08/18/25',
    flagged: true,
  },
  {
    id: '6',
    name: 'David Thompson',
    assessment: 2,
    results: '50%',
    notesMessages: 6,
    notes: 4,
    lastCompletion: '08/15',
    nextVisit: '09/05',
    lastLab: '08/12/25',
    flagged: false,
  },
];

export function PatientDashboard() {
  const profile = useMedplumProfile();
  const [patients, setPatients] = useState(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>('all');
  
  // Get provider name from profile
  const providerName = profile?.name?.[0]?.text || profile?.name?.[0]?.given?.[0] + ' ' + profile?.name?.[0]?.family || 'Provider';

  const handleFlagToggle = (patientId: string) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, flagged: !patient.flagged } : patient
      )
    );
  };

  // Filter patients based on search and filter criteria
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'flagged' && patient.flagged) ||
      (filterStatus === 'complete' && patient.results === 'Complete') ||
      (filterStatus === 'pending' && patient.results === 'Pending');
    return matchesSearch && matchesFilter;
  });

  return (
    <Container fluid className={classes.container}>
      {/* Header Section */}
      <div className={classes.header}>
        <Title order={2} className={classes.title}>
          {providerName}: Patients List
        </Title>
        
        {/* Search and Filter Controls */}
        <Group gap="md" className={classes.controls}>
          <TextInput
            placeholder="Search patients..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className={classes.searchInput}
          />
          <Select
            placeholder="Filter by status"
            leftSection={<IconFilter size={16} />}
            value={filterStatus}
            onChange={setFilterStatus}
            data={[
              { value: 'all', label: 'All Patients' },
              { value: 'flagged', label: 'Flagged' },
              { value: 'complete', label: 'Complete' },
              { value: 'pending', label: 'Pending' },
            ]}
            className={classes.filterSelect}
          />
        </Group>
      </div>

      {/* Patient Cards - Single Column */}
      <div className={classes.cardsContainer}>
        {filteredPatients.map((patient) => (
          <div key={patient.id} className={classes.cardWrapper}>
            <PatientCard patient={patient} onFlagToggle={handleFlagToggle} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className={classes.emptyState}>
          <Text size="lg" c="dimmed">
            No patients found matching your criteria
          </Text>
        </div>
      )}
    </Container>
  );
}