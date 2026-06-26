// Imports: React Router components used to match URLs to page components.
import { Routes, Route } from "react-router";

// Layout imports: shared page shells that render nested routes through Outlet.
import PresentLayout from "./layouts/PresentLayout";
import PracticeLayout from "./layouts/PracticeLayout";

// Component imports: each route below renders one learning example.
import Button from "./components/Button";
import Box from "./components/Box";
import ScrollTriggered from "./components/ScrollTriggered";
import ScrollLinked from "./components/ScrollLinked";
import LayoutAnimation from "./components/LayoutAnimation";
import OrchestratedVariants from "./components/OrchestratedVariants";
import GesturePractice from "./components/GesturePractice";
import TransitionPractice from "./components/TransitionPractice";
import DarkMode from "./components/DarkMode";
import SharedLayoutAnimation from "./components/SharedLayoutAnimation";
import PracticeST from "./components/PracticeST";
import ExitAnimation from "./components/ExitAnimation";
import UseTransform from "./components/UseTransform";
import AddToBasket from "./components/AddToBasket";
import StateAnimations from "./components/StateAnimations";
import NotificationsStack from "./components/NotificationsStack";

// Home page content: the default screen shown at the root route (`/`).
const LibraryHome = () => {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/40">
          Motion UI Library
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Select a component
        </h1>

        <p className="mt-4 text-black/60">
          Choose any Motion component from the sidebar to preview and practice.
        </p>
      </div>
    </div>
  );
};

const App = () => {
  // Sidebar route data: PresentLayout receives this once and maps it into both navigation menus.
  // Keeping label, tag, and path together helps the sidebar stay aligned with the routes below.
  const links = [
    {
      title: "Button",
      path: "/button",
      tag: "Basic",
    },
    {
      title: "Box",
      path: "/box",
      tag: "Basic",
    },
    {
      title: "Scroll Triggered",
      path: "/scroll-triggered",
      tag: "Scroll",
    },
    {
      title: "Scroll Linked",
      path: "/scroll-linked",
      tag: "Scroll",
    },
    {
      title: "Layout Animation",
      path: "/layout-animation",
      tag: "Layout",
    },
    {
      title: "Orchestrated Variants",
      path: "/orchestrated-variants",
      tag: "Variants",
    },
    {
      title: "Gesture Practice",
      path: "/gesture-practice",
      tag: "Gesture",
    },
    {
      title: "Transition Practice",
      path: "/transition-practice",
      tag: "Transition",
    },
    {
      title: "Dark Mode",
      path: "/dark-mode",
      tag: "Theme",
    },
    {
      title: "Layouts",
      path: "/layout",
      tag: "Layout",
    },
    {
      title: "Exit Animation",
      path: "/exit-animation",
      tag: "Exit",
    },
    {
      title: "Use Transform",
      path: "/use-transform",
      tag: "Motion Value",
    },
    {
      title: "State Animations",
      path: "/state-animations",
      tag: "State",
    },
    {
      title: "Add To Basket",
      path: "/add-to-basket",
      tag: "useAnimate",
    },
    {
      title: "Notifications Stack",
      path: "/notifications-stack",
      tag: "Stack",
    },
  ];

  return (
    // Main router setup: Routes finds the Route that matches the current browser URL.
    <Routes>
      {/* Nested layout routes: this parent route keeps PresentLayout and its sidebar on every library page. */}
      <Route path="/" element={<PresentLayout links={links} />}>
        {/* The index route is the default child, so it renders at exactly `/`. */}
        <Route index element={<LibraryHome />} />
        <Route path="button" element={<Button />} />
        <Route path="box" element={<Box />} />
        <Route path="scroll-triggered" element={<ScrollTriggered />} />
        <Route path="scroll-linked" element={<ScrollLinked />} />
        <Route path="layout-animation" element={<LayoutAnimation />} />
        <Route
          path="orchestrated-variants"
          element={<OrchestratedVariants />}
        />
        <Route path="gesture-practice" element={<GesturePractice />} />
        <Route path="transition-practice" element={<TransitionPractice />} />
        <Route path="dark-mode" element={<DarkMode />} />
        <Route path="layout" element={<SharedLayoutAnimation />} />
        {/* Child paths are relative to `/`; this resolves to `/exit-animation` inside PresentLayout. */}
        <Route path="exit-animation" element={<ExitAnimation />} />
        <Route path="use-transform" element={<UseTransform />} />
        <Route path="state-animations" element={<StateAnimations />} />
        <Route path="add-to-basket" element={<AddToBasket />} />
        <Route path="notifications-stack" element={<NotificationsStack />} />
      </Route>

      {/* Practice routes: PracticeLayout supplies its own Outlet for all `/practice` children. */}
      <Route path="/practice" element={<PracticeLayout />}>
        {/* An index route is the clean default child for exactly `/practice`. */}
        <Route index element={<PracticeST />} />
        {/* <Route path="" element={<PracticeST />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
