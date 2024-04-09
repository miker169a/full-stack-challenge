import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Home } from "./pages/Home";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
function App() {
  return (
    <>
      <Router>
        <Box bg="blue.500" p={4} color="white">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            maxW="960px"
            mx="auto"
          >
            <Text fontSize="xl" fontWeight="bold">
              Event App
            </Text>
            <Stack direction="row" spacing={8}>
              <Link
                as={RouterLink}
                to="/"
                _hover={{ textDecoration: "none", color: "blue.200" }}
              >
                Home
              </Link>
              <Link
                as={RouterLink}
                to="/events"
                _hover={{ textDecoration: "none", color: "blue.200" }}
              >
                Events List
              </Link>
            </Stack>
          </Flex>
        </Box>

        <Box p={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
