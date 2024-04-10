import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Center,
  Input,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  Textarea,
  FormErrorMessage,
  VStack,
  HStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface EventFormData {
  name: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

interface Ticket {
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: "available" | "sold out";
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    date: "",
    description: "",
    tickets: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    date: "",
    description: "",
  });
  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", date: "", description: "" };

    if (!formData.name) {
      isValid = false;
      errors.name = "Event name is required.";
    }

    if (!formData.date) {
      isValid = false;
      errors.date = "Event date is required.";
    }

    if (!formData.description) {
      isValid = false;
      errors.description = "Event description is required.";
    }

    //ToDo validate ticket types

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      onSubmit(formData);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: any,
  ) => {
    const updatedTicketTypes = formData.tickets.map(
      (ticket: Ticket, i: number) => {
        if (i === index) {
          return { ...ticket, [field]: value };
        }
        return ticket;
      },
    );
    setFormData({ ...formData, tickets: updatedTicketTypes });
  };

  const [openTicketIndex, setOpenTicketIndex] = useState<number | undefined>(
    undefined,
  );

  const addTicketType = () => {
    const newTickets: Ticket[] = [
      ...formData.tickets,
      {
        name: "",
        type: "",
        price: 0,
        bookingFee: 0,
        availability: "available",
      },
    ];
    setFormData({ ...formData, tickets: newTickets });
    setOpenTicketIndex(formData.tickets.length);
  };

  const handleToggle = (index: number) => {
    setOpenTicketIndex((prevIndex) =>
      prevIndex === index ? undefined : index,
    );
  };

  const handleChangeDateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderTicketTypeForm = (ticket: Ticket, index: number) => (
    <AccordionItem key={index}>
      <h2>
        <AccordionButton onClick={() => handleToggle(index)}>
          <Box flex="1" textAlign="left">
            Ticket Type {index + 1}: {ticket.name || "New Ticket"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <HStack justifyContent="space-between" pt={4}>
          <FormControl key={index} mb={4}>
            {" "}
            <FormLabel htmlFor={`ticket-name-${index}`}>Ticket Name</FormLabel>
            <Input
              id={`ticket-name-${index}`}
              placeholder="Ticket Name"
              value={ticket.name}
              onChange={(e) =>
                handleTicketChange(index, "name", e.target.value)
              }
            />
            <FormLabel htmlFor={`ticket-type-${index}`}>Ticket Type</FormLabel>
            <Input
              id={`ticket-type-${index}`}
              placeholder="Ticket Type"
              value={ticket.type}
              onChange={(e) =>
                handleTicketChange(index, "type", e.target.value)
              }
            />
            <FormLabel htmlFor={`ticket-price-${index}`}>Price</FormLabel>
            <NumberInput
              value={ticket.price}
              onChange={(valueString) =>
                handleTicketChange(index, "price", parseFloat(valueString))
              }
              min={0}
            >
              <NumberInputField id={`ticket-price-${index}`} />
            </NumberInput>
            <FormLabel htmlFor={`ticket-bookingFee-${index}`}>
              Booking Fee
            </FormLabel>
            <NumberInput
              value={ticket.bookingFee}
              onChange={(valueString) =>
                handleTicketChange(index, "bookingFee", parseFloat(valueString))
              }
              min={0}
            >
              <NumberInputField id={`ticket-bookingFee-${index}`} />
            </NumberInput>
            <FormLabel htmlFor={`ticket-availability-${index}`}>
              Availability
            </FormLabel>
            <Select
              id={`ticket-availability-${index}`}
              value={ticket.availability}
              onChange={(e) =>
                handleTicketChange(index, "availability", e.target.value)
              }
              placeholder="Select availability"
            >
              <option value="available">Available</option>
              <option value="sold out">Sold Out</option>
            </Select>
          </FormControl>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );

  return (
    <Center w="full" h="100vh">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel htmlFor="name">Event Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.date)}>
            <FormLabel htmlFor="date">Event Date</FormLabel>
            <Input
              as="input"
              id="date"
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChangeDateTime}
            />
            <FormErrorMessage>{errors.date}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.description)}>
            <FormLabel htmlFor="description">Event Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
        </VStack>
        <Accordion
          allowMultiple
          index={openTicketIndex}
          onChange={(index) => setOpenTicketIndex(index as number)}
        >
          {formData.tickets.map(renderTicketTypeForm)}
        </Accordion>
        <HStack justifyContent="space-between" pt={4}>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
          <Button variant="outline" onClick={addTicketType}>
            Add Ticket Type
          </Button>
        </HStack>
      </form>
    </Center>
  );
};

export default EventForm;
