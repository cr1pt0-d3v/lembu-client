import { Flex, Spacer, Text, Link as ExternalLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BuyLembuButton from './BuyLembuButton';

const Navbar = () => {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p={4}
      bg="gray.900"
    >
      <Link to={'/'}>
        <Text
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          $LEMBU
        </Text>
      </Link>
      <Flex>
        <RoutesComponent />
      </Flex>
      <ExternalLink
        _hover={{ textDecoration: 'none' }}
        href="https://dexscreener.com/base/0xb147ffbf8163238e6b8987963ae31b4381f2454e"
        isExternal
      >
        <Text
          color="gray.50"
          fontSize="xl"
          fontWeight="extrabold"
          _hover={{ color: '#FF0080' }}
        >
          DexScreener
        </Text>
      </ExternalLink>
      <BuyLembuButton />
      <Spacer />
      <ConnectButton />
    </Flex>
  );
};

export default Navbar;
