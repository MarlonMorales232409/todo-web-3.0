// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    // it will control the number of task and id of task
    uint256 public taskCounter = 0;

    constructor() public {
        createNewTask("This is my first task");
    }

    // Events

    event TaskDone(
        uint256 id,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskTogleUpdated(uint256 id, bool done);

    // How my task will look like
    struct Task {
        uint256 id;
        string description;
        bool done;
        uint256 createdAt;
    }

    // Mapping for task
    mapping(uint256 => Task) public task;

    // Functions ( Create tasks )

    function createNewTask(string memory _description) public {
        taskCounter++;
        task[taskCounter] = Task(
            taskCounter,
            _description,
            false,
            block.timestamp
        );

        emit TaskDone(taskCounter, _description, false, block.timestamp);
    }

    function togleDone(uint256 _id) public {
        task[_id].done = !task[_id].done;

        emit TaskTogleUpdated(_id, task[_id].done);
    }
}
