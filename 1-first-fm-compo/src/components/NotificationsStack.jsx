// Imports: state chooses collapsed or expanded mode; Motion animates the transition between them.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Layout constants: one source of truth for the stack's dimensions and spacing.
const N_NOTIFICATIONS = 3;
const NOTIFICATION_HEIGHT = 60;
const NOTIFICATION_WIDTH = 280;
const NOTIFICATION_GAP = 8;

// Static notification data rendered into cards below.
const notifications = [
  {
    title: "New message",
    text: "You received a message from Vishnu.",
  },
  {
    title: "Project updated",
    text: "Motion component library was updated.",
  },
  {
    title: "Reminder",
    text: "Practice one animation concept today.",
  },
];

const NotificationsStack = () => {
  // One state value controls the height of the stack and every card's position.
  const [isOpen, setIsOpen] = useState(false);

  // Expanded mode includes every card and its gap; collapsed mode leaves only a stacked preview.
  const stackHeight = isOpen
    ? N_NOTIFICATIONS * NOTIFICATION_HEIGHT +
      (N_NOTIFICATIONS - 1) * NOTIFICATION_GAP
    : NOTIFICATION_HEIGHT + 24;

  return (
    <main className="flex min-h-screen items-center justify-center rounded-3xl bg-neutral-950 p-6 text-white">
      <div className="relative">
        <Header isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <motion.div
          // `layout` smooths layout changes while `animate` controls this container's explicit height.
          layout
          className="relative"
          animate={{ height: stackHeight }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
          }}
          style={{
            width: NOTIFICATION_WIDTH,
          }}
        >
          {notifications.map((notification, index) => (
            // Each card receives its index so it can calculate its own offset and z-index.
            <Notification
              key={notification.title}
              index={index}
              isOpen={isOpen}
              title={notification.title}
              text={notification.text}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

// The header exists only when expanded, making it a small AnimatePresence example.
const Header = ({ isOpen, onClose }) => {
  // AnimatePresence keeps the header mounted briefly so its `exit` animation can play.
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-12 left-0 flex h-8 w-full items-center justify-between"
        >
          <h2 className="ml-2 text-lg font-semibold">Notifications</h2>

          <button
            onClick={onClose}
            className="mr-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black"
          >
            Collapse
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// One card calculates its visual position from shared stack state and its array index.
const Notification = ({ index, isOpen, title, text, onClick }) => {
  // In collapsed mode, later cards sit slightly higher to create the layered-stack effect.
  const closedY = (N_NOTIFICATIONS - 1 - index) * 12;

  return (
    <motion.div
      // `layout` handles any layout measurement changes while `animate` moves and fades the card.
      layout
      onClick={onClick}
      animate={{
        y: isOpen ? index * (NOTIFICATION_HEIGHT + NOTIFICATION_GAP) : closedY,

        scale: isOpen ? 1 : 1 - index * 0.06,

        opacity: isOpen ? 1 : 1 - index * 0.12,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
      }}
      className="absolute left-0 cursor-pointer select-none rounded-2xl bg-white p-4 text-black shadow-xl"
      style={{
        width: NOTIFICATION_WIDTH,
        height: NOTIFICATION_HEIGHT,

        // First card stays visually main/front.
        zIndex: N_NOTIFICATIONS - index,
      }}
    >
      <div className="flex h-full items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg">
          🔔
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold">{title}</h3>
          <p className="truncate text-xs text-black/50">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsStack;
