// Load and analyze sales data
fetch("data.csv")
  .then((response) => response.text())
  .then((csvData) => {
    const rows = csvData.split("\n").slice(1);
    const months = [];
    const sales = [];
    const categories = {};

    rows.forEach((row) => {
      const [month, category, amount] = row.split(",");
      if (!month || !category || !amount) return;

      // Monthly data
      months.push(month);
      sales.push(parseFloat(amount));

      // Category-wise data
      if (!categories[category]) categories[category] = 0;
      categories[category] += parseFloat(amount);
    });

    // Summary
    const totalSales = sales.reduce((a, b) => a + b, 0);
    const avgSales = (totalSales / sales.length).toFixed(2);
    document.getElementById("summaryData").innerHTML = `
      <p><strong>Total Sales:</strong> ₹${totalSales.toLocaleString()}</p>
      <p><strong>Average Monthly Sales:</strong> ₹${avgSales}</p>
    `;

    // Chart 1: Monthly Sales
    const ctx1 = document.getElementById("salesChart").getContext("2d");
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Sales (₹)",
            data: sales,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
    });

    // Chart 2: Category-wise Sales
    const ctx2 = document.getElementById("categoryChart").getContext("2d");
    new Chart(ctx2, {
      type: "bar",
      data: {
        labels: Object.keys(categories),
        datasets: [
          {
            label: "Category-wise Sales (₹)",
            data: Object.values(categories),
            backgroundColor: ["#28a745", "#ffc107", "#17a2b8", "#dc3545"],
          },
        ],
      },
    });
  });
