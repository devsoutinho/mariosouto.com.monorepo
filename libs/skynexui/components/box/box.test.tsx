import { render } from '@testing-library/react';
import { Text } from '../text/text';
import { Box } from './box';


describe('<Box>', () => {
  it('renders the component', () => {
    const { output } = render(
      <Box>
        <Text>Hello</Text>
      </Box>
    );
    expect(output).toMatchSnapshot();
  });  
});
