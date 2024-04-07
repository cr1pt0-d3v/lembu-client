import { AbsoluteCenter, Box, Heading } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box
      minH="80vh"
      bgImage="./assets/lambo-hd.jpg"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <AbsoluteCenter>
        <Heading color="gray.50" textAlign="center">
          🚗 Welcome to $LEMBU 🚗
        </Heading>
        <Heading size="md" color="gray.50">
          🎉 Join the fastest meme coin revolution in the BASE chain! 🎉
        </Heading>
      </AbsoluteCenter>
    </Box>
  );
};

export default HomePage;
