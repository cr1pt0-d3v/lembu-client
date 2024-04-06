import { Button, Link, Text } from '@chakra-ui/react';

const BuyLembuButton = () => {
  return (
    <Button
      _hover={{
        bgGradient: 'linear(to-b, #7928CA, #FF0080)',
        color: 'gray.50',
      }}
      rounded="2xl"
    >
      <Link
        _hover={{ textDecoration: 'none' }}
        href="https://app.uniswap.org/swap?outputCurrency=0x1f3D1d87Ba637201b0006672E9bB98800e33B670&chain=base"
        isExternal
      >
        <Text
          color="#FF0080"
          fontSize="xl"
          fontWeight="extrabold"
          _hover={{ color: 'gray.50' }}
        >
          BUY $LEMBU
        </Text>
      </Link>
    </Button>
  );
};

export default BuyLembuButton;
