import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { IconBrain } from '@tabler/icons-react';
import { PHQ9QuestionnaireModal } from './PHQ9QuestionnaireModal';

interface PHQ9QuestionnaireButtonProps {
  patientName: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'light' | 'outline' | 'default' | 'subtle' | 'transparent';
}

export function PHQ9QuestionnaireButton({ 
  patientName, 
  size = 'sm', 
  variant = 'light' 
}: PHQ9QuestionnaireButtonProps) {
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
        leftSection={<IconBrain size={16} />}
        onClick={handleOpenQuestionnaire}
      >
        PHQ-9
      </Button>

      <PHQ9QuestionnaireModal
        opened={isQuestionnaireOpen}
        onClose={handleCloseQuestionnaire}
        patientName={patientName}
      />
    </>
  );
}
