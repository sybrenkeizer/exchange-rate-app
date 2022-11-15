const convRateTxt = document.getElementById("conversion-rate-description");
const menuA = document.getElementById("conversion-A__menu");
const menuB = document.getElementById("conversion-B__menu");
const inputA = document.getElementById('conversion-A__input');
const inputB = document.getElementById('conversion-B__input');
const swapBtn = document.getElementById("swap-btn");

const setTime = () => {
	const timeTxt = document.getElementById("time");
	const time = new Date();
	const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
	const minutes =
		time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
	timeTxt.textContent = `${hours} : ${minutes}`;
};

const convertValuta = () => {
	fetch(
		`https://v6.exchangerate-api.com/v6/856735c12ffa71825b3e87a9/latest/${menuA.value}`
	)
		.then((resp) => resp.json())
		.then((data) => {
      setLastUpdate(data.time_last_update_utc);
			populateMenuA(data.conversion_rates, menuA);
			populateMenuB(data.conversion_rates, menuB);
			const convRate = data.conversion_rates[menuB.value];
			convRateTxt.textContent = `1 ${menuA.value} = ${convRate} ${menuB.value}`;
      inputB.value = (inputA.value * convRate).toFixed(2);
		})
		.catch((err) => console.log(err));
};

const populateMenuA = (obj) => {
	for (let currency in obj) {
		if (menuA.value === currency) {
			continue;
		}
		const optionsA = document.createElement("option");
		optionsA.value = currency;
		optionsA.textContent = currency;
		menuA.appendChild(optionsA);
	}
};

const populateMenuB = (obj) => {
	for (let currency in obj) {
		if (menuB.value === currency) {
			continue;
		}
		const optionsB = document.createElement("option");
		optionsB.value = currency;
		optionsB.textContent = currency;
		menuB.appendChild(optionsB);
	}
};

const setLastUpdate = (date) => {
  const updateTxt = document.getElementById('api-update__data');
  updateTxt.textContent = date.split(' ').slice(1, 5).join(' ');
}

const swapCurrencies = () => {
	let temp = menuA.value;
	menuA.value = menuB.value;
	menuB.value = temp;
}

const rotateSwapBtn = () => {
	document.querySelector("#swap-btn i");
	arrows.classList.toggle("rotate-180deg");
};

// Event Listeners
document.addEventListener("DOMContentLoaded", (e) => {
	setTime();
	convertValuta();
});
menuA.addEventListener("change", convertValuta);
menuB.addEventListener("change", convertValuta);
inputA.addEventListener("input", convertValuta);
inputB.addEventListener("input", convertValuta);
swapBtn.addEventListener("click", (e) => {
	swapCurrencies();
	rotateSwapBtn();
	convertValuta();
})