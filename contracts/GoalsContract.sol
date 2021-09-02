// SPDX-License-Identifier: MPL-2.0-no-copyleft-exception
pragma solidity ^0.8.7;

contract GoalsContract
{
    
    //This contract is to create functions for Savings Goals
    address owner;
    uint public totalGoalsCounter;
    
    //Status variable definition
    enum Status { INCOMPLETE, COMPLETE, DELETED }
    Status constant defaultStatus = Status.INCOMPLETE;
    
    //Goal Data Type
    struct Goal
    {
        address ownerAddress;
        uint goalID;
        uint amount;
        string description;
        Status status;
    }
    
    
    //One account can hold many goals     
    mapping (address => Goal[]) public __ownedGoals;
    constructor() 
    {
        owner = msg.sender;
        totalGoalsCounter = 0;
    }
    
    
    //EVENTS, basically just a console.log for transactions
    event Add(address _owner, uint _goalID, uint _amt, string _des);
    event Complete(address _owner, uint _goalID, string _des, Status _status);


    //GET TOTAL NO OF GOALS OWNED BY AN ACCOUNT
    function getNoOfGoals(address goalOwner) view public returns (uint)
    {
        uint quantity;
        quantity = __ownedGoals[goalOwner].length;
        return quantity;
    }
        
    
    //CREATES A NEW GOAL AND ADD TO ACCOUNT
    function addGoal(address goalOwner, uint amt, string memory des) public returns (uint)
    {
        Goal memory myGoal = Goal(
        {
            ownerAddress: goalOwner,
            goalID: totalGoalsCounter,
            amount: amt,
            description: des,
            status: defaultStatus
        });
        
        //Add goal and increment counter
        __ownedGoals[goalOwner].push(myGoal);
        totalGoalsCounter = totalGoalsCounter + 1;

        emit Add(goalOwner, totalGoalsCounter-1, amt, des);
        return totalGoalsCounter - 1; //ID of the Goal
    }
    
    
    //MARKS A PARTICULAR GOAL AS COMPLETED
    function completeGoal(address goalOwner, uint goalID) public returns (Status)
    {
        //Have to use "storage" to make the changes permanent 
        Goal storage myGoal = __ownedGoals[goalOwner][goalID];
        myGoal.status = Status.COMPLETE;
        
        emit Complete(goalOwner, goalID, myGoal.description, myGoal.status);
        return myGoal.status;
    }
    
    
    //RETURNS THE DETAILS OF A PARTICULAR GOAL
    function getGoal(address goalOwner, uint goalID) public view returns (Goal memory)
    {
        //Just retrieve the Goal, no need permanent storage 
        Goal memory myGoal = __ownedGoals[goalOwner][goalID];
        return myGoal;
    }
    
    
    //RETURNS THE DETAILS OF A PARTICULAR GOAL
    function getAllGoals(address goalOwner) public view returns (Goal[] memory)
    {
        //Just retrieve the Goal, no need permanent storage 
        Goal[] memory myGoals = __ownedGoals[goalOwner];
        return myGoals;
    }

}
