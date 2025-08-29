import React from 'react';
import {
  AppShell,
  Group,
  Text,
  Button,
  TextInput,
  Menu,
  Avatar,
  UnstyledButton,
  Box,
  Container,
  Badge
} from '@mantine/core';
import {
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconUser,
  IconLogout,
  IconSettings
} from '@tabler/icons-react';
import classes from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  patientCount?: number;
  onSearch?: (query: string) => void;
  onAddPatient?: () => void;
  userName?: string;
}

export function DashboardLayout({ 
  children, 
  patientCount = 7,
  onSearch,
  onAddPatient,
  userName = "Sally Smith"
}: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('patients');

  const navigationTabs = [
    { id: 'patients', label: 'Patients' },
    { id: 'caseload', label: 'Caseload Assistant' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'add', label: 'Add Patient' },
    { id: 'resources', label: 'Resources' }
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={classes.dashboardWrapper}>
      {/* Custom Header */}
      <div className={classes.header}>
        <Group h="100%" px="md" justify="space-between">
          {/* Left Section: Logo and Navigation */}
          <Group gap={0}>
            {/* Logo */}
            <div className={classes.logo}>
              <Text size="xl" fw={700} c="white">g</Text>
            </div>

            {/* Navigation Tabs */}
            <Group gap={0} ml="xl">
              {navigationTabs.map((tab) => (
                <UnstyledButton
                  key={tab.id}
                  className={`${classes.navTab} ${activeTab === tab.id ? classes.navTabActive : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'add') {
                      onAddPatient?.();
                    }
                  }}
                >
                  {tab.label}
                </UnstyledButton>
              ))}
            </Group>
          </Group>

          {/* Right Section: Resources Dropdown and User Profile */}
          <Group gap="md">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton className={classes.resourcesDropdown}>
                  <Group gap="xs">
                    <Text size="sm" c="white">Patient Resources</Text>
                    <IconChevronDown size={16} color="white" />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Forms & Documents</Menu.Item>
                <Menu.Item>Educational Materials</Menu.Item>
                <Menu.Item>Treatment Guidelines</Menu.Item>
                <Menu.Item>Insurance Resources</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton className={classes.userProfile}>
                  <Group gap="xs">
                    <Avatar size="sm" color="white" variant="filled">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Text size="sm" c="white">{userName}</Text>
                    <IconChevronDown size={14} color="white" />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={14} />} color="red">
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </div>

      <div className={classes.main}>
        {/* Page Header Section */}
        <Box className={classes.pageHeader}>
          <Box px="24px">
            <Text size="xl" fw={700} c="dark">
              Patient List - {userName}
            </Text>
          </Box>
        </Box>

        {/* Top Controls Bar */}
        <Box className={classes.controlsBar}>
          <Box px="24px">
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
        </Box>

        {/* Main Content Area */}
        <Box className={classes.contentArea}>
          {children}
        </Box>
      </div>
    </div>
  );
}