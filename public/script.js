// document.addEventListener("DOMContentLoaded", function() {
//     fetch('/api/top-10')  // Assumes you have a Node.js backend route at this endpoint
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById("data-rows");
//             data.forEach((item, index) => {
//                 const row = document.createElement("tr");

//                 row.innerHTML = `
//                     <td>${index + 1}</td>
//                     <td>${item.name}</td>
//                     <td>${item.last}</td>
//                     <td>${item.buy} / ${item.sell}</td>
//                     <td>${item.volume}</td>
//                     <td class="${item.savings > 0 ? 'savings-positive' : 'savings-negative'}">${item.savings}</td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error("Error fetching data:", error));
// });

// document.addEventListener("DOMContentLoaded", function() {
//     fetch('/api/top-10')
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById("data-rows");

//             data.forEach((item, index) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${index + 1}</td>
//                     <td>${item.platform}</td>
//                     <td>${item.last_traded_price}</td>
//                     <td>${item.buy_price} / ${item.sell_price}</td>
//                     <td>${item.difference.toFixed(2)}%</td>
//                     <td class="${item.savings > 0 ? 'savings-positive' : 'savings-negative'}">${item.savings.toFixed(2)}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error("Error fetching data:", error));
// });

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:8000/api/top-10'; // Adjust the URL to match your backend endpoint
    const dataRows = document.getElementById('data-rows');

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/api/top-10');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log(data);  // Check the data structure here
            populateTable(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function populateTable(data) {
        const tableBody = document.getElementById("data-rows");
        tableBody.innerHTML = "";  // Clear any existing rows
    
        data.forEach((item, index) => {
            const row = document.createElement("tr");
    
            // Map the received fields to the table columns
            const platform = item.base_unit ? item.base_unit.toUpperCase() : "Unknown";  // Using base_unit as platform
            const lastTradedPrice = item.last ? parseFloat(item.last).toFixed(2) : "N/A";  // last as Last Traded Price
            const buyPrice = item.low ? parseFloat(item.low).toFixed(2) : "N/A";           // low as Buy Price
            const sellPrice = item.high ? parseFloat(item.high).toFixed(2) : "N/A";        // high as Sell Price
            
            // Calculating difference and savings if these fields are not provided
            const difference = (item.high && item.low) ? ((parseFloat(item.high) - parseFloat(item.low)) / parseFloat(item.low) * 100).toFixed(2) : "N/A";
            const savings = (item.high && item.low) ? (parseFloat(item.high) - parseFloat(item.low)).toFixed(2) : "N/A";
    
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${platform}</td>
                <td>${lastTradedPrice}</td>
                <td>${buyPrice} / ${sellPrice}</td>
                <td>${difference} %</td>
                <td>${savings}</td>
            `;
    
            tableBody.appendChild(row);
        });
    }
    
    


    // function populateTable(data) {
    //     const tableBody = document.getElementById("data-rows");
    //     tableBody.innerHTML = "";  // Clear any existing rows
    
    //     data.forEach((item, index) => {
    //         const row = document.createElement("tr");
    
    //         // Ensure that item properties exist and are valid numbers before using toFixed
    //         const lastTradedPrice = item.lastTradedPrice ? item.lastTradedPrice.toFixed(2) : "N/A";
    //         const buyPrice = item.buyPrice ? item.buyPrice.toFixed(2) : "N/A";
    //         const sellPrice = item.sellPrice ? item.sellPrice.toFixed(2) : "N/A";
    //         const difference = item.difference ? item.difference.toFixed(2) : "N/A";
    //         const savings = item.savings ? item.savings.toFixed(2) : "N/A";
    
    //         row.innerHTML = `
    //             <td>${index + 1}</td>
    //             <td>${item.platform || "Unknown"}</td>
    //             <td>${lastTradedPrice}</td>
    //             <td>${buyPrice} / ${sellPrice}</td>
    //             <td>${difference}</td>
    //             <td>${savings}</td>
    //         `;
    
    //         tableBody.appendChild(row);
    //     });
    // }
    
    // Call the fetchData function on page load
    document.addEventListener("DOMContentLoaded", fetchData);
    
    // Fetch data on page load
    fetchData();
});

