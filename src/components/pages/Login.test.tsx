import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // <-- Importamos userEvent
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./Login";
import authReducer from "../../store/authSlice";

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>{component}</MemoryRouter>
    </Provider>,
  );
};

describe("LoginPage Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("It should render the form correctly.", () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin@jala.edu")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("654321")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("It should show an error if the credentials are invalid", async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    renderWithProviders(<LoginPage />);

    await user.type(
      screen.getByPlaceholderText("admin@jala.edu"),
      "juan@malo.com",
    );
    await user.type(screen.getByPlaceholderText("654321"), "654321");

    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
