import { Box } from '../../index';

export default function AppScreenHOC(Component: any) {
  return function Wrapper() {
    return (
      <Box
        styleSheet={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        <Component />
      </Box>
    )
  };
}
