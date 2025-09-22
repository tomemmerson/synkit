export type TipCategory = "nutrition" | "productivity";

export type Phase = "menstrual" | "follicular" | "ovulation" | "luteal";

export interface Tip {
  id: string;
  category: TipCategory;
  phase: Phase;
  content: string;
}

export const tips: Record<
  Phase,
  { nutrition: string[]; productivity: string[] }
> = {
  menstrual: {
    nutrition: [
      "Add spinach to your smoothies for iron",
      "Try leafy greens in your salads today",
      "Red lentils are great for iron - try them in a curry",
      "Consider lean red meat for iron replenishment",
      "Shellfish like mussels are packed with nutrients",
      "Snack on pumpkin seeds for magnesium",
      "Oranges provide vitamin C to help iron absorption",
      "Ginger tea can help with cramps",
      "Chamomile tea for relaxation and comfort",
      "Beets are great roasted or in smoothies",
      "Berries are packed with antioxidants",
      "Bell peppers add vitamin C to any meal",
      "Peppermint tea can soothe digestive discomfort",
      "Turmeric has anti-inflammatory properties",
      "Warm stews are comforting and nourishing",
      "Soups are easy to digest and hydrating",
    ],
    productivity: [
      "Batch low energy tasks together today",
      "Focus on deep work when you have energy",
      "Leverage your need for alone time",
      "Use time blocking to structure your day",
      "Try the Pomodoro Method for focused work",
      "Focus on 1-3 high priority tasks only",
      "Communicate boundaries to your team",
      "Try journaling for mental clarity",
      "Respect a slower pace today",
      "Use this time for brainstorming sessions",
      "Perfect time for vision-setting",
      "Plan ahead while your mind is reflective",
      "Take time for reflecting on goals",
      "Practice meditation and mindfulness",
    ],
  },
  follicular: {
    nutrition: [
      "Add broccoli to your meals for nutrients",
      "Lettuce provides fresh energy",
      "Avocado gives healthy fats for energy",
      "Citrus fruits boost your vitamin C",
      "Pomegranate seeds add antioxidants",
      "Grapes make a great energizing snack",
      "Salmon provides omega-3s for brain health",
      "Trout is another great fish option",
      "Chicken provides lean protein",
      "Eggs are perfect for sustained energy",
      "Quinoa gives complete protein",
      "Oats provide steady energy",
      "Barley adds fiber and nutrients",
      "Sweet potatoes fuel your workouts",
      "Lentils provide plant-based protein",
      "Sesame seeds add healthy fats",
      "Tofu is great for plant-based meals",
      "Tuna provides protein and omega-3s",
    ],
    productivity: [
      "Take on high energy tasks today",
      "Perfect time for networking",
      "Do creative and strategic work",
      "Focus on big picture planning",
      "Start a new project while motivated",
      "Begin a new habit or routine",
      "Try longer work sessions",
      "Sprint through deep work",
      "Pitch your ideas with confidence",
      "Tackle challenging tasks",
      "Optimize your working environment",
      "Use this momentum to your advantage",
      "Schedule collaboration tasks",
      "Initiate strategic initiatives",
    ],
  },
  ovulation: {
    nutrition: [
      "Beef provides iron and protein",
      "Red lentils are perfect for energy",
      "Berries boost antioxidants",
      "Spinach supports your energy levels",
      "Tomatoes add lycopene and vitamins",
      "Pumpkin seeds provide magnesium",
      "Brussels sprouts support detox",
      "Olive oil provides healthy fats",
      "Raspberries are packed with fiber",
      "Avocados fuel your confident energy",
      "Fatty fish supports brain health",
      "Broccoli provides essential nutrients",
      "Kale is a powerhouse green",
      "Chickpeas offer plant protein",
      "Brazil nuts provide selenium",
    ],
    productivity: [
      "Schedule important meetings and presentations",
      "Prioritize collaboration projects",
      "Perfect time for public speaking",
      "Batch outbound and outreach tasks",
      "Work on finishing challenge projects",
      "Bring your ideas to life",
      "Don't over commit during this peak",
      "Celebrate your wins and achievements",
      "Advocate for yourself and your work",
      "Handle negotiations with confidence",
      "Make important decisions",
    ],
  },
  luteal: {
    nutrition: [
      "Dark chocolate can boost your mood",
      "Bananas provide potassium and energy",
      "Leafy greens support your system",
      "Eggs provide steady protein",
      "Legumes offer fiber and protein",
      "Whole grains provide sustained energy",
      "Yogurt supports digestive health",
      "Matcha gives calm energy",
      "Maca powder can balance hormones",
      "Rooibos tea is caffeine-free and soothing",
      "Kombucha supports gut health",
      "Brown rice provides complex carbs",
      "Cashews offer healthy fats and magnesium",
    ],
    productivity: [
      "Focus on attention to detail tasks",
      "Perfect for analytical thinking",
      "Concentrate on data analysis",
      "Handle project management tasks",
      "Focus on admin work",
      "Clear mental clutter by finishing tasks",
      "Be strategic about deadlines",
      "Break tasks into smaller steps",
      "Use checklists to stay organized",
      "Add more breaks to your day",
      "Practice breathing techniques",
      "Focus on self-care essentials",
      "Plan and prepare ahead",
      "Take time to reflect on progress",
    ],
  },
};

// Helper function to get a random tip for a specific phase and category
export const getRandomTip = (phase: Phase, category: TipCategory): string => {
  const phaseTips = tips[phase][category];
  return phaseTips[Math.floor(Math.random() * phaseTips.length)];
};

// Helper function to get daily tips (one nutrition, one productivity)
export const getDailyTips = (
  phase: Phase,
  date: Date
): { nutrition: string; productivity: string } => {
  // Use date as seed for consistent daily tips
  const dateString = date.toDateString();
  const seed = dateString
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const nutritionTips = tips[phase].nutrition;
  const productivityTips = tips[phase].productivity;

  const nutritionIndex = seed % nutritionTips.length;
  const productivityIndex = (seed + 1) % productivityTips.length;

  return {
    nutrition: nutritionTips[nutritionIndex],
    productivity: productivityTips[productivityIndex],
  };
};
