export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Goal = {
  id: string;
  title: string;
  completed: boolean;
};

export type RecurrenceType = 'never' | 'daily' | 'weekly' | 'monthly';

export type Item = {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  subtasks: Subtask[];
  goals: Goal[];
  reminder?: {
    date: string;
    time: string;
    location?: string;
  };
  recurrence: RecurrenceType;
  completed: boolean;
  createdAt: string;
  isPinned?: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: Item[];
};

export let categories: Category[] = [
  {
    id: '1',
    name: 'Surf Events',
    icon: '🏄',
    color: 'surf',
    items: [
      {
        id: '101',
        title: 'Ocean Beach Competition',
        description: 'Annual surf competition at Ocean Beach featuring local talent and international surfers. Join us for a day of amazing waves and community spirit.',
        categoryId: '1',
        subtasks: [
          { id: 's1', title: 'Register for competition', completed: true },
          { id: 's2', title: 'Equipment check', completed: false },
          { id: 's3', title: 'Review competition rules', completed: false },
        ],
        goals: [
          { id: 'g1', title: 'Place in top 3', completed: false },
          { id: 'g2', title: 'Score above 8.0', completed: false },
          { id: 'g3', title: 'Land new aerial maneuver', completed: false },
        ],
        reminder: {
          date: '2025-05-25',
          time: '05:30',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-20T10:00:00Z',
        isPinned: true
      },
      {
        id: '102',
        title: 'Trestles Surf Festival',
        description: 'Weekend-long surf festival featuring competitions, workshops, and beach activities. Perfect for all skill levels.',
        categoryId: '1',
        subtasks: [
          { id: 's4', title: 'Book accommodation', completed: true },
          { id: 's5', title: 'Sign up for workshops', completed: false },
          { id: 's6', title: 'Pack equipment', completed: false },
        ],
        goals: [
          { id: 'g4', title: 'Network with 5 new surfers', completed: false },
          { id: 'g5', title: 'Learn 2 new techniques', completed: false },
        ],
        reminder: {
          date: '2025-06-10',
          time: '07:00',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-21T14:30:00Z'
      },
    ],
  },
  {
    id: '2',
    name: 'Work Events',
    icon: '💼',
    color: 'work',
    items: [
      {
        id: '201',
        title: 'Tech Conference 2025',
        description: 'Annual technology conference featuring keynote speakers, workshops, and networking opportunities.',
        categoryId: '2',
        subtasks: [
          { id: 's7', title: 'Register for sessions', completed: true },
          { id: 's8', title: 'Prepare presentation', completed: true },
          { id: 's9', title: 'Schedule meetings', completed: false },
        ],
        goals: [
          { id: 'g6', title: 'Give successful presentation', completed: false },
          { id: 'g7', title: 'Make 3 new industry connections', completed: false },
          { id: 'g8', title: 'Learn about new tech trends', completed: false },
        ],
        reminder: {
          date: '2025-05-27',
          time: '14:00',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-20T11:15:00Z',
        isPinned: true
      },
    ],
  },
  {
    id: '3',
    name: 'Personal Events',
    icon: '🎉',
    color: 'personal',
    items: [
      {
        id: '301',
        title: 'Family Reunion',
        description: 'Annual family gathering with activities, food, and catching up with relatives.',
        categoryId: '3',
        subtasks: [],
        goals: [
          { id: 'g9', title: 'Reconnect with cousins', completed: false },
          { id: 'g10', title: 'Share family photos', completed: false },
        ],
        reminder: {
          date: '2025-05-26',
          time: '18:00',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-22T09:45:00Z'
      },
    ],
  },
  {
    id: '4',
    name: 'Community Events',
    icon: '🤝',
    color: 'shopping',
    items: [
      {
        id: '401',
        title: 'Local Food Festival',
        categoryId: '4',
        description: 'Community food festival featuring local vendors, live music, and family activities.',
        subtasks: [
          { id: 's10', title: 'Get early bird tickets', completed: false },
          { id: 's11', title: 'Invite friends', completed: false },
          { id: 's12', title: 'Plan schedule', completed: false },
        ],
        goals: [
          { id: 'g11', title: 'Try 5 new cuisines', completed: false },
          { id: 'g12', title: 'Support local vendors', completed: false },
        ],
        reminder: {
          date: '2025-05-28',
          time: '10:00',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-23T16:20:00Z',
        isPinned: true
      },
    ],
  },
  {
    id: '5',
    name: 'Sports Events',
    icon: '🏋️',
    color: 'health',
    items: [
      {
        id: '501',
        title: 'City Marathon',
        description: 'Annual city marathon with multiple categories and distances for all fitness levels.',
        categoryId: '5',
        subtasks: [
          { id: 's14', title: 'Complete registration', completed: false },
          { id: 's15', title: 'Get medical clearance', completed: false },
          { id: 's16', title: 'Pick up race kit', completed: false },
        ],
        goals: [
          { id: 'g13', title: 'Finish under 4 hours', completed: false },
          { id: 'g14', title: 'Maintain steady pace', completed: false },
          { id: 'g15', title: 'Stay hydrated', completed: false },
        ],
        reminder: {
          date: '2025-05-26',
          time: '17:00',
        },
        recurrence: 'never',
        completed: false,
        createdAt: '2025-05-24T08:10:00Z'
      },
    ],
  },
];

// Toggle pin status for an item
export function toggleItemPin(itemId: string) {
  categories = categories.map(category => ({
    ...category,
    items: category.items.map(item => 
      item.id === itemId 
        ? { ...item, isPinned: !item.isPinned }
        : item
    )
  }));
}

// Get all upcoming reminders sorted by date and time
export function getUpcomingReminders(): (Item & { categoryName: string; icon: string })[] {
  const reminderItems: (Item & { categoryName: string; icon: string })[] = [];
  
  categories.forEach(category => {
    category.items.forEach(item => {
      if (item.reminder && !item.completed) {
        reminderItems.push({
          ...item,
          categoryName: category.name,
          icon: category.icon,
        });
      }
    });
  });
  
  // Sort by pinned status first, then by date
  return reminderItems.sort((a, b) => {
    // Pinned items always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by date
    if (!a.reminder || !b.reminder) return 0;
    const dateA = new Date(`${a.reminder.date}T${a.reminder.time}`);
    const dateB = new Date(`${b.reminder.date}T${b.reminder.time}`);
    return dateA.getTime() - dateB.getTime();
  });
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

// Get item by ID
export function getItemById(id: string): Item | undefined {
  for (const category of categories) {
    const item = category.items.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
}

export { categories }