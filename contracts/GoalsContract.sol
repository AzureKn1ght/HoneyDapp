pragma solidity ^0.5.1;

contract GoalsContract
{
    //This contract is to create functions for Savings Goals
    
    address owner;
    uint public totalGoalsCounter;
    
    //Status variable definition
    enum Status { INCOMPLETE, COMPLETE }
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
    
    
    //One account can hold many goals (many goalTokens, each token one goal)    
    mapping (address => Goal[]) public __ownedGoals;

    constructor() public
    {
        owner = msg.sender;
        totalGoalsCounter = 0;
    }
    
    //Goal adding event, basically just a console.log
    event Add(address _owner, uint _goalID, uint _amt, string _des);
    
    function getGoalsCount() public view returns (uint)
    {
        return totalGoalsCounter;
    }
    
    
    //FUNCTION TO ADD A NEW GOAL
    function addGoal(address goalOwner, uint amt, string memory des) public returns (uint)
    {
        totalGoalsCounter = totalGoalsCounter + 1;
        Goal memory myGoal = Goal(
        {
            ownerAddress: goalOwner,
            goalID: totalGoalsCounter,
            amount: amt,
            description: des,
            status: defaultStatus
        });
        
        __ownedGoals[goalOwner].push(myGoal);
        emit Add(goalOwner, totalGoalsCounter, amt, des);
        
        return totalGoalsCounter;
    }
    
    
    //GET TOTAL NO OF GOALS OWNED BY AN ACCOUNT
    function getNoOfGoals(address goalOwner) view public returns (uint)
    {
        uint quantity;
        quantity = __ownedGoals[goalOwner].length;
        return quantity;
    }
    
    
    //Destroys the smart contract. Only owner can call.
    function destroy() payable public 
    {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
 
    
    //TODO
    //complete a Goal
    //get account Goals
    

}