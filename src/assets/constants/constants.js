const dashboardDataContainers = ["Total", "Pending", "Completed"];

const totalStages = [
  { stage: 0, name: "Backlog" },
  { stage: 1, name: "To Do" },
  { stage: 2, name: "Ongoing" },
  { stage: 3, name: "Done" },
];

const priorities = [
  { id: 0, name: "low" },
  { id: 1, name: "medium" },
  { id: 2, name: "high" },
];

const MENU_ITEMS = ["dashboard", "tasks"];

export { dashboardDataContainers, totalStages, priorities, MENU_ITEMS };
