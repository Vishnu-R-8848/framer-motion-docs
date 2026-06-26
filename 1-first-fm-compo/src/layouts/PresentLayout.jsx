// Imports: Link changes routes without a full page refresh, NavLink knows the active route,
// and Outlet renders the active child route.
import { Link, NavLink, Outlet } from "react-router";

const PresentLayout = ({ links }) => {
  return (
    // Shared layout shell: every route nested under `/` appears inside this background and page frame.
    <main
      className="min-h-screen w-full bg-neutral-50 text-black"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="flex min-h-screen">
        {/* Desktop sidebar: `links` comes from App so this layout only needs to render the navigation data. */}
        <aside className="sticky top-0 hidden h-screen w-[290px] shrink-0 border-r border-black/10 bg-white/80 p-5 backdrop-blur-xl lg:block">
          <NavLink to="/" className="block rounded-2xl bg-black p-5 text-white">
            <h1 className="text-xl font-bold">Motion UI</h1>
            <p className="mt-1 text-sm text-white/60">Component Library</p>
          </NavLink>

          <nav className="mt-6 flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/5 hover:text-black"
                  }`
                }
              >
                <span>{link.title}</span>

                <span className="rounded-full border border-current/20 px-2 py-0.5 text-[10px]">
                  {link.tag}
                </span>
              </NavLink>
            ))}
          </nav>

          <Link
            to="/practice"
            className="mt-6 flex items-center justify-center rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Practice Page
          </Link>
        </aside>

        {/* Mobile navigation: the same `links` data is reused, so desktop and mobile cannot drift apart. */}
        <div className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/90 p-3 backdrop-blur-xl lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-black/5 text-black/70"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}

            <Link
              to="/practice"
              className="shrink-0 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white"
            >
              Practice
            </Link>
          </div>
        </div>

        {/* Outlet: React Router inserts the matching nested page component at this exact position. */}
        <section className="min-h-screen flex-1 overflow-x-hidden pt-20 lg:pt-0">
          <div className="min-h-screen p-5 lg:p-8">
            <Outlet />

            <Link
              to="/practice"
              className="fixed bottom-6 right-6 z-50 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
            >
              Practice
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PresentLayout;
