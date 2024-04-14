import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
} from '@chakra-ui/react';
import { useStore } from '../store/use-store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const AirdropPage = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.getAllTimeWinners();
  }, [store.isLoggedIn]);
  return (
    <Box minH="80vh" bg="gray.900">
      <Center py={12}>
        <Heading color="gray.50">Leaderboard</Heading>
      </Center>
      <Center>
        <TableContainer color="gray.50" minW={500} border="2px solid gray">
          <Table size="lg">
            <TableCaption>
              The table shows our most active members on X / Twitter
            </TableCaption>
            <Thead>
              <Tr>
                <Th color="#FF0080" textAlign="center">
                  Username
                </Th>
                <Th color="#FF0080" textAlign="center">
                  Points
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {store.allTimeWinners.map((winner) => (
                <Tr>
                  <Td textAlign="center">{winner.twitterHandler}</Td>
                  <Td textAlign="center">{winner.gainsOverTime}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Box>
  );
});

export default AirdropPage;
