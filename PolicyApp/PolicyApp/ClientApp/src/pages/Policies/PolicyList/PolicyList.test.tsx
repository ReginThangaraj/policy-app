import { Gender, Policy } from "../../../common/types/policy";
import {
  renderWithProviders as render,
  screen,
} from "../../../common/utils/testUtil";
import PolicyList from "./PolicyList";

describe("PolicyList component tests", () => {
  const policies: Policy[] = [
    {
      policyNumber: 10,
      policyHolder: {
        name: "Regin",
        age: 30,
        gender: Gender.Male,
      },
    },
    {
      policyNumber: 11,
      policyHolder: {
        name: "Riya R",
        age: 8,
        gender: Gender.Female,
      },
    },
  ];

  it("shows list header", () => {
    render(
      <PolicyList policies={policies} onEdit={() => {}} onDelete={() => {}} />,
      {},
      ["policies"]
    );
    expect(screen.getByText("Policy number")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("shows policy data", () => {
    render(
      <PolicyList policies={policies} onEdit={() => {}} onDelete={() => {}} />,
      {},
      ["policies"]
    );
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Regin")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });
});
