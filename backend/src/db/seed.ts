import 'dotenv/config';
import { db } from './';
import { projects } from './schema';

const projectsData = [
  {
    title: 'ai-taggame',
    description: 'An AI agent that learns to avoid a tagger in a 2D tag game using Proximal Policy Optimization (PPO). Features distributed training across parallel environments with neural networks.',
    technologies: ['Python', 'PPO', 'Neural Networks', 'Reinforcement Learning'],
    github: 'https://github.com/Silidrone/ai-taggame',
    demo: '',
    featured: true,
    order: 1,
  },
  {
    title: 'rl-basics-cpp',
    description: 'Foundational RL implementations built from scratch in C++ without external libraries. Includes tabular Q-learning, function approximation, and Barto-Sutton exercises. Features TD learning, Monte Carlo methods, and three test environments including TagGame with socket communication.',
    technologies: ['C++', 'Reinforcement Learning', 'Q-Learning'],
    github: 'https://github.com/Silidrone/rl-basics-cpp',
    demo: '',
    featured: true,
    order: 2,
  },
  {
    title: 'sdlchess',
    description: 'A chess game built from scratch in C++ with SDL2.0. Features interactive graphics, move notation, and a test engine that uses PGN parsing to validate against real grandmaster games.',
    technologies: ['C++', 'SDL2', 'Game Development'],
    github: 'https://github.com/Silidrone/sdlchess',
    demo: '',
    featured: true,
    order: 3,
  },
  {
    title: 'aquamaqua',
    description: 'An old project from when I was 14 years old and curious about embedded systems. Built an aquarium monitoring system for ESP8266 with a custom GUI framework from scratch, real-time sensor monitoring with graphing, Wi-Fi connectivity, and persistent EEPROM storage.',
    technologies: ['C++', 'ESP8266', 'IoT', 'Embedded Systems'],
    github: 'https://github.com/Silidrone/aquamaqua',
    demo: '',
    featured: false,
    order: 1,
  },
  {
    title: 'yasarhwse',
    description: 'Comprehensive programming assignments from Software Engineering studies at Yasar University. Academic portfolio organized by year (1st through 4th) with implementations primarily in Java, C++, Assembly, and C.',
    technologies: ['Java', 'C++', 'Assembly', 'Academic'],
    github: 'https://github.com/Silidrone/yasarhwse',
    demo: '',
    featured: false,
    order: 2,
  },
  {
    title: 'leetcodesolutions',
    description: 'Collection of a 100+ C++ solutions to leetcode challenges.',
    technologies: ['C++', 'Algorithms', 'Data Structures'],
    github: 'https://github.com/Silidrone/leetcodesolutions',
    demo: '',
    featured: false,
    order: 3,
  },
];

async function seed() {
  console.log('Seeding projects...');

  await db
    .insert(projects)
    .values(projectsData)
    .onConflictDoNothing({ target: projects.title });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
