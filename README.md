# The Lift (pure JS demo)

This project was created as a pure JS demo and it's a solution to codewars task.



### Overview

To start the script locally  run it via `node theLift.js [argument_1] [argument_2] [argument_3]` where:
 

|       | argument_2           | argument_3  | argument_3  |
|:------------- |:------------- |:-------------|:-----|
| name      | buildingHeight | liftCapacity | queues |
| type      | number      |   number | Array of arrays of numbers |

### How it works

The script will calculate the the way for the lift to transport all people to the desired floors (numbers in queues represents people and the floor they want to go to), taking into account the building height, lift capacity and some rules which lift movement is based on, which are:
- The Lift only goes up or down
- The Lift never changes direction until there are no more people wanting to get on/off in the direction it is already travelling
- The Lift has a maximum capacity of people
- Wthe Lift will stop at a floor even if it is full, although unless somebody gets off nobody else can get on!
- If the lift is empty, and no people are waiting, then it will return to the ground floor

After successful calculation the script will return the history of all visited floors.

### Example input data

`node theLift.js 5 2 [[1,2,3],[0,4,2],[5,0],[],[2,2]]`
