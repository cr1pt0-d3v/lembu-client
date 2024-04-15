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
    store.getAllUsers();
  }, [store.isLoggedIn]);
  return (
    <Box minH="80vh" bg="gray.900">
      <Center py={12}>
        <Heading color="gray.50">Leaderboard</Heading>
      </Center>
      <Center>
        <TableContainer
          color="gray.50"
          minW={['320']}
          border="2px solid gray"
          m={2}
        >
          <Table size="lg">
            <TableCaption>
              The table shows most active members on X
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
                <Tr key={winner.twitterHandler}>
                  <Td textAlign="center">{winner.twitterHandler != "" && winner.twitterHandler != null ? winner.twitterHandler : "Unknown $LEMBU fan"}</Td>
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
