const form = document.getElementById("task-form");
const buttonConect = document.querySelector(".conect-wallet");

// Important Functions
const connectWallet = async () => {
	const conected = await App.loadAccounts();
	console.log(conected);
	if (conected) {
		buttonConect.remove();
		document.querySelector(".wallet").innerText = `${App.account.slice(
			0,
			5
		)}...${App.account.slice(35)}`;
	} else {
		alert("It look like you don't have Metamask, please install metamast");
	}
};



// Event zone
form.addEventListener("submit", (e) => {
	e.preventDefault();

	App.createNewTask(form["task"].value);

	form.reset();
});

buttonConect.addEventListener("click", () => {
	connectWallet();
});

// load DOM

document.addEventListener("DOMContentLoaded", () => {
	App.init();
	connectWallet()
});
