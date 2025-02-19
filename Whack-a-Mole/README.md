# Whack-a-Mole

## Overview
Whack-a-Mole is an interactive web-based game where players must click on moles appearing randomly on a grid while avoiding piranha plants. The game progressively increases in difficulty as the player levels up, making it more challenging over time.

## Features
- **Dynamic Grid Gameplay**: Moles appear at random positions, and players must click them to score points.
- **Increasing Difficulty**: As the player levels up, moles appear faster and more plants are added.
- **Time-Limited Challenge**: Players must achieve the highest score possible within a given time.
- **Game Over Conditions**: Clicking on a plant or running out of time ends the game.
- **Score & Level Tracking**: The game tracks the player's score, level progression, and displays when the game is over.

## Installation & Setup

### Clone the Repository
```sh
git clone https://github.com/Afkeen2004/whack-a-mole.git
cd whack-a-mole
```

### Open the Game
Simply open `index.html` in your preferred web browser.

## How to Play
```md
1. Click on the **mole** when it appears on the grid to gain points.
2. Avoid clicking on the **piranha plants**, as it will end the game.
3. Your **score** increases by 10 points for each mole hit.
4. Levels progress automatically based on the score.
5. The game ends when time runs out or the player reaches the max score.
```

## Game Mechanics
```md
- **Initial Settings:**
  - **Time:** 60 seconds
  - **Score to Level Up:** 60, 120, 180
  - **Maximum Score:** 200
- **Difficulty Increases at Each Level:**
  - Moles appear faster.
  - More piranha plants appear.
```

## File Structure
```sh
whack-a-mole/
│── index.html     # Main HTML file
│── styles.css     # Game styling
│── script.js      # Game logic
│── mole.png       # Mole image
│── plant.png      # Piranha plant image
│── pipe.png       # pipe image
│── soil.png       # Background texture
│── mario-bg.jpg   # Game background
```

## Acknowledgments
```md
- Inspired by classic **Whack-a-Mole** arcade games.
- Uses images and assets for a Mario-themed experience.
```

Enjoy playing Whack-a-Mole! 🎮
