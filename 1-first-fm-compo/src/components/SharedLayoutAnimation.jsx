// State stores the tab whose content should currently be shown.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// The full ingredient list; this demo uses the first three as tabs.
const allIngredients = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" },
];

// Destructure the three tab items without changing the original data array.
const [tomato, lettuce, cheese] = allIngredients;

const tabs = [tomato, lettuce, cheese];

const SharedLayoutAnimation = () => {
  // The selected object drives both the active tab style and content below.
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="mx-auto flex h-[360px] w-[480px] max-w-[calc(100%-40px)] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
      <nav className="h-11 rounded-t-xl border-b border-neutral-200 bg-neutral-50 px-1 pt-1">
        <ul className="flex h-full w-full list-none p-0 m-0">
          {tabs.map((item) => {
            const isActive = item === selectedTab;

            return (
              <motion.li
                key={item.label}
                // Skip an entrance animation because these tabs exist on first render.
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#eeeeee" : "rgba(238,238,238,0)",
                }}
                onClick={() => setSelectedTab(item)}
                className="relative flex flex-1 cursor-pointer select-none items-center justify-between rounded-t-md px-4 py-2 text-sm font-medium text-black"
              >
                {`${item.icon} ${item.label}`}

                {/* Matching layoutId tells Motion this underline is the same visual element in each tab. */}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-purple-500"
                  ></motion.div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <main className="flex flex-1 items-center justify-center">
        {/* AnimatePresence plays `exit` before replacing the old tab content. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[128px]"
          >
            {selectedTab.icon}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SharedLayoutAnimation;
