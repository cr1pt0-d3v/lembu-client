import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink: React.FC<{ to: string; children: any }> = ({
  to,
  children,
  ...props
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Box color={isActive ? '#FF0080' : 'gray.50'} _hover={{ color: '#FF0080' }}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </Box>
  );
};

const RoutesComponent = () => {
  return (
    <>
      <CustomLink to="/">
        <Box p="2">
          <Heading size="md">Home</Heading>
        </Box>
      </CustomLink>

      <CustomLink to="/airdrop">
        <Box p="2">
          <Heading size="md">X-AirDrop</Heading>
        </Box>
      </CustomLink>

      <CustomLink to="/contests">
        <Box p="2">
          <Heading size="md">Active Contests</Heading>
        </Box>
      </CustomLink>
    </>
  );
};

export default RoutesComponent;
