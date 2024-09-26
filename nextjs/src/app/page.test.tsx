/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with Server Components", () => {
  const { container } =render(<Page />);
  const heading = screen.getByRole('heading');
  //console.log(heading)
  expect(heading).toHaveTextContent("Home");



  const heading2 = container.querySelector('h2');
  //console.log(heading)
  expect(heading2).toHaveTextContent("Home");
});