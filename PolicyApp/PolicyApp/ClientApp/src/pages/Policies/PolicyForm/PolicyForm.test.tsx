import {
  renderWithProviders as render,
  screen,
  waitFor,
  within,
} from "../../../common/utils/testUtil";
import { FormMode } from "../../../common/types/form";
import PolicyForm from "./PolicyForm";
import userEvent from "@testing-library/user-event";
import { add } from "../../../common/store/policy/policySlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("PolicyForm component tests", () => {
  it("shows form heading", () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);
    expect(
      screen.getByRole("heading", { name: "Add policy" })
    ).toBeInTheDocument();
  });

  it("shows fields", () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);
    expect(screen.getByLabelText("Policy number")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  });

  it("shows save and cancel buttons", () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("when cancel button is clicked, invokes onCancel callback", async () => {
    const mockCancelHandler = jest.fn();
    render(
      <PolicyForm mode={FormMode.ADD} onCancel={mockCancelHandler} />,
      {},
      ["policies"]
    );

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(cancelButton);
    expect(mockCancelHandler).toBeCalledTimes(1);
  });

  it("when close icon is clicked, invokes onCancel callback", async () => {
    const mockCancelHandler = jest.fn();
    render(
      <PolicyForm mode={FormMode.ADD} onCancel={mockCancelHandler} />,
      {},
      ["policies"]
    );

    const closeIcon = screen.getByRole("button", { name: "close.svg" });
    userEvent.click(closeIcon);
    expect(mockCancelHandler).toBeCalledTimes(1);
  });

  it("when all fields are filled correctly and save is clicked, dispatches add action", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    userEvent.type(screen.getByLabelText("Policy number"), "123");
    userEvent.type(screen.getByLabelText("Name"), "Regin Thangaraj");
    userEvent.type(screen.getByLabelText("Age"), "30");
    const genderDropdown = screen.getByLabelText("Gender");
    userEvent.selectOptions(genderDropdown, screen.getByText("Male"));

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: add.toString(),
        payload: {
          policyNumber: 123,
          policyHolder: {
            name: "Regin Thangaraj",
            age: 30,
            gender: 0,
          },
        },
      });
    });
  });
});

describe("Policy form validation tests", () => {
  it("when policy number is left blank, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-number")
    ).findByText("Required");
    expect(requiredError).toBeInTheDocument();
  });

  it("when policy number is not a number, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const policyNumber = screen.getByLabelText("Policy number");
    userEvent.type(policyNumber, "abc");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-number")
    ).findByText("Must be a number");
    expect(requiredError).toBeInTheDocument();
  });

  it("when policy number is 0 or less, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const policyNumber = screen.getByLabelText("Policy number");
    userEvent.type(policyNumber, "-1");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-number")
    ).findByText("Must be greater than 0");
    expect(requiredError).toBeInTheDocument();
  });

  it("when policy number is more than 999999, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const policyNumber = screen.getByLabelText("Policy number");
    userEvent.type(policyNumber, "1000000");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-number")
    ).findByText("Must be less than 1000000");
    expect(requiredError).toBeInTheDocument();
  });

  it("when name is left blank, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-name")
    ).findByText("Required");
    expect(requiredError).toBeInTheDocument();
  });

  it("when name exceeds 50 chars, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const nameTextbox = screen.getByLabelText("Name");
    userEvent.type(
      nameTextbox,
      "Regin Thangaraj Regin Thangaraj Regin Thangaraj Regin Thangaraj"
    );

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-name")
    ).findByText("Must be 50 characters or less");
    expect(requiredError).toBeInTheDocument();
  });

  it("when age is left blank, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-age")
    ).findByText("Required");
    expect(requiredError).toBeInTheDocument();
  });

  it("when age is not a number, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const ageTextbox = screen.getByLabelText("Age");
    userEvent.type(ageTextbox, "abc");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-age")
    ).findByText("Must be a number");
    expect(requiredError).toBeInTheDocument();
  });

  it("when age is 0 or less, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const ageTextbox = screen.getByLabelText("Age");
    userEvent.type(ageTextbox, "-1");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-age")
    ).findByText("Must be greater than 0");
    expect(requiredError).toBeInTheDocument();
  });

  it("when age is more than 99, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const ageTextbox = screen.getByLabelText("Age");
    userEvent.type(ageTextbox, "100");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-age")
    ).findByText("Must be less than 100");
    expect(requiredError).toBeInTheDocument();
  });

  it("when gender is not selected, shows relevant error", async () => {
    render(<PolicyForm mode={FormMode.ADD} onCancel={() => {}} />, {}, [
      "policies",
    ]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveBtn);

    const requiredError = await within(
      screen.getByTestId("policy-form-gender")
    ).findByText("Required");
    expect(requiredError).toBeInTheDocument();
  });
});
