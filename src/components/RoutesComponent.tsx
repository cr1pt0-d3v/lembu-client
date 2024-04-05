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
    <Box color={isActive ? 'tomato' : 'blue'}>
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
          <Heading size="16px">Home</Heading>
        </Box>
      </CustomLink>

      <CustomLink to="/signin">
        <Box p="2">
          <Heading size="16px">Signin</Heading>
        </Box>
      </CustomLink>

      <CustomLink to="/user">
        <Box p="2">
          <Heading size="16px">User</Heading>
        </Box>
      </CustomLink>
    </>
  );
};

export default RoutesComponent;
