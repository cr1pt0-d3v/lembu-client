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


const ContestPage = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.getActiveContests();
    store.getContestsTempData();
  }, []);
  return (
    <>
      <Box minH="80vh" bg="gray.900">
        <Center py={12}>
          <Heading color="gray.50">Active Contest</Heading>
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
                {store.activeContests.length > 0 ? "All active contests" : "There is no contest running at this time!"}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th color="#FF0080" textAlign="center">
                    Contest
                  </Th>
                  <Th color="#FF0080" textAlign="center">
                    Description
                  </Th>
                  <Th color="#FF0080" textAlign="center">
                    End Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {store.activeContests.map((contest, index) => (
                  <Tr key={contest.id}>
                    <Td textAlign="center">{`No. ${index + 1}`}</Td>
                    <Td textAlign="center">{store.getContestDescription(contest)}</Td>
                    <Td textAlign="center">{new Date(contest.contestEndDate).toLocaleString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Center>


        {store.contestsTempData.map((contest, index) => (
          <>
            <Center py={12}>
              <Heading color="gray.50">Temporary Leaderboard for contest No. {index + 1}</Heading>
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
                    {contest.contestUsers.length > 0 ? "All users registered in the context last time we checked" : "No data at this point!"}
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th color="#FF0080" textAlign="center">
                        Twitter Handler
                      </Th>
                      <Th color="#FF0080" textAlign="center">
                        Score
                      </Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                    {contest.contestUsers.map((user) => (
                      <Tr key={contest.contestId + user.userTwitterHandler}>

                        <Td textAlign="center">{user.userTwitterHandler}</Td>
                        <Td textAlign="center">{user.userScore}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Center>
          </>
        ))}
      </Box>
    </>
  );
});

export default ContestPage;
