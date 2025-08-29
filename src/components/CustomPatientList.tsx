import React, { useState } from 'react';
import { Paper, Button, Group, Table, Checkbox, Text, ActionIcon } from '@mantine/core';
import { SearchControl, useMedplum } from '@medplum/react';
import { Patient } from '@medplum/fhirtypes';
import { SearchRequest } from '@medplum/core';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { AssessmentsDropdown } from './AssessmentsDropdown';

interface CustomPatientListProps {
  search: SearchRequest;
  onNew?: () => void;
  onChange?: (e: any) => void;
}

export function CustomPatientList({ search, onNew, onChange }: CustomPatientListProps) {
  const medplum = useMedplum();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const results = await medplum.searchResources('Patient', {
          _count: search.count || 20,
          _fields: search.fields?.join(',') || 'name,email,gender',
          _sort: search.sortRules?.[0]?.code === '_lastUpdated' ? '-_lastUpdated' : undefined
        });
        setPatients(results);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    if (search.resourceType === 'Patient') {
      fetchPatients();
    }
  }, [medplum, search]);



  if (search.resourceType !== 'Patient') {
    return (
      <Paper shadow="xs" m="md" p="xs">
        <SearchControl
          checkboxesEnabled={true}
          search={search}
          onNew={onNew}
          onChange={onChange}
        />
      </Paper>
    );
  }

  if (loading) {
    return <div>Loading patients...</div>;
  }

  return (
    <>
      <Paper shadow="xs" m="md" p="xs">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={500}>Patients</Text>
          {onNew && (
            <Button onClick={onNew} leftSection={<IconEdit size={16} />}>
              New Patient
            </Button>
          )}
        </Group>
        
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Checkbox /></Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {patients.map((patient) => {
              const patientName = patient.name?.[0]?.given?.join(' ') + ' ' + patient.name?.[0]?.family || 'Unknown';
              return (
                <Table.Tr key={patient.id}>
                  <Table.Td><Checkbox /></Table.Td>
                  <Table.Td>{patientName}</Table.Td>
                  <Table.Td>{patient.telecom?.find(t => t.system === 'email')?.value || ''}</Table.Td>
                  <Table.Td>{patient.gender || ''}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <AssessmentsDropdown
                        size="xs"
                        variant="light"
                      />
                      <ActionIcon size="sm" variant="light">
                        <IconEye size={14} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Paper>

    </>
  );
}
