import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { IconClipboardList } from '@tabler/icons-react';
import { HRSNQuestionnaireModal } from './HRSNQuestionnaireModal';

interface HRSNQuestionnaireButtonProps {
  patientName: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'light' | 'outline' | 'default' | 'subtle' | 'transparent';
}

export function HRSNQuestionnaireButton({ 
  patientName, 
  size = 'sm', 
  variant = 'light' 
}: HRSNQuestionnaireButtonProps) {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const handleOpenQuestionnaire = () => {
    setIsQuestionnaireOpen(true);
  };

  const handleCloseQuestionnaire = () => {
    setIsQuestionnaireOpen(false);
  };

  return (
    <>
      <Button
        size={size}
        variant={variant}
        leftSection={<IconClipboardList size={16} />}
        onClick={handleOpenQuestionnaire}
      >
        HRSN Screening
      </Button>

      <HRSNQuestionnaireModal
        opened={isQuestionnaireOpen}
        onClose={handleCloseQuestionnaire}
        patientName={patientName}
      />
    </>
  );
}
