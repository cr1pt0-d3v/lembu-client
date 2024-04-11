import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  useDisclosure,
  Spacer,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import RoutesComponent from './RoutesComponent';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BuyLembuButton from './BuyLembuButton';
import LembuLogo from './LembuLogo';
import DexScreenerLink from './DexScreenerLink';
import { useStore } from "../store/use-store";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store = useStore();
  return (
    <Box minWidth="max-content" bg="gray.900">
      <Flex
        alignItems="center"
        gap="2"
        p={4}
        display={['none', 'none', 'none', 'flex']}
      >
        <LembuLogo />
        <Spacer />
        <Flex>
          <RoutesComponent />
        </Flex>
        <DexScreenerLink />
        <BuyLembuButton />
        {store.isLoggedIn && !store.accountIsLinkedToTwitter?<button style={{color:"white"}} onClick={store.handleTwitterLogin}>Link Twitter Account</button>:<></>}
        {store.isLoggedIn && store.successTwitterLogin?<div style={{color:"white"}}>Twitter account linked to this wallet is: {store.twitterUserNameLinkedToAccount}</div>:<></>}
        <Spacer />
        <ConnectButton />
      </Flex>
      <Flex
        p={4}
        alignItems="center"
        display={['flex', 'flex', 'flex', 'none']}
      >
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          fontSize="24px"
          pl={1}
          onClick={onOpen}
          bg="transparent"
          color="#FF0080"
        />
        <Spacer />
        <ConnectButton />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="gray.50">
          <DrawerHeader borderBottomWidth="1px" px={4} py={6}>
            <Flex alignItems="center">
              <Box>
                <LembuLogo />
              </Box>
              <Spacer />
              <IconButton
                icon={<CloseIcon />}
                aria-label="Close Menu"
                size="md"
                onClick={onClose}
                bg="transparent"
                color="#FF0080"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody p="4">
            <Flex flexDir="column" align="center" gap={4}>
              <RoutesComponent />
              <DexScreenerLink />
              <BuyLembuButton />
              
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
});

export default Navbar;
