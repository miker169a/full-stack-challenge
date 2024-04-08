import React, { useState } from "react";

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
  // Component implementation
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

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const addTicketType = () => {
    setFormData({
      ...formData,
      tickets: [
        ...formData.tickets,
        {
          name: "",
          type: "",
          price: 0,
          bookingFee: 0,
          availability: "available",
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Event Name</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

      <label htmlFor="date">Event Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />
      {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}

      <label htmlFor="description">Event Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      {errors.description && (
        <div style={{ color: "red" }}>{errors.description}</div>
      )}

      {formData.tickets.map((ticket, index) => (
        <div key={index}>
          <input
            placeholder="Ticket Name"
            value={ticket.name}
            onChange={(e) => handleTicketChange(index, "name", e.target.value)}
          />
          <input
            placeholder="Ticket Type"
            value={ticket.type}
            onChange={(e) => handleTicketChange(index, "type", e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={ticket.price}
            onChange={(e) =>
              handleTicketChange(index, "price", parseFloat(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Booking Fee"
            value={ticket.bookingFee}
            onChange={(e) =>
              handleTicketChange(
                index,
                "bookingFee",
                parseFloat(e.target.value),
              )
            }
          />
          <select
            value={ticket.availability}
            onChange={(e) =>
              handleTicketChange(index, "availability", e.target.value)
            }
          >
            <option value="available">Available</option>
            <option value="sold out">Sold Out</option>
          </select>
        </div>
      ))}

      <button type="button" onClick={addTicketType}>
        Add Ticket Type
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
