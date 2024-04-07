import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LembuLogo = () => {
  return (
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
  );
};

export default LembuLogo;
