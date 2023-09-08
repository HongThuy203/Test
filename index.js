function exchange(fromCurrency, amount, toCurrency, pools) {
    const result = [];

    function findPaths(currentCurrency, currentAmount, path, rate, visited) {
        if (currentCurrency === toCurrency) {
            result.push({ path: path.join(' -> '), rate: rate });
            return;
        }

        for (const pool of pools) {
            const [currencyA, currencyB] = pool;
            if (currencyA.symbol === currentCurrency && !visited.includes(currencyB.symbol)) {
                const newAmount = currentAmount * (currencyB.amount / currencyA.amount);
                const newPath = [...path, `${currentCurrency}-${currencyB.symbol}`];
                const newRate = rate * (currencyB.amount / currencyA.amount);
                const newVisited = [...visited, currencyB.symbol];
                findPaths(currencyB.symbol, newAmount, newPath, newRate, newVisited);
            }
        }
    }

    findPaths(fromCurrency, amount, [fromCurrency], 1, []);

    return result;
}

const pools = [
    [{ symbol: 'VND', amount: 1000000 }, { symbol: 'AUD', amount: 2000000 }],
    [{ symbol: 'AUD', amount: 2000000 }, { symbol: 'AUF', amount: 3000000 }],
    [{ symbol: 'AUF', amount: 1000000 }, { symbol: 'AUG', amount: 4000000 }],
    [{ symbol: 'AUG', amount: 4000000 }, { symbol: 'AUH', amount: 2000000 }],
    [{ symbol: 'AUH', amount: 2000000 }, { symbol: 'VND', amount: 5000000 }],
    [{ symbol: 'VND', amount: 5000000 }, { symbol: 'AUJ', amount: 2000000 }],
    [{ symbol: 'AUJ', amount: 5000000 }, { symbol: 'USD', amount: 20000000 }],
    [{ symbol: 'AUH', amount: 1000000 }, { symbol: 'AUJ', amount: 6000000 }],
    [{ symbol: 'AUJ', amount: 3000000 }, { symbol: 'AUK', amount: 2000000 }],
    [{ symbol: 'AUK', amount: 1000000 }, { symbol: 'USD', amount: 20000000 }]
];

const result = exchange("VND", 1, "AUK", pools);
console.log(result);

