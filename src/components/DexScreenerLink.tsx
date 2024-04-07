import { Link, Text } from '@chakra-ui/react';

const DexScreenerLink = () => {
  return (
    <Link
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
    </Link>
  );
};

export default DexScreenerLink;
