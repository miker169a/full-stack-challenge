import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EventForm from "./EventForm"; // Adjust the import path as needed

describe("EventForm", () => {
  it("submits correct data when the form is filled and submitted", async () => {
    const mockSubmit = vi.fn();
    render(<EventForm onSubmit={mockSubmit} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/event name/i), "Test Event");
    await userEvent.type(screen.getByLabelText(/event date/i), "2024-01-01");
    await userEvent.type(
      screen.getByLabelText(/event description/i),
      "This is a test event.",
    );

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Expect the mock submit function to be called with the form data
    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Test Event",
      date: "2024-01-01",
      description: "This is a test event.",
      tickets: [],
    });
  });

  it("displays initial ticket information inputs and add ticket button", async () => {
    render(<EventForm onSubmit={() => {}} />);

    // Check for the "Add Ticket Type" button
    expect(
      screen.getByRole("button", { name: /add ticket type/i }),
    ).toBeInTheDocument();
  });
  it("displays ticket inputs when add ticket button is clicked", async () => {
    render(<EventForm onSubmit={() => {}} />);
    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i }),
    );
    // Check for the presence of ticket information inputs
    expect(screen.getByPlaceholderText(/ticket name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ticket type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/booking fee/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("allows adding multiple ticket types and submits the correct data", async () => {
    const mockSubmit = vi.fn();
    render(<EventForm onSubmit={mockSubmit} />);

    // Fill out the event details
    await userEvent.type(screen.getByLabelText(/event name/i), "Test Event");
    await userEvent.type(screen.getByLabelText(/event date/i), "2024-01-01");
    await userEvent.type(
      screen.getByLabelText(/event description/i),
      "This is a test event.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i }),
    );

    // Fill out the initial ticket type
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket name/i)[0],
      "General Admission",
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket type/i)[0],
      "Adult",
    );
    await userEvent.type(screen.getAllByPlaceholderText(/price/i)[0], "100");
    await userEvent.type(
      screen.getAllByPlaceholderText(/booking fee/i)[0],
      "10",
    );
    await userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      "available",
    );

    // Add a new ticket type
    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i }),
    );

    // Fill out the second ticket type
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket name/i)[1],
      "VIP Pass",
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket type/i)[1],
      "Adult",
    );
    await userEvent.type(screen.getAllByPlaceholderText(/price/i)[1], "200");
    await userEvent.type(
      screen.getAllByPlaceholderText(/booking fee/i)[1],
      "20",
    );
    await userEvent.selectOptions(
      screen.getAllByRole("combobox")[1],
      "available",
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Expect the mock submit function to be called with the form data including both ticket types
    expect(mockSubmit).toHaveBeenCalledWith({
      description: "This is a test event.",
      name: "Test Event",
      date: "2024-01-01",
      tickets: [
        {
          name: "General Admission",
          type: "Adult",
          price: 100,
          bookingFee: 10,
          availability: "available",
        },
        {
          name: "VIP Pass",
          type: "Adult",
          price: 200,
          bookingFee: 20,
          availability: "available",
        },
      ],
    });
  });

  it("shows error messages for required fields if they are empty upon submission", async () => {
    const mockSubmit = vi.fn();
    render(<EventForm onSubmit={mockSubmit} />);

    // Attempt to submit the form without filling out the fields
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check for error messages
    expect(screen.getByText(/event name is required\./i)).toBeInTheDocument();
    expect(screen.getByText(/event date is required\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/event description is required\./i),
    ).toBeInTheDocument();

    // Expect the submit function not to be called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
