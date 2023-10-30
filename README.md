# gandara_game
This is a project for a simple 2D game with the aim of exploring the different possibilities with js and html canvas and programming logic.

The game is a 2D platformer where the main character can move left and right, jump and interact with the environment. It also handles camera movement as the player moves through the game world.

    Canvas Setup: In index.js, you set up the game canvas and its dimensions, as well as a scaled version of the canvas.

    Collision Blocks: You create collision blocks for the floor and platforms by iterating through arrays like floorCollisions and platformCollisions and instantiating CollisionBlock objects for appropriate positions.

    Player Character: The player character is initialized with properties such as starting position, collision information, sprite images, and animations.

    Input Handling: Event listeners are used to handle keyboard input for moving the player character.

    Background and Camera: There is a background image, and a camera object is used to control the view within the game world.

    Game Loop: The animate function is used as the game loop, which continuously updates the game's state and renders the game elements on the canvas.

    Collision Detection: In the utils.js file, there are functions for basic collision detection and platform-specific collision detection.

    Collision Data: The collisions.js file contains data arrays (floorCollisions and platformCollisions) that define the layout of collision blocks in the game world.


