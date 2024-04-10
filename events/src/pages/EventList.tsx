import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { Link as RouterLink } from "react-router-dom";
import { useGetEventsQuery } from "../services/generated/eventsApi";
import {
  Box,
  Heading,
  Link,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  Divider,
  Flex,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";

export interface Ticket {
  id?: string;
  eventId?: string;
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: "available" | "sold out";
}

export interface Event {
  id?: string;
  name: string;
  date: string;
  description: string;
  tickets?: Ticket[];
}

function EventList() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Event | undefined>(undefined);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<"name" | "description">("name");
  const [filterValue, setFilterValue] = useState<string>("");

  function debounce<F extends (...args: any[]) => any>(
    func: F,
    wait: number
  ): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<F>) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), wait);
    };
  }

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    debouncedSetFilterValue(event.target.value);
  };

  const debouncedSetFilterValue = useRef(debounce(setFilterValue, 200)).current;

  const {
    data: events = [],
    error,
    isLoading,
  } = useGetEventsQuery({
    page,
    sortBy,
    order,
    filterType,
    filterValue,
  });

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const filterValueInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    filterValueInputRef.current?.focus();
  }, []);

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

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h1" size="xl" textAlign="center">
        Events
      </Heading>
      <Flex justifyContent="space-between">
        <Select
          placeholder="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof Event)}
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
        </Select>
        <Select
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
        <Select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "name" | "description")
          }
        >
          <option value="name">Name</option>
          <option value="description">Description</option>
        </Select>
        <Input
          placeholder="Filter Value"
          value={filterValue}
          onChange={handleFilterValueChange}
          ref={filterValueInputRef}
        />
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {events.map((event: Event) => (
          <Link
            as={RouterLink}
            to={`/events/${event.id}`}
            _hover={{ textDecoration: "none" }}
            key={event.id}
          >
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
              height="100%"
            >
              <Flex direction="row" align="stretch" height="100%">
                <Box
                  width="25%"
                  bg="blue.100"
                  color="blue.900"
                  p={2}
                  textAlign="center"
                  display="flex"
                  flexDirection="column" // Adjust this to stack items vertically
                  alignItems="center"
                  justifyContent="center"
                >
                  {
                    // Assuming `event.date` is your ISO date string
                    DateTime.fromISO(event.date).toLocaleString({
                      month: "long",
                    }) // Example: January
                  }
                  <br />
                  {
                    DateTime.fromISO(event.date).toLocaleString({
                      day: "2-digit",
                    }) // Example: 01
                  }
                  <br />
                  {
                    DateTime.fromISO(event.date)
                      .setZone("local")
                      .toLocaleString(DateTime.TIME_SIMPLE) // Example: 10:30 AM
                  }
                </Box>
                <Divider orientation="vertical" />
                <Box p={5} flex="1">
                  <Heading as="h3" size="md" mb={2}>
                    {event.name}
                  </Heading>
                  <Text noOfLines={4}>{event.description}</Text>
                </Box>
              </Flex>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      <Flex justifyContent="space-between" mt="8">
        <Button onClick={prevPage} isDisabled={page === 1}>
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={nextPage}>Next</Button>
      </Flex>
    </VStack>
  );
}

export default EventList;
