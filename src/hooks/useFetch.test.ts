import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useFetch from "./useFetch";

const mockData = { items: [{ id: "1", title: "Don Quijote" }] };

describe("useFetch Custom Hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("It should fetch the data successfully", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() =>
      useFetch("https://api.fake.com/books", (data) => data),
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("It should handle errors if the fetch fails.", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch("https://api.fake.com/error"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain("404");
    expect(result.current.data).toBeNull();
  });

  it("It shouldn't fetch if the URL is empty (Cache Bypass)", () => {
    const { result } = renderHook(() => useFetch(""));

    expect(result.current.isLoading).toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
