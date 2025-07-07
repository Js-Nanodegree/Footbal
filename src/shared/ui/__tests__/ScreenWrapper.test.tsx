import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ScreenWrapper from '../ScreenWrapper';
import { Text } from 'react-native';

const Loader = () => <Text>LOADING...</Text>;
const Skeleton = () => <Text>SKELETON...</Text>;
const Empty = () => <Text>EMPTY...</Text>;
const ErrorComponent = ({ msg }: { msg: string }) => <Text>ERROR: {msg}</Text>;

const MainContent = () => <Text>MAIN CONTENT</Text>;

describe('ScreenWrapper', () => {
  it('renders loader if loading', () => {
    render(
      <ScreenWrapper loading loaderComponent={<Loader />}> <MainContent /> </ScreenWrapper>
    );
    expect(screen.getByText('LOADING...')).toBeTruthy();
  });

  it('renders skeleton if offline and no data', () => {
    render(
      <ScreenWrapper isConnected={false} hasData={false} skeletonComponent={<Skeleton />}> <MainContent /> </ScreenWrapper>
    );
    expect(screen.getByText('SKELETON...')).toBeTruthy();
  });

  it('renders error if error', () => {
    render(
      <ScreenWrapper error="fail" errorComponent={msg => <ErrorComponent msg={msg} />}> <MainContent /> </ScreenWrapper>
    );
    expect(screen.getByText('ERROR: fail')).toBeTruthy();
  });

  it('renders empty if no data', () => {
    render(
      <ScreenWrapper hasData={false} emptyComponent={<Empty />}> <MainContent /> </ScreenWrapper>
    );
    expect(screen.getByText('EMPTY...')).toBeTruthy();
  });

  it('renders children if all ok', () => {
    render(
      <ScreenWrapper hasData> <MainContent /> </ScreenWrapper>
    );
    expect(screen.getByText('MAIN CONTENT')).toBeTruthy();
  });
}); 