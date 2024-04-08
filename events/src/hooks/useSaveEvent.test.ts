import { renderHook, waitFor } from "@testing-library/react";
import { useSaveEvent } from "./useSaveEvent"; // Adjust the import path as needed
import { describe, it, expect } from "vitest";

describe("useSaveEvent", () => {
  it("should initialize without throwing an error", () => {
    const { result } = renderHook(() => useSaveEvent());

    expect(result.current.error).toBeNull();
  });

  it("can save an event", async () => {
    const { result } = renderHook(() => useSaveEvent());
    const eventData = {
      name: "Mikes Test Event",
      date: "2024-01-01",
      description: "This is a test event.",
      tickets: [],
    };
    result.current.saveEvent(eventData);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });
});
