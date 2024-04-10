import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  HStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Input,
  Box,
} from "@chakra-ui/react";
import { Ticket } from "../../services/generated/eventsApi";

type TicketFormProps = {
  ticket: Ticket;
  index: number;
  handleToggle: (index: number) => void;
  handleTicketChange: (index: number, field: keyof Ticket, value: any) => void;
};

export const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  index,
  handleToggle,
  handleTicketChange,
}) => (
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
            onChange={(e) => handleTicketChange(index, "name", e.target.value)}
          />
          <FormLabel htmlFor={`ticket-type-${index}`}>Ticket Type</FormLabel>
          <Input
            id={`ticket-type-${index}`}
            placeholder="Ticket Type"
            value={ticket.type}
            onChange={(e) => handleTicketChange(index, "type", e.target.value)}
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
