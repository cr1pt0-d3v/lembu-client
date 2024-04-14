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
/* import React, { useEffect } from 'react';
import { axiosClient } from '../services/AxiosClient'; */

const AirdropPage = () => {
  /* const [userTwitterList, setUserTwitterList] = React.useState([]);

  useEffect(() => {
    axiosClient
      .get('/data/getAllTimeWinners')
      .then((res) => {
        console.log('useEffect ', res as any);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */
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
              <Tr>
                <Td textAlign="center">inches</Td>
                <Td textAlign="center">millimetres (mm)</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Box>
  );
};

export default AirdropPage;
