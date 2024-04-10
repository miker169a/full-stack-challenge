import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import {
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useGetEventQuery } from "../services/generated/eventsApi";
import { skipToken } from "@reduxjs/toolkit/query";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: eventDetails,
    error,
    isLoading,
  } = useGetEventQuery(id ? { id } : skipToken);

  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error) {
    let errorMessage = "An unexpected error occurred";
    if ("status" in error && error.status === "FETCH_ERROR") {
      errorMessage = "Network error: Failed to fetch event";
    } else if ("data" in error) {
      errorMessage = `Server error: ${(error.data as Error).message}`;
    }

    return (
      <Alert status="error">
        <AlertIcon />
        {errorMessage}
      </Alert>
    );
  }
  if (!eventDetails) return <Box>No event found</Box>;
  const formattedDate = DateTime.fromISO(eventDetails.date).toLocaleString(
    DateTime.DATETIME_FULL
  );

  return (
    <VStack spacing={4} align="stretch" m={4}>
      <Heading as="h1">{eventDetails.name}</Heading>
      <Text fontSize="xl">{formattedDate}</Text>
      <Text fontSize="md">{eventDetails.description}</Text>
      <Heading as="h2" size="lg">
        Tickets
      </Heading>
      {eventDetails.tickets && eventDetails.tickets.length > 0 ? (
        <List spacing={3}>
          {eventDetails.tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="50%"
              >
                <Text fontWeight="bold">{ticket.name}</Text>
                <Flex alignItems="center">
                  <Text mr={4}>
                    {ticket.type} - £{ticket.price} + £{ticket.bookingFee}{" "}
                    booking fee
                  </Text>
                  <ListIcon
                    as={CheckCircleIcon}
                    color={
                      ticket.availability === "available"
                        ? "green.500"
                        : "red.500"
                    }
                  />
                  <Text ml={2}>{ticket.availability}</Text>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No tickets available.</Text>
      )}
    </VStack>
  );
};

export default EventDetails;
