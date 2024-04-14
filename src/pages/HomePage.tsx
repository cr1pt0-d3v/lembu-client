import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useStore } from '../store/use-store';
import { observer } from 'mobx-react-lite';

const HomePage = observer(() => {
  const store = useStore();
  return (
    <Box
      minH="80vh"
      bgImage="/assets/lambo-hd.jpg"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <AbsoluteCenter>
        <VStack>
          <Heading color="gray.50" textAlign="center">
            Welcome to $LEMBU
          </Heading>
          <Heading size="md" color="gray.50" textAlign="center">
            Join the fastest memecoin revolution in the BASE chain!
          </Heading>
        </VStack>
        <Center>
          <VStack mt={5}>
            {store.isLoggedIn && !store.accountIsLinkedToTwitter ? (
              <>
                <Button
                  bg="gray.50"
                  color="linear(to-b, #7928CA, #FF0080)"
                  _hover={{
                    bgGradient: 'linear(to-b, #7928CA, #FF0080)',
                    color: 'gray.50',
                  }}
                  rounded="2xl"
                  onClick={store.handleTwitterLogin}
                >
                  Link X / Twitter Account
                </Button>
                <Heading size="md" color="gray.50" textAlign="center" mt={2}>
                  In order to get started and participate in future airdrops,
                  you will need to link your X / Twitter account
                </Heading>
              </>
            ) : (
              <></>
            )}
            {store.isLoggedIn && store.accountIsLinkedToTwitter ? (
              <Heading size="md" color="gray.50" textAlign="center">
                Twitter account linked to the wallet is:
                {store.twitterUserNameLinkedToAccount}
              </Heading>
            ) : (
              <></>
            )}
          </VStack>
        </Center>
      </AbsoluteCenter>
    </Box>
  );
});

export default HomePage;
