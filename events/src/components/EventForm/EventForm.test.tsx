import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EventForm from "./EventForm";

describe("EventForm", () => {
  it("submits correct data when the form is filled and submitted", async () => {
    const mockSubmit = vi.fn();
    render(<EventForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/event name/i), "Test Event");
    await userEvent.type(screen.getByLabelText(/event date/i), "2024-01-01");
    await userEvent.type(
      screen.getByLabelText(/event description/i),
      "This is a test event."
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Test Event",
      date: "2024-01-01",
      description: "This is a test event.",
      tickets: [],
    });
  });

  it("displays initial ticket information inputs and add ticket button", async () => {
    render(<EventForm onSubmit={() => { }} />);

    expect(
      screen.getByRole("button", { name: /add ticket type/i })
    ).toBeInTheDocument();
  });
  it("displays ticket inputs when add ticket button is clicked", async () => {
    render(<EventForm onSubmit={() => { }} />);
    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i })
    );
    expect(screen.getByPlaceholderText(/ticket name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ticket type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/booking fee/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("allows adding multiple ticket types and submits the correct data", async () => {
    const mockSubmit = vi.fn();
    render(<EventForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/event name/i), "Test Event");
    await userEvent.type(screen.getByLabelText(/event date/i), "2024-01-01");
    await userEvent.type(
      screen.getByLabelText(/event description/i),
      "This is a test event."
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i })
    );

    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket name/i)[0],
      "General Admission"
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket type/i)[0],
      "Adult"
    );
    await userEvent.type(screen.getAllByPlaceholderText(/price/i)[0], "100");
    await userEvent.type(
      screen.getAllByPlaceholderText(/booking fee/i)[0],
      "10"
    );
    await userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      "available"
    );

    await userEvent.click(
      screen.getByRole("button", { name: /add ticket type/i })
    );

    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket name/i)[1],
      "VIP Pass"
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/ticket type/i)[1],
      "Adult"
    );
    await userEvent.type(screen.getAllByPlaceholderText(/price/i)[1], "200");
    await userEvent.type(
      screen.getAllByPlaceholderText(/booking fee/i)[1],
      "20"
    );
    await userEvent.selectOptions(
      screen.getAllByRole("combobox")[1],
      "available"
    );

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

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

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/event name is required\./i)).toBeInTheDocument();
    expect(screen.getByText(/event date is required\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/event description is required\./i)
    ).toBeInTheDocument();

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
