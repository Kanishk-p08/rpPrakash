async function getData() {
    const response = await fetch('../data/RMSE.csv');
    const data = await response.text()
    console.log(data);

    const table = data.split('\n').slice(1);
    console.log(table)

    table.forEach(row => {

        const columns = row.split(',');
        const highP = columns[2];
        const lowP = columns[1];
        const modP = columns[0];
        console.log(highP, lowP, modP);
    });
}

getData()