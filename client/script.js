App = {
	contracts: {},

	init: async () => {
		await App.loadEthereum();
		await App.loadAccounts();
		await App.loadContract();
		App.render;
	},

	loadEthereum: async () => {
		if (window.ethereum) {
			App.web3Provider = window.ethereum;
			// await window.ethereum.request({ method: "eth_requestAccounts" });
		} else if (window.web3) {
			new Web3(window.web3.currentProvider);
		} else {
			alert("Please install Metamask");
		}
	},

	loadAccounts: async () => {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		App.account = accounts[0];

		if (accounts[0]) {
			return true;
		} else {
			return false;
		}
	},

	
	loadContract: async () => {
		const res = await fetch("TodoList.json");
		const todoContractJson = await res.json();
		
		App.contracts.TodoContract = TruffleContract(todoContractJson);
		App.contracts.TodoContract.setProvider(App.web3Provider);
		
		App.todoContract = await App.contracts.TodoContract.deployed();
		
		
		const taskCounter = await App.todoContract.taskCounter();
		// Set the number of task on the DOM
		document.querySelector(".items-left").textContent = `${taskCounter} left`
		const taskCounterNumber = taskCounter.toNumber();
		let itemsHTML = "";
		for (let i = 1; i <= taskCounterNumber; i++) {
			const task = await App.todoContract.task(i);
			const taskId = task[0].toNumber();
			const taskDescription = task[1];
			const taskDone = task[2];
			const taskCreatedAt = task[3];
			
			itemsHTML += `
	        <div class="todo-item">
			<div class="check">
			<div class="check-mark ${taskDone == true ? "checked" : ""}" data-id="${taskId}" onclick="App.checkTask(${taskId})">
			<img src="./images/icon-check.svg" alt="icon-check" />
			</div>
			</div>
			<div class="todo-text ${
				taskDone == true ? "checked" : ""
			}">${taskDescription}</div>
	        </div>
			`;
		}
		
		document.querySelector(".todo-items").innerHTML = itemsHTML;
	},
	
	clearHTML: () => {
		const todoContainer = document.querySelector(".todo-items");
		while (todoContainer.firstChild) {
			todoContainer.firstChild.remove();
		}
	},

	checkTask: async (id)=> {
		await App.todoContract.togleDone(id, {from: App.account})
		console.log(id)
		// App.clearHTML()
		App.loadContract()

	},
	// Interact with the contracts

	createNewTask: async (description) => {
		const result = await App.todoContract.createNewTask(description, {
			from: App.account,
		});
		App.loadContract()
		// App.clearHTML()
	},
};
