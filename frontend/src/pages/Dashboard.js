import React from "react";
import Card from "../components/Card";
import '../css/style7.css';


function App() {
  const cards = [
    { name: "Shyamindi", title: "Customer Management", image: "../assets/images/shamindi.jpg", link: "/UserManagement" },
    { name: "Dinithi", title: "Employee Management", image: "../assets/images/dinithi.jpg", link: "/EmployeeManagement" },
    { name: "Pasindu", title: "Vehicle Management", image: "../assets/images/pasidu.jpg", link: "/VehicleManagement" },
    { name: "Dasun", title: "Job Management", image: "../assets/images/dasun.jpeg", link: "/JobManagement" }, 
    { name: "Darshana", title: "Order Management", image: "../assets/images/darshana.png", link: "/OrderManagement" },
    { name: "Apsara", title: "Inventory Management", image: "../assets/images/apsara.jpg", link: "/InventoryManagement" },
    { name: "Dilsha", title: "Supplier Management", image: "../assets/images/dilsha.jpg", link: "/SupplierManagement" },
    { name: "Shehan", title: "Account Management", image: "../assets/images/shehan.jpg", link: "/AccountManagement" },
  ];

  return (
    <div>
      <div className="header">
        <p> Welcome to <span>ES Custom</span> Admin Dashboard</p>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card key={index} name={card.name} title={card.title} image={card.image} link={card.link} />
        ))}
      </div>
    </div>
  );
}

export default App;
