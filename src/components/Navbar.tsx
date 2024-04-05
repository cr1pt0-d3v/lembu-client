import { Flex, Highlight, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" py={6}>
      <Link to={'/'}>
        <Highlight
          query="$LEMBU"
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
        >
          $LEMBU
        </Highlight>
      </Link>
      <Flex>
        <RoutesComponent />
      </Flex>
      <Spacer />
      <ConnectButton />
    </Flex>
  );
};

export default Navbar;
