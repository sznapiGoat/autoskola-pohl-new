export const SCHEDULE_2026 = [
  { iso: "2026-03-14", date: "Sobota 14. 3. 2026", time: "07:00", seats: "15 volných míst",  available: true  },
  { iso: "2026-04-18", date: "Sobota 18. 4. 2026", time: "07:00", seats: "25 volných míst",  available: true  },
  { iso: "2026-05-23", date: "Sobota 23. 5. 2026", time: "07:00", seats: "Bude upřesněno",   available: false },
  { iso: "2026-10-03", date: "Sobota 3. 10. 2026", time: "07:00", seats: "Bude upřesněno",   available: false },
] as const;

export type ScheduleEntry = (typeof SCHEDULE_2026)[number];

/** Entries whose date (Europe/Prague, date-only) is today or later. */
export function getUpcomingSchedule(): ScheduleEntry[] {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
  }).format(new Date()); // YYYY-MM-DD
  return SCHEDULE_2026.filter((entry) => entry.iso >= today);
}
