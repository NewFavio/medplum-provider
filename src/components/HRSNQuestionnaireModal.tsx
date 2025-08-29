import React from 'react';
import { Modal, Title, Group, Button } from '@mantine/core';
import { QuestionnaireForm } from '@medplum/react';
import { IconX } from '@tabler/icons-react';

interface HRSNQuestionnaireModalProps {
  opened: boolean;
  onClose: () => void;
  patientName: string;
}

export function HRSNQuestionnaireModal({ opened, onClose, patientName }: HRSNQuestionnaireModalProps) {
  const questionnaire = {
    id: 'lforms-ahn-hrsn-screening',
    meta: {
      versionId: '1',
      lastUpdated: '2022-07-03T03:13:00.000-04:00',
      source: '#bI9JAV8DuxZjLXqa',
      profile: ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7'],
      tag: [{
        code: 'lformsVersion: 30.3.0'
      }]
    },
    language: 'en-US',
    extension: [],
    subjectType: ['Patient'],
    status: 'draft',
    experimental: true,
    publisher: 'Center for Medicare and Medicaid Services',
    copyright: 'Public Domain',
    url: 'http://lforms-fhir.nlm.nih.gov/baseR4',
    name: 'AHC HRSN Screening',
    title: 'AHC HRSN Screening',
    resourceType: 'Questionnaire',
    item: [{
      type: 'group',
      code: [{
        system: 'Custom',
        code: 'coreQuestions',
        display: 'AHC HRSN Screening Core Questions'
      }],
      required: false,
      linkId: '/coreQuestions',
      text: 'AHC HRSN Screening Core Questions',
      prefix: 'I:',
      item: [{
        type: 'group',
        code: [{
          system: 'Custom',
          code: 'livingSituation',
          display: 'Living Situation'
        }],
        required: false,
        linkId: '/coreQuestions/livingSituation',
        text: 'Living Situation',
        item: [{
          type: 'choice',
          code: [{
            system: 'Custom',
            code: '1',
            display: 'What is your living situation today?'
          }],
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [{
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'drop-down',
                display: 'Drop down'
              }],
              text: 'Drop down'
            }
          }],
          required: false,
          linkId: '/coreQuestions/livingSituation/1',
          text: 'What is your living situation today?',
          prefix: '1.',
          answerOption: [{
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix',
              valueString: '1'
            }],
            valueCoding: {
              code: '1a1',
              display: 'I have a steady place to live'
            }
          }, {
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix',
              valueString: '2*'
            }],
            valueCoding: {
              code: '1a2',
              display: 'I have a place to live today, but I am worried about losing it in the future'
            }
          }, {
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix',
              valueString: '3*'
            }],
            valueCoding: {
              code: '1a3',
              display: 'I do not have a steady place to live (I am temporarily staying with others, in a hotel, in a shelter, living outside on the street, on a beach, in a car, abandoned building, bus or train station, or in a park)'
            }
          }]
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
                <Title order={3}>HRSN Screening</Title>
              }
    >
      <QuestionnaireForm 
        questionnaire={questionnaire} 
        onSubmit={(formData: any) => {
          console.log('submit', formData);
          onClose();
        }} 
      />
    </Modal>
  );
}
