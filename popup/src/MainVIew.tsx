import React, { useEffect, useState } from 'react';
import {
  Stack,
  Heading,
  Box,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { convert, createNewPage, download, GoogleUrlRegex } from './chrome-ops';

export const MainView = () => {
  const [ isGooglePage, setGooglePage ] = useState<boolean>(false);
  const [ service, setService ] = useState<string>('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url) {
        const match = tab.url.match(GoogleUrlRegex);
        if (match) {
          setGooglePage(true);
          setService(match[1]);
        }
      }
    });
  }, []);

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
                colorScheme="messenger"
                onClick={() => {
                  createNewPage('document');
                }}
              >
                Document
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="green"
                onClick={() => {
                  createNewPage('spreadsheets');
                }}
              >
                SpreadSheet
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="yellow"
                onClick={() => {
                  createNewPage('presentation');
                }}
              >
                Presentation
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="purple"
                onClick={() => {
                  createNewPage('forms');
                }}
              >
                Form
              </Button>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
      <Card>
        <CardHeader pb={1}>
          <Heading size="md">Convert</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={4} spacing={10}>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  convert('preview');
                }}
                isDisabled={!isGooglePage}
              >
                To Preview
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  convert('edit');
                }}
                isDisabled={!isGooglePage}
              >
                To Edit
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  convert('copy');
                }}
                isDisabled={!isGooglePage}
              >
                To Copy
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  convert('template');
                }}
                isDisabled={!isGooglePage}
              >
                To Template
              </Button>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
      <Card>
        <CardHeader pb={1}>
          <Heading size="md">Download Link</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={4} spacing={10}>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  download("pdf");
                }}
                isDisabled={!isGooglePage}
              >
                pdf
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  download("docx");
                }}
                isDisabled={!isGooglePage || service !== 'document'}
              >
                docx
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  download("xlsx");
                }}
                isDisabled={!isGooglePage || service !== 'spreadsheets'}
              >
                xlsx
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  download("pptx");
                }}
                isDisabled={!isGooglePage || service !== 'presentation'}
              >
                pptx
              </Button>
            </Box>
            <Box>
              <Button
                width="100%"
                colorScheme="teal"
                onClick={() => {
                  download("csv");
                }}
                isDisabled={!isGooglePage || service !== 'spreadsheets'}
              >
                csv
              </Button>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Stack>
  );
};
