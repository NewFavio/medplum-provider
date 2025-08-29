// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { Title } from '@mantine/core';
import { SignInForm } from '@medplum/react';
import { JSX } from 'react';
import { useNavigate } from 'react-router';
import { RAYLogo } from '../components/RAYLogo';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <SignInForm
      // Configure according to your settings
      googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"
      onSuccess={() => navigate('/')?.catch(console.error)}
    >
      <RAYLogo size={48} />
      <Title>Sign in to RAY</Title>
    </SignInForm>
  );
}
