import { styled } from '@material-ui/core/styles';

export const PageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

export const PageContent = styled('div')(({ theme }) => ({
  padding: '2rem',
}));
