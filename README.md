# Get In Shape (G.I.S)

A comprehensive workout planning and tracking application that helps you find exercises, create personalized workout routines, and track your fitness progress.

[Try it live!](gym-fitness-frontend-tailwind-production.up.railway.app) 

## Features

### Home Dashboard
- Personalized welcome message
- Quick access navigation to:
  - Browse Exercises
  - My Routines
  - Today's Routine
- Clean, intuitive interface with a purple-themed design
- Logo featuring a barbell and heart design

### Exercise Library
- Browse over 800 exercises
- Comprehensive filtering system:
  - Exercise Level (Beginner, Intermediate, Advanced)
  - Category (Strength, Cardio, etc.)
  - Equipment Required
  - Primary Muscles Targeted
- Exercise cards display:
  - Exercise name
  - Difficulty level indicator
  - Category tags (Strength, Body only, etc.)
  - Target muscle groups
  - Equipment needed
- Detailed exercise information includes:
  - Step-by-step instructions
  - Exercise details (Level, Category, Force type)
  - Primary and Secondary muscles worked
  - Exercise mechanics (Compound/Isolation)

### Routine Management
- Organize exercises by day of the week
- Each routine displays:
  - Exercise name
  - Number of sets
  - Number of repetitions
- Group routines by day with expandable/collapsible sections
- Quick edit routine functionality
- Clear display of exercise count per day

### Workout Logging
- Calendar interface for date selection
- Navigation between days
- Daily workout logs include:
  - Exercise name with details
  - Goal sets and reps
  - Actual sets completed
  - Reps per set
  - Notes section for tracking progress
- View exercise instructions while logging
- Logging restrictions:
  - Cannot log future workouts
  - Cannot log workouts more than one month old
  - Can edit existing workout logs

## Data Attribution

This application uses exercise data from the [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) created by Clint Plummer (yuhonas). The Free Exercise DB is an Open Public Domain Exercise Dataset containing over 800 exercises with detailed information.

Original repository: [yuhonas/free-exercise-db](https://github.com/yuhonas/free-exercise-db)

## Application Design

### Color Scheme
- Primary: Purple (#4A154B)
- Secondary: Pink/Orange heart logo
- Accent: White and light purple for UI elements
- Cards: White background with purple accents
- Buttons: Purple with white text

### Navigation
- Persistent top navigation bar
- Logo and app name in top left
- Main sections:
  - Home
  - Exercises
  - My Routines
  - Today's Routines
  - Logout

### Interface Elements
- Clean card-based design
- Expandable/collapsible sections
- Modal windows for detailed information
- Clear action buttons
- Responsive calendar interface
- Intuitive form controls

## Getting Started

1. Create an account
2. Browse the exercise library
3. Add exercises to create your routines
4. Schedule your routines by day
5. Log your completed workouts
6. Track your progress over time

## Demo
Visit https://gym-fitness-frontend-tailwind-production.up.railway.app to try out the application.

## Tags
#exercise #fitness #workout-tracking #routine-planning #fitness-app
