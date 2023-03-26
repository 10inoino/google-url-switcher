import React from 'react';
import {
  Stack,
  Heading,
  Box,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { createNewPage } from './chrome-ops';

export const MainView = () => {
  return (
    <Stack m={3}>
      <Card>
        <CardHeader pb={1}>
          <Heading size="md">New</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={4} spacing={10}>
            <Box>
              <Button
                width="100%"
                colorScheme="linkedin"
                onClick={() => {
                  createNewPage('document');
                }}
              >
                Document
              </Button>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Stack>
  );
};
