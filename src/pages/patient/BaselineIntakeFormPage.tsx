import React, { useState } from 'react';
import { Document, Loading, QuestionnaireForm, useMedplum } from '@medplum/react';
import { Questionnaire } from '@medplum/fhirtypes';
import { JSX } from 'react';

export function BaselineIntakeFormPage(): JSX.Element {
  const medplum = useMedplum();

  const handleOnSubmit = async (response: any) => {
    try {
      console.log('Baseline Intake Form submitted:', response);
      // Here you would typically save the response to your system
      // For now, we'll just log it
    } catch (error) {
      console.error('Error submitting baseline intake form:', error);
    }
  };

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
  title: 'Client Baseline Intake Form',
  url: 'https://medplum.com/Questionnaire/client-baseline-intake-form',
  name: 'client-baseline-intake-form',
  item: [
    {
      linkId: 'header-information',
      text: 'Header Information',
      type: 'group',
      item: [
        {
          linkId: 'system-name',
          text: 'System name:',
          type: 'string',
          required: true
        },
        {
          linkId: 'unique-identifier',
          text: 'Unique Identifier:',
          type: 'string',
          required: true
        },
        {
          linkId: 'staff-name',
          text: 'System staff name:',
          type: 'string',
          required: true
        },
        {
          linkId: 'administration-method',
          text: 'Method of questionnaire administration:',
          type: 'choice',
          required: true,
          answerOption: [
            { valueCoding: { code: 'staff', display: 'Administered by staff' } },
            { valueCoding: { code: 'self', display: 'Self-administered by client' } }
          ]
        }
      ]
    },
    {
      linkId: 'demographics-background',
      text: 'SECTION 1: DEMOGRAPHICS & BACKGROUND CHARACTERISTICS',
      type: 'group',
      item: [
        {
          linkId: 'zip-code',
          text: '1. What is your zip code?',
          type: 'string'
        },
        {
          linkId: 'street-town',
          text: 'If you don\'t know your zip code, what is the street and town of the place that you stayed last night?',
          type: 'string'
        },
        {
          linkId: 'sex',
          text: '2. What is your sex?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'male', display: 'Male' } },
            { valueCoding: { code: 'female', display: 'Female' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        },
        {
          linkId: 'race-ethnicity',
          text: '3. What is your race and/or ethnicity? (Please select all that apply.)',
          type: 'choice',
          repeats: true,
          answerOption: [
            { valueCoding: { code: 'american-indian', display: 'American Indian or Alaska Native' } },
            { valueCoding: { code: 'asian', display: 'Asian' } },
            { valueCoding: { code: 'black-african-american', display: 'Black or African American' } },
            { valueCoding: { code: 'hispanic-latino', display: 'Hispanic or Latino' } },
            { valueCoding: { code: 'middle-eastern-north-african', display: 'Middle Eastern or North African' } },
            { valueCoding: { code: 'native-hawaiian-pacific-islander', display: 'Native Hawaiian or Pacific Islander' } },
            { valueCoding: { code: 'white', display: 'White' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other race and/or ethnicity: please specify' } }
          ]
        },
        {
          linkId: 'race-ethnicity-other',
          text: 'Other race and/or ethnicity (please specify):',
          type: 'string',
          enableWhen: [
            {
              question: 'race-ethnicity',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'sexual-orientation',
          text: '4. What is your sexual orientation? (Please select all that apply)',
          type: 'choice',
          repeats: true,
          answerOption: [
            { valueCoding: { code: 'bisexual', display: 'Bisexual' } },
            { valueCoding: { code: 'gay-lesbian', display: 'Gay or lesbian' } },
            { valueCoding: { code: 'heterosexual', display: 'Heterosexual or straight' } },
            { valueCoding: { code: 'pansexual', display: 'Pansexual' } },
            { valueCoding: { code: 'questioning', display: 'Questioning' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other, please describe' } }
          ]
        },
        {
          linkId: 'sexual-orientation-other',
          text: 'Other sexual orientation (please describe):',
          type: 'string',
          enableWhen: [
            {
              question: 'sexual-orientation',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'housing-status',
          text: '5. What is your current housing status?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'stable-permanent', display: 'Stable permanent housing' } },
            { valueCoding: { code: 'temporary', display: 'Temporary housing' } },
            { valueCoding: { code: 'unstable', display: 'Unstable housing' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        },
        {
          linkId: 'has-children',
          text: '6. Do you have children or others who depend on you for care?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        },
        {
          linkId: 'household-income',
          text: '7. What is your household\'s total annual income before taxes?',
          type: 'string'
        },
        {
          linkId: 'household-size',
          text: '8. How many people are in your family/household?',
          type: 'integer'
        },
        {
          linkId: 'education-level',
          text: '9. What is the highest level of education you have completed?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'less-than-high-school', display: 'Less than high school' } },
            { valueCoding: { code: 'high-school-ged', display: 'High school diploma/GED' } },
            { valueCoding: { code: 'trade-technical', display: 'Trade or technical school' } },
            { valueCoding: { code: 'some-college', display: 'Some college' } },
            { valueCoding: { code: 'associates', display: 'Associate\'s degree' } },
            { valueCoding: { code: 'bachelors', display: 'Bachelor\'s degree' } },
            { valueCoding: { code: 'some-graduate', display: 'Some graduate school' } },
            { valueCoding: { code: 'graduate-degree', display: 'Graduate degree (Master\'s, PhD, etc.)' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other, please describe' } }
          ]
        },
        {
          linkId: 'education-other',
          text: 'Other education level (please describe):',
          type: 'string',
          enableWhen: [
            {
              question: 'education-level',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'primary-language',
          text: '10. What language do you speak most of the time?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'english', display: 'English' } },
            { valueCoding: { code: 'spanish', display: 'Spanish' } },
            { valueCoding: { code: 'french', display: 'French' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other, please describe' } }
          ]
        },
        {
          linkId: 'primary-language-other',
          text: 'Other language (please describe):',
          type: 'string',
          enableWhen: [
            {
              question: 'primary-language',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'work-situation',
          text: '11. What is your current work situation?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'unemployed', display: 'Unemployed' } },
            { valueCoding: { code: 'part-time-temporary', display: 'Part-time or temporary work' } },
            { valueCoding: { code: 'full-time', display: 'Full-time work' } },
            { valueCoding: { code: 'not-seeking-work', display: 'Not seeking work (e.g., student, retired, disabled, unpaid primary care giver)' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other, please describe' } }
          ]
        },
        {
          linkId: 'work-situation-other',
          text: 'Other work situation (please describe):',
          type: 'string',
          enableWhen: [
            {
              question: 'work-situation',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'health-insurance',
          text: '12. What is your primary source of health insurance?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'private-employer', display: 'Private insurance (Employer-sponsored)' } },
            { valueCoding: { code: 'private-individual', display: 'Private insurance (Individual plan)' } },
            { valueCoding: { code: 'medicare', display: 'Medicare' } },
            { valueCoding: { code: 'medicaid-chip', display: 'Medicaid, Children\'s Health Insurance Program (CHIP), or other public health insurance plan' } },
            { valueCoding: { code: 'va-tricare', display: 'Veterans Health Administration (VA), military health care (TRICARE), or other military health care' } },
            { valueCoding: { code: 'indian-health-service', display: 'Indian Health Service' } },
            { valueCoding: { code: 'no-insurance', display: 'No insurance/uninsured' } },
            { valueCoding: { code: 'prefer-not-to-respond', display: 'Prefer not to respond/Unknown' } },
            { valueCoding: { code: 'other', display: 'Other, please describe' } }
          ]
        },
        {
          linkId: 'health-insurance-other',
          text: 'Other health insurance (please describe):',
          type: 'string',
          enableWhen: [
            {
              question: 'health-insurance',
              operator: '=',
              answerCoding: { code: 'other' }
            }
          ]
        },
        {
          linkId: 'incarcerated-12-months',
          text: '13. In the last 12 months, have you spent more than two nights in a row in a jail, prison, detention center, or juvenile correctional facility?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        },
        {
          linkId: 'feels-safe',
          text: '14. Do you feel physically and emotionally safe where you currently live?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        },
        {
          linkId: 'afraid-of-partner',
          text: '15. In the last 12 months, have you been afraid of your partner or ex-partner?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } },
            { valueCoding: { code: 'no-partner', display: 'Does not have a partner or ex-partner' } },
            { valueCoding: { code: 'prefer-not-to-answer', display: 'Prefer not to answer/Unknown' } }
          ]
        }
      ]
    },
    {
      linkId: 'hiv-care',
      text: 'SECTION 2: HIV Care',
      type: 'group',
      item: [
        {
          linkId: 'hiv-diagnosis-year',
          text: '16. In what year were you diagnosed with HIV?',
          type: 'string'
        },
        {
          linkId: 'hiv-care-12-months',
          text: '17. Have you received HIV care within the last 12 months (e.g., at least one CD4 or viral load test)?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'retained-in-care',
          text: '18. Are you consistently receiving HIV care ("retained in care"); i.e., have you received at least two CD4 or viral load tests, spaced at least three months apart, in the past 12 months?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'viral-suppressed',
          text: '19. Is your HIV viral load suppressed (i.e., less than 200 copies/mL on your most recent test from the past 12 months)?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'active-art',
          text: '20. Do you currently have an active antiretroviral therapy (ART) prescription (prescribed within the last 12 months)?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'enrolled-rwhap',
          text: '21. Are you currently enrolled in the Ryan White HIV/AIDS Program (RWHAP)?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'hiv-case-manager',
          text: '22. Do you currently have a HIV case manager?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        },
        {
          linkId: 'hiv-care-plan',
          text: '23. Do you currently have a HIV-focused care plan?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } }
          ]
        }
      ]
    },
    {
      linkId: 'physical-mental-health',
      text: 'SECTION 3: Physical and Mental Health',
      type: 'group',
      item: [
        {
          linkId: 'general-health',
          text: '24. In general, would you say your health is: (SF-36)',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'poor', display: 'Poor' } },
            { valueCoding: { code: 'fair', display: 'Fair' } },
            { valueCoding: { code: 'good', display: 'Good' } },
            { valueCoding: { code: 'very-good', display: 'Very good' } },
            { valueCoding: { code: 'excellent', display: 'Excellent' } }
          ]
        },
        {
          linkId: 'phq9-note',
          text: '25. PHQ-9 Depression Assessment Table - This will be completed separately via the Assessments dropdown',
          type: 'display'
        },
        {
          linkId: 'phq-difficulty',
          text: '26. How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'not-at-all', display: 'Not at all difficult' } },
            { valueCoding: { code: 'slightly', display: 'Slightly difficult' } },
            { valueCoding: { code: 'moderately', display: 'Moderately difficult' } },
            { valueCoding: { code: 'very', display: 'Very difficult' } },
            { valueCoding: { code: 'extremely', display: 'Extremely difficult' } }
          ]
        },
        {
          linkId: 'prime-md-note',
          text: '27. PRIME-MD Anxiety Assessment Table - This will be completed separately via the Assessments dropdown',
          type: 'display'
        },
        {
          linkId: 'prime-md-difficulty',
          text: '28. How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'not-at-all', display: 'Not at all difficult' } },
            { valueCoding: { code: 'slightly', display: 'Slightly difficult' } },
            { valueCoding: { code: 'moderately', display: 'Moderately difficult' } },
            { valueCoding: { code: 'very', display: 'Very difficult' } },
            { valueCoding: { code: 'extremely', display: 'Extremely difficult' } }
          ]
        }
      ]
    },
    {
      linkId: 'substance-use',
      text: 'SECTION 4: SUBSTANCE USE',
      type: 'group',
      item: [
        {
          linkId: 'assist-lite-note',
          text: '29. ASSIST-Lite Substance Use Assessment Table - This will be completed separately via the Assessments dropdown',
          type: 'display'
        },
        {
          linkId: 'substance-use-treatment',
          text: '30. In the past three months, have you participated in any substance use treatment?',
          type: 'choice',
          answerOption: [
            { valueCoding: { code: 'yes', display: 'Yes' } },
            { valueCoding: { code: 'no', display: 'No' } },
            { valueCoding: { code: 'prefer-not-to-respond', display: 'Prefer not to respond/Unknown' } }
          ]
        },
        {
          linkId: 'substance-treatment-types',
          text: '31. Which treatments? (Please select all that apply.)',
          type: 'choice',
          repeats: true,
          enableWhen: [
            {
              question: 'substance-use-treatment',
              operator: '=',
              answerCoding: { code: 'yes' }
            }
          ],
          answerOption: [
            { valueCoding: { code: 'detox', display: 'Detox (a program to safely stop using drugs or alcohol.)' } },
            { valueCoding: { code: 'inpatient-residential', display: 'Inpatient/Residential Treatment (living at a treatment center for daily support.)' } },
            { valueCoding: { code: 'recovery-housing', display: 'Recovery Housing/Sober Living (a drug-free place to live while focusing on sobriety.)' } },
            { valueCoding: { code: 'partial-hospitalization', display: 'Partial Hospitalization Program (daytime treatment with evening return home.)' } },
            { valueCoding: { code: 'other', display: 'Other (please specify)' } }
          ]
        }
      ]
    },
    {
      linkId: 'hiv-stigma',
      text: 'SECTION 5: HIV Stigma (Berger HIV Stigma Scale)',
      type: 'group',
      item: [
        {
          linkId: 'hiv-stigma-note',
          text: '32. HIV Stigma Assessment Table - This will be completed separately via the Assessments dropdown',
          type: 'display'
        }
      ]
    },
    {
      linkId: 'social-determinants',
      text: 'SECTION 6: Social Determinants of Health',
      type: 'group',
      item: [
        {
          linkId: 'social-determinants-note',
          text: '33. Social Determinants Assessment Table - This will be completed separately via the Assessments dropdown',
          type: 'display'
        },
        {
          linkId: 'additional-insights',
          text: '34. Please share anything else that may impact your HIV care.',
          type: 'text'
        }
      ]
    }
  ]
};
