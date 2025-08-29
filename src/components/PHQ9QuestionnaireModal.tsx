import React from 'react';
import { Modal, Title, Group, Button } from '@mantine/core';
import { QuestionnaireForm } from '@medplum/react';
import { IconX } from '@tabler/icons-react';

interface PHQ9QuestionnaireModalProps {
  opened: boolean;
  onClose: () => void;
  patientName: string;
}

export function PHQ9QuestionnaireModal({ opened, onClose, patientName }: PHQ9QuestionnaireModalProps) {
  const questionnaire = {
    id: 'phq-9-depression-screening',
    meta: {
      versionId: '1',
      lastUpdated: '2024-01-01T00:00:00.000Z',
      source: '#phq9-questionnaire',
      profile: ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7'],
      tag: [{
        code: 'phq9Version: 1.0'
      }]
    },
    language: 'en-US',
    extension: [],
    subjectType: ['Patient'],
    status: 'active',
    experimental: false,
    publisher: 'Medplum',
    copyright: 'Public Domain',
    url: 'https://medplum.com/Questionnaire/phq-9',
    name: 'PHQ-9 Depression Screening',
    title: 'PHQ-9 Depression Screening',
    resourceType: 'Questionnaire',
    item: [{
      type: 'group',
      code: [{
        system: 'Custom',
        code: 'phq9Questions',
        display: 'PHQ-9 Depression Screening Questions'
      }],
      required: false,
      linkId: '/phq9Questions',
      text: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
      prefix: 'Instructions:',
      item: [{
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '1',
          display: 'Little interest or pleasure in doing things?'
        }],
        required: false,
        linkId: '/phq9Questions/1',
        text: 'Little interest or pleasure in doing things?',
        prefix: '1.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '2',
          display: 'Feeling down, depressed, or hopeless?'
        }],
        required: false,
        linkId: '/phq9Questions/2',
        text: 'Feeling down, depressed, or hopeless?',
        prefix: '2.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '3',
          display: 'Trouble falling or staying asleep, or sleeping too much?'
        }],
        required: false,
        linkId: '/phq9Questions/3',
        text: 'Trouble falling or staying asleep, or sleeping too much?',
        prefix: '3.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '4',
          display: 'Feeling tired or having little energy?'
        }],
        required: false,
        linkId: '/phq9Questions/4',
        text: 'Feeling tired or having little energy?',
        prefix: '4.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '5',
          display: 'Poor appetite or overeating?'
        }],
        required: false,
        linkId: '/phq9Questions/5',
        text: 'Poor appetite or overeating?',
        prefix: '5.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '6',
          display: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?'
        }],
        required: false,
        linkId: '/phq9Questions/6',
        text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
        prefix: '6.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '7',
          display: 'Trouble concentrating on things, such as reading the newspaper or watching television?'
        }],
        required: false,
        linkId: '/phq9Questions/7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
        prefix: '7.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '8',
          display: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?'
        }],
        required: false,
        linkId: '/phq9Questions/8',
        text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
        prefix: '8.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }, {
        type: 'choice',
        code: [{
          system: 'Custom',
          code: '9',
          display: 'Thoughts that you would be better off dead or of hurting yourself in some way?'
        }],
        required: false,
        linkId: '/phq9Questions/9',
        text: 'Thoughts that you would be better off dead or of hurting yourself in some way?',
        prefix: '9.',
        answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 0
          }],
          valueCoding: {
            code: '0',
            display: 'Not at all'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 1
          }],
          valueCoding: {
            code: '1',
            display: 'Several days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 2
          }],
          valueCoding: {
            code: '2',
            display: 'More than half the days'
          }
        }, {
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
            valueDecimal: 3
          }],
          valueCoding: {
            code: '3',
            display: 'Nearly every day'
          }
        }]
      }]
    }]
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="xl" 
                    title={
                <Title order={3}>PHQ-9 Depression Screening</Title>
              }
    >
      <QuestionnaireForm 
        questionnaire={questionnaire} 
        onSubmit={(formData: any) => {
          console.log('PHQ-9 submit', formData);
          onClose();
        }} 
      />
    </Modal>
  );
}
