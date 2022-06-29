import userEvent from "@testing-library/user-event";
import {
  renderWithProviders as render,
  screen,
} from "../../common/utils/testUtil";
import Policies from "./Policies";

describe("Policies page tests", () => {
  it("shows page name", () => {
    render(<Policies />, {}, ["policies"]);
    expect(
      screen.getByRole("heading", { name: "Policies" })
    ).toBeInTheDocument();
  });

  it("shows add policy button", () => {
    render(<Policies />, {}, ["policies"]);
    expect(
      screen.getByRole("button", { name: "Add policy" })
    ).toBeInTheDocument();
  });

  it("when add policy button is clicked, shows policy form", () => {
    render(<Policies />, {}, ["policies"]);
    const addPolicy = screen.getByRole("button", { name: "Add policy" });
    userEvent.click(addPolicy);
    expect(
      screen.getByRole("heading", { name: "Add policy" })
    ).toBeInTheDocument();
  });
});
