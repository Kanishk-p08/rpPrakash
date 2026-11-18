async function getData() {
    const response = await fetch('data/RMSE - Sheet1.csv');
    const data = await response.text();
    // console.log(data);
    const trials = []; // x-axis values (trials)
    const RMSE_value1 = []; // y-axis values (RMSE values for moderate pollution)
    const RMSE_value2 = []; // y-axis values (RMSE values for low pollution)
    const RMSE_value3 = []; // y-axis values (RMSE values for high pollution)
// \n - new line character
    // sprint('\n') - splits the data into an array of rows, and slice(1) removes the header row
    // slice(start, end) - returns a shallow copy of a portion of an array into a new array object 
    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const trial = parseFloat(columns[0]);
        trials.push(trial);

        const RMSE = parseFloat(columns[1]);
        RMSE_value1.push(RMSE);

        const RMSE2 = parseFloat(columns[2]);
        RMSE_value2.push(RMSE2);

        const RMSE3 = parseFloat(columns[3]);
        RMSE_value3.push(RMSE3);

        console.log(trial, RMSE_value1, RMSE_value2, RMSE_value3);

    });
    return { trials, RMSE_value1, RMSE_value2, RMSE_value3 };
}

async function createChart() {
    const data = await getData();
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
    const degreeSymbol = String.fromCharCode(176); // Degree symbol for y-axis label
    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.trials,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `RMSE Value For Moderate Pollution`,     // Dataset label for legend
                    data:     data.RMSE_value1,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `RMSE Value For Low Pollution`,     // Dataset label for legend
                    data:     data.RMSE_value2,    // Reference to array of y-values
                    fill:     'false',           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `RMSE Value For High Pollution`,     // Dataset label for legend
                    data:     data.RMSE_value3,    // Reference to array of y-values
                    fill:     'false',           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgba(0, 153, 151,1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Trial',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        
                        font: {
                            size: 14
                        },
                    min: 0,                     // starting value      
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'RMSE Value',     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        font: {
                            size: 14
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'RMSE Values for Different Pollution Levels',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    label: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }       
    });
    
}


createChart();
