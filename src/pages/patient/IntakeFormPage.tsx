// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { showNotification } from '@mantine/notifications';
import { normalizeErrorString } from '@medplum/core';
import { Questionnaire, QuestionnaireResponse } from '@medplum/fhirtypes';
import { Document, Loading, QuestionnaireForm, useMedplum, useMedplumProfile } from '@medplum/react';
import { JSX, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { onboardPatient } from '../../utils/intake-form';

export function IntakeFormPage(): JSX.Element {
  const navigate = useNavigate();
  const medplum = useMedplum();
  const profile = useMedplumProfile();

  const handleOnSubmit = useCallback(
    async (response: QuestionnaireResponse) => {
      if (!questionnaire || !profile) {
        return;
      }
      try {
        const patient = await onboardPatient(medplum, questionnaire, response);
        navigate(`/Patient/${patient.id}/timeline`)?.catch(console.error);
      } catch (error) {
        showNotification({
          color: 'red',
          message: normalizeErrorString(error),
          autoClose: false,
        });
      }
    },
    [medplum, navigate, profile]
  );

  if (!questionnaire) {
    return <Loading />;
  }

  return (
    <Document width={800}>
      <QuestionnaireForm questionnaire={questionnaire} onSubmit={handleOnSubmit} />
    </Document>
  );
}

const questionnaire: Questionnaire = {
  resourceType: 'Questionnaire',
  status: 'active',
  title: 'Client Eligibility Screening',
  url: 'https://medplum.com/Questionnaire/client-eligibility-screening',
  name: 'client-eligibility-screening',
  item: [
    {
      linkId: 'hiv-diagnosis-info',
      text: '1. HIV Diagnosis Information',
      type: 'group',
      item: [
        {
          linkId: 'hiv-diagnosis-12-months',
          text: 'a. Was the client diagnosed with HIV in the past 12 months?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'hiv-previous-diagnosis',
          text: 'b. Does the client have a previous diagnosis of HIV (more than six months ago) and meet any of the following criteria:',
          type: 'group',
          item: [
            {
              linkId: 'hiv-criteria-1',
              text: 'One or more gaps in HIV medical visits lasting six months or more in the past two years or more?',
              type: 'boolean'
            },
            {
              linkId: 'hiv-criteria-2',
              text: 'Missed their last two medical appointments in the past 12 months',
              type: 'boolean'
            },
            {
              linkId: 'hiv-criteria-3',
              text: 'Missed their last medical appointment in the past six months',
              type: 'boolean'
            },
            {
              linkId: 'hiv-criteria-4',
              text: 'Leaving incarceration/re-entering society after incarceration within the past 12 months',
              type: 'boolean'
            },
            {
              linkId: 'hiv-criteria-5',
              text: 'Not virally suppressed (viral load ≥200 copies/mL) at the time of enrollment',
              type: 'boolean'
            }
          ]
        },
        {
          linkId: 'hiv-eligibility-disclaimer',
          text: 'If client does not meet above criteria, client is not eligible to participate in the project.',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'age-verification',
      text: 'Age Verification',
      type: 'group',
      item: [
        {
          linkId: 'age-18-or-older',
          text: '2. Is the client 18 years of age or older?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'age-eligibility-disclaimer',
          text: 'If the client is not 18 years of age or older, client is not eligible to participate in the project.',
          type: 'display'
        },
        {
          linkId: 'year-of-birth',
          text: '3. What is the client\'s year of birth?',
          type: 'string',
          required: true
        }
      ]
    },
    {
      linkId: 'mental-health',
      text: 'Mental Health (MHI-5 Assessment)',
      type: 'group',
      item: [
        {
          linkId: 'mhi5-instructions',
          text: '5. How often have you experienced the following in the past month? Please use the scale below to indicate your answer.',
          type: 'display'
        },
        {
          linkId: 'mhi5-nervous',
          text: 'Felt nervous?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: '6', display: 'None of the time (0 days per month)' } },
            { valueCoding: { code: '5', display: 'A little of the time (1-3 days per month)' } },
            { valueCoding: { code: '4', display: 'Some of the time (4-7 days per month)' } },
            { valueCoding: { code: '3', display: 'A good bit of the time (8-14 days per month)' } },
            { valueCoding: { code: '2', display: 'Most of the time (15-22 days per month)' } },
            { valueCoding: { code: '1', display: 'All of the time (23-30 days per month)' } }
          ]
        },
        {
          linkId: 'mhi5-down-in-dumps',
          text: 'Felt so down in the dumps that nothing could cheer you up?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: '6', display: 'None of the time (0 days per month)' } },
            { valueCoding: { code: '5', display: 'A little of the time (1-3 days per month)' } },
            { valueCoding: { code: '4', display: 'Some of the time (4-7 days per month)' } },
            { valueCoding: { code: '3', display: 'A good bit of the time (8-14 days per month)' } },
            { valueCoding: { code: '2', display: 'Most of the time (15-22 days per month)' } },
            { valueCoding: { code: '1', display: 'All of the time (23-30 days per month)' } }
          ]
        },
        {
          linkId: 'mhi5-calm-peaceful',
          text: 'Felt calm and peaceful?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: '1', display: 'None of the time (0 days per month)' } },
            { valueCoding: { code: '2', display: 'A little of the time (1-3 days per month)' } },
            { valueCoding: { code: '3', display: 'Some of the time (4-7 days per month)' } },
            { valueCoding: { code: '4', display: 'A good bit of the time (8-14 days per month)' } },
            { valueCoding: { code: '5', display: 'Most of the time (15-22 days per month)' } },
            { valueCoding: { code: '6', display: 'All of the time (23-30 days per month)' } }
          ]
        },
        {
          linkId: 'mhi5-downhearted-blue',
          text: 'Felt downhearted and blue?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: '6', display: 'None of the time (0 days per month)' } },
            { valueCoding: { code: '5', display: 'A little of the time (1-3 days per month)' } },
            { valueCoding: { code: '4', display: 'Some of the time (4-7 days per month)' } },
            { valueCoding: { code: '3', display: 'A good bit of the time (8-14 days per month)' } },
            { valueCoding: { code: '2', display: 'Most of the time (15-22 days per month)' } },
            { valueCoding: { code: '1', display: 'All of the time (23-30 days per month)' } }
          ]
        },
        {
          linkId: 'mhi5-happy-person',
          text: 'Been a happy person?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: '1', display: 'None of the time (0 days per month)' } },
            { valueCoding: { code: '2', display: 'A little of the time (1-3 days per month)' } },
            { valueCoding: { code: '3', display: 'Some of the time (4-7 days per month)' } },
            { valueCoding: { code: '4', display: 'A good bit of the time (8-14 days per month)' } },
            { valueCoding: { code: '5', display: 'Most of the time (15-22 days per month)' } },
            { valueCoding: { code: '6', display: 'All of the time (23-30 days per month)' } }
          ]
        },
        {
          linkId: 'mhi5-scoring-note',
          text: 'Scoring: Suggest a cut-off point between 69-72 to identify individuals with mental health problems. Further screening is recommended.',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'alcohol-use',
      text: 'Alcohol Use (ASSIST-Lite)',
      type: 'group',
      item: [
        {
          linkId: 'alcohol-past-3-months',
          text: '6. In the past three months, did you have a drink containing alcohol?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'alcohol-standard-drink-info',
          text: '7. A standard drink is a measure of alcohol consumption that helps people understand how much pure alcohol they\'re actually drinking. In the U.S., a standard drink contains about 14 grams (0.6 ounces) of pure alcohol: 12 ounces of beer (5% alcohol), 5 ounces of wine (12% alcohol), 1.5 ounces of distilled spirits (40% alcohol, e.g., vodka, rum, whiskey).',
          type: 'display'
        },
        {
          linkId: 'alcohol-more-than-4-drinks',
          text: 'On any occasion in the past three months, did you drink more than 4 standard drinks of alcohol?',
          type: 'choice',
          enableWhen: [
            {
              question: 'alcohol-past-3-months',
              operator: '=',
              answerCoding: { code: 'yes' }
            }
          ],
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'alcohol-control-stop',
          text: '8. In the past 3 months, have you tried to control, cut down, or stop drinking alcohol and found that you could not?',
          type: 'choice',
          enableWhen: [
            {
              question: 'alcohol-past-3-months',
              operator: '=',
              answerCoding: { code: 'yes' }
            }
          ],
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'alcohol-concern',
          text: '9. In the past three months, has anyone expressed concern about your drinking?',
          type: 'choice',
          enableWhen: [
            {
              question: 'alcohol-past-3-months',
              operator: '=',
              answerCoding: { code: 'yes' }
            }
          ],
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'alcohol-scoring-note',
          text: 'Scoring for alcohol (count "yes" answers) Risk category: 0-1 = Low, 2 = Moderate, 3-4 = High. Further screening is recommended for moderate and high risk.',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'drug-use',
      text: 'Drug Use (NIDA Single Question Screening)',
      type: 'group',
      item: [
        {
          linkId: 'drugs-last-year',
          text: '10. In the past year, have you used drugs other than those required for medical reasons?',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'drug-scoring-note',
          text: 'Scoring: If they answer yes, further screening is recommended.',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'system-assessment',
      text: 'System Assessment',
      type: 'group',
      item: [
        {
          linkId: 'needs-services',
          text: '11. (To be completed by system staff) Is the client in need of mental health or substance use services? (Select all that apply.)',
          type: 'choice',
          repeats: true,
          required: true,
          answerOption: [
            { valueCoding: { code: 'mental-health', display: 'Yes, the client needs mental health services (based on system\'s assessment)' } },
            { valueCoding: { code: 'substance-use', display: 'Yes, the client needs substance use services (based on system\'s assessment)' } },
            { valueCoding: { code: 'no-need', display: 'No, the client does not need mental health or substance use services' } }
          ]
        },
        {
          linkId: 'system-assessment-disclaimer',
          text: 'If the client does not need mental health and/or substance use services, the client is not eligible to participate in the project.',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'willingness-to-receive',
      text: 'Willingness to Receive Services',
      type: 'group',
      item: [
        {
          linkId: 'willing-to-receive',
          text: '12. Are you willing to receive mental health or substance use services for this project? (Select all that apply.)',
          type: 'choice',
          repeats: true,
          required: true,
          answerOption: [
            { valueCoding: { code: 'mental-health', display: 'Yes, the client is willing to receive mental health services' } },
            { valueCoding: { code: 'substance-use', display: 'Yes, the client is willing to receive substance use services' } },
            { valueCoding: { code: 'not-willing', display: 'No, the client is not willing to receive mental health or substance use services' } }
          ]
        },
        {
          linkId: 'willingness-disclaimer',
          text: 'If the client is not willing to receive mental health or substance use services, the client is not eligible to participate in the project.',
          type: 'display'
        }
      ]
    }
  ]
};

