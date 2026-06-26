// Imports: Outlet is the placeholder for a nested React Router page.
import { Outlet } from "react-router";

const PracticeLayout = () => {
  // This layout has no extra UI; it simply renders the route nested inside `/practice`.
  return <Outlet />;
};

export default PracticeLayout;
