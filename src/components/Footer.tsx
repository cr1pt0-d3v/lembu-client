import { Text, ButtonGroup, Box, Link, VStack } from '@chakra-ui/react';
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  const copyrightText = () => {
    return (
      <Text size="md" textAlign="center">
        &copy; {new Date().getFullYear()} $LEMBU Token Community. All rights
        reserved. $LEMBU Token is for entertainment only, not a financial
        investment. Use at your own risk. Ride it responsibly!
      </Text>
    );
  };
  return (
    <VStack bg="gray.900" p={4} textColor="gray.50">
      <ButtonGroup gap="4" fontSize={24}>
        <Link
          href="https://twitter.com/wenlembu"
          isExternal
          _hover={{ color: '#FF0080' }}
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>
        <Link
          href="https://t.me/wenlembu"
          isExternal
          _hover={{ color: '#FF0080' }}
        >
          <FontAwesomeIcon icon={faTelegram} />
        </Link>
      </ButtonGroup>
      <Box p="2">{copyrightText()}</Box>
    </VStack>
  );
};

export default Footer;
