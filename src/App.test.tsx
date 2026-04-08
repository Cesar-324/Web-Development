import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("renderiza texto", () => {
  render(<h1>Hola mundo</h1>);
  expect(screen.getByText("Hola mundo")).toBeInTheDocument();
});
