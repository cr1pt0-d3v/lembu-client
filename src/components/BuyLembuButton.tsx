import { Button, Link, Text } from '@chakra-ui/react';

const BuyLembuButton = () => {
  return (
    <Button
      bgGradient="gray.50"
      color="#FF0080"
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
        <Text fontSize="xl" fontWeight="extrabold">
          BUY $LEMBU
        </Text>
      </Link>
    </Button>
  );
};

export default BuyLembuButton;
