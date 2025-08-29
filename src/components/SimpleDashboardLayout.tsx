import React from 'react';
import {
  Box,
  Group,
  Text,
  Button,
  TextInput,
} from '@mantine/core';
import {
  IconSearch,
  IconPlus,
} from '@tabler/icons-react';
import classes from './SimpleDashboardLayout.module.css';

interface SimpleDashboardLayoutProps {
  children: React.ReactNode;
  patientCount?: number;
  onSearch?: (query: string) => void;
  onAddPatient?: () => void;
  userName?: string;
}

export function SimpleDashboardLayout({ 
  children, 
  patientCount = 7,
  onSearch,
  onAddPatient,
  userName = "Sally Smith"
}: SimpleDashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={classes.dashboardContainer}>
      {/* Page Header Section */}
      <Box className={classes.pageHeader}>
        <Text size="xl" fw={700} c="dark">
          Patient List - {userName}
        </Text>
      </Box>

      {/* Top Controls Bar */}
      <Box className={classes.controlsBar}>
        <Group justify="space-between">
          {/* Left Side: Search Bar */}
          <TextInput
            placeholder="Search for Patient..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => handleSearch(e.currentTarget.value)}
            className={classes.searchInput}
          />

          {/* Right Side: Patient Count and Add Button */}
          <Group gap="md">
            <Text size="md" c="dimmed">
              {patientCount} patients
            </Text>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={onAddPatient}
              className={classes.addPatientButton}
            >
              Add Patient
            </Button>
          </Group>
        </Group>
      </Box>

      {/* Main Content Area */}
      <Box className={classes.contentArea}>
        {children}
      </Box>
    </div>
  );
}