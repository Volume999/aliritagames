import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

export function renderWithNoSession(ui: React.ReactElement) {
  return render(<SessionProvider session={null}>{ui}</SessionProvider>);
}
