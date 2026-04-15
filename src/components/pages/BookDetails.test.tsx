import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";
import authReducer from "../../store/authSlice";
import loansReducer from "../../store/loansSlice";
import * as toastModule from "react-hot-toast";

const mockBook = {
  id: "1",
  title: "React Masterclass",
  author: "John Doe",
  description: "A great book",
  publishedDate: "2026",
  coverUrl: "http://example.com/cover.jpg",
};

const mockGoogleApiBook = {
  id: "1",
  volumeInfo: {
    title: "React Masterclass",
    authors: ["John Doe"],
    description: "A great book",
    publishedDate: "2026",
    imageLinks: {
      thumbnail: "http://example.com/cover.jpg",
    },
  },
};

const renderWithProviders = (
  initialAuthState: any = {
    isAuthenticated: false,
    user: { name: "", email: "" },
    token: "",
  },
  initialLoansState: any = { borrowedBooks: [] },
) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      loans: loansReducer,
    },
    preloadedState: {
      auth: initialAuthState,
      loans: initialLoansState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/book/1"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("BookDetails Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGoogleApiBook,
    });
  });

  it("should trigger a toast error if the user is NOT authenticated and tries to request a book", async () => {
    const toastErrorSpy = vi
      .spyOn(toastModule.default, "error")
      .mockImplementation(() => "toast-id");

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText("React Masterclass")).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: "Request Book" });

    fireEvent.click(button);

    expect(toastErrorSpy).toHaveBeenCalledWith(
      "You need to log in to request a book.",
    );

    toastErrorSpy.mockRestore();
  });

  it("should allow requesting the book if the user IS authenticated", async () => {
    const authState = {
      isAuthenticated: true,
      user: { name: "Admin", email: "admin@jala.edu" },
      token: "123",
    };
    renderWithProviders(authState);

    await waitFor(() => {
      expect(screen.getByText("React Masterclass")).toBeInTheDocument();
    });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Request Book");
    expect(button).not.toBeDisabled();
  });

  it("should disable the button if the authenticated user has ALREADY requested the book", async () => {
    const authState = {
      isAuthenticated: true,
      user: { name: "Admin", email: "admin@jala.edu" },
      token: "123",
    };

    const loansState = { borrowedBooks: [mockBook] };

    renderWithProviders(authState, loansState);

    await waitFor(() => {
      expect(screen.getByText("React Masterclass")).toBeInTheDocument();
    });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Already Requested");
    expect(button).toBeDisabled();
  });
});
