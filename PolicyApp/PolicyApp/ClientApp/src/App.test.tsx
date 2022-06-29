import { renderWithProviders as render, screen } from "./common/utils/testUtil";
import App from "./App";

describe("App tests", () => {
  it("shows application name", () => {
    render(<App />, {}, ["common"]);
    const appName = screen.getByText("Test App");
    expect(appName).toBeInTheDocument();
  });
});
