const { assert } = require("chai");

const TodoList = artifacts.require("TodoList");

contract("Deploy contract", () => {
	before(async () => {
		this.todoList = await TodoList.deployed();
	});

	it("Check if Deploy Contract is succesfully", () => {
		const address = this.todoList.address;
		assert.notEqual(address, null);
		assert.notEqual(address, "");
		assert.notEqual(address, 0x0);
		assert.notEqual(address, undefined);
	});

	it("Check if exist a task", async () => {
		const counter = await this.todoList.taskCounter();
		const task = await this.todoList.task(counter);
		const newTask = await this.todoList.createNewTask("test", "test body");

		assert.equal(task.id.toNumber(), counter);
		assert.typeOf(task.title, "string");
		assert.typeOf(task.description, "string");

		assert.typeOf(newTask.logs[0].args.title, "string");
		assert.typeOf(newTask.logs[0].args.description, "string");
	});

	it("Check toggle done", async () => {
		const togle = await this.todoList.togleDone(0);

		assert.typeOf(togle.logs[0].args.done, "boolean");
	});
});
