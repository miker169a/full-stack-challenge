import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Center,
  Input,
  Button,
  Textarea,
  FormErrorMessage,
  VStack,
  HStack,
  Accordion,
} from "@chakra-ui/react";

import { Event, Ticket } from "../../services/generated/eventsApi";
import { TicketForm } from "../TicketForm/TicketForm";

interface EventFormProps {
  onSubmit: (data: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Event>({
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: any
  ) => {
    const updatedTicketTypes = formData.tickets.map(
      (ticket: Ticket, i: number) => {
        if (i === index) {
          return { ...ticket, [field]: value };
        }
        return ticket;
      }
    );
    setFormData({ ...formData, tickets: updatedTicketTypes });
  };

  const [openTicketIndex, setOpenTicketIndex] = useState<number | undefined>(
    undefined
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
      prevIndex === index ? undefined : index
    );
  };

  const handleChangeDateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          {formData.tickets.map((ticket, index) => (
            <TicketForm
              key={index}
              ticket={ticket}
              index={index}
              handleToggle={handleToggle}
              handleTicketChange={handleTicketChange}
            />
          ))}
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
