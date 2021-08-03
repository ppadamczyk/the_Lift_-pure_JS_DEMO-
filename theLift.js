const inputParameters = ['buildingHeight', 'liftCapacity', 'queues'];

const getInputParameters = () => inputParameters.reduce((allParameters, parameter, currentIndex) => ({
   ...allParameters,
   [parameter]: JSON.parse(process.argv[2 + currentIndex]),
}), {});

const getThatLiftGoing = () => {
   const { buildingHeight, liftCapacity, queues } = getInputParameters();

   const lift = {
      currentPosition: 0,
      peopleInside: [],
      visitedFloors: [0],
      currentDirection: 'up',
      goUp: () => {
         lift.currentDirection = 'up';
         lift.visitedFloors.push(++lift.currentPosition);
      },
      goDown: () => {
         lift.currentDirection = 'down';
         lift.visitedFloors.push(--lift.currentPosition);
      },
   };

   const canSomeoneEnterTheLift = (currentQueue) => currentQueue.length > 0 && lift.peopleInside.length < liftCapacity;

   const loadPassengers = (currentQueue = []) => {
      if (canSomeoneEnterTheLift(queues)) {
         currentQueue.forEach((person) => {
            if (
               (((lift.currentDirection === 'up' || lift.currentPosition === 0) && person > lift.currentPosition)
               || ((lift.currentDirection === 'down' || lift.currentPosition === buildingHeight) && person < lift.currentPosition))
               && canSomeoneEnterTheLift(queues)
            ) {
               lift.peopleInside.push(person);
               queues[lift.currentPosition].splice(queues[lift.currentPosition].indexOf(person), 1);
            }
         })
      }
   };

   const unloadPassengers = () => {
      if (lift.peopleInside.length >= 1 && lift.peopleInside.includes(lift.currentPosition)) {
         lift.peopleInside = lift.peopleInside.filter((person) => person !== lift.currentPosition);
      }
   };

   const moveTheLift = () => {
      if ((lift.currentDirection === 'up' && lift.currentPosition < buildingHeight) || lift.currentPosition === 0) {
         lift.goUp();
      } else {
         lift.goDown();
      }
   };

   const areAllPeopleAlreadyTransported = (allQueues) => allQueues.every((queue) => queue.length === 0 && !lift.peopleInside.length);

   while (!areAllPeopleAlreadyTransported(queues)) {
      unloadPassengers(queues[lift.currentPosition]);
      loadPassengers(queues[lift.currentPosition]);
      moveTheLift();

      if (areAllPeopleAlreadyTransported(queues)) {
         lift.currentPosition = 0;
      }
   }

   return lift.visitedFloors;
};

console.log('The lift has gone through floors: ' + getThatLiftGoing());
