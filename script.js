const apiKey = "8f6ae896e8efee1a910d9fc1"; // Replace with your API key from ExchangeRate-API
const apiUrl = `https://v6.exchangerate-api.com/v6/8f6ae896e8efee1a910d9fc1/latest/USD`;


async function getCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromSelect.appendChild(option1);
            toSelect.appendChild(option2);
        });

        fromSelect.value = "USD";
        toSelect.value = "INR";
    } catch (error) {
        console.error("Error fetching currency data:", error);
        alert("Failed to load currencies.");
    }
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
        const data = await response.json();

        if (data.conversion_rate) {
            const result = (amount * data.conversion_rate).toFixed(2);
            document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        } else {
            alert("Conversion failed. Try again.");
        }
    } catch (error) {
        console.error("Error converting currency:", error);
        alert("Failed to fetch conversion rate.");
    }
}

// Load available currencies on page load
getCurrencies();
