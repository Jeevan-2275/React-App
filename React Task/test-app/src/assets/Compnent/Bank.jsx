import React, { useState, useEffect } from "react";
import "./Bank.css"; // Import the normal CSS

function Bank() {
  const [banks, setBanks] = useState([]); // Bank details
  const [search, setSearch] = useState({
    bankName: "",
    city: "",
    district: "",
    branch: "",
  });
  const [districts, setDistricts] = useState([
    "Mumbai",
    "Pune",
    "Delhi",
    "Chennai",
    "Kolkata",
  ]); // List of districts
  const [branches, setBranches] = useState([]); // List of branches
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  // Mock Bank Names
  const bankNames = ["SBI", "HDFC", "ICICI", "Axis", "Bank of Baroda"]; // Replace with API if available

  // Fetch branches automatically when bankName and city are selected
  useEffect(() => {
    const fetchBranches = async () => {
      if (!search.bankName || !search.city) {
        setBranches([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        // API for branch data (replace with actual data source if needed)
        const response = await fetch(
          `https://ifsc.razorpay.com/${search.bankName}/${search.city}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch branch data.");
        }
        const data = await response.json();
        setBranches(data || []); // Assuming the data structure
      } catch (err) {
        console.error("Error fetching branch data:", err);
        setError("No branches found for the selected bank and city.");
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [search.bankName, search.city]); // Trigger fetch when bankName or city changes

  // Fetch bank details for a specific branch
  const fetchBankData = async () => {
    if (!search.branch) {
      setError("Please select a branch.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://ifsc.razorpay.com/${search.branch}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bank data.");
      }
      const data = await response.json();
      setBanks([data]); // Storing the fetched bank in an array for display
    } catch (err) {
      console.error("Error fetching bank data:", err);
      setError("No bank details found for the selected branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Indian Bank Finder</h1>

      <div>
        {/* Select Bank */}
        <div>
          <label>Select Bank</label>
          <select
            value={search.bankName}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, bankName: e.target.value }))
            }
          >
            <option value="">Select Bank</option>
            {bankNames.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Select District */}
        <div>
          <label>Select District</label>
          <select
            value={search.district}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, district: e.target.value }))
            }
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Select City */}
        <div>
          <label>Enter City</label>
          <input
            type="text"
            placeholder="Enter City (e.g., Mumbai)"
            value={search.city}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>

        {/* Select Branch */}
        <div>
          <label>Select Branch</label>
          <select
            value={search.branch}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, branch: e.target.value }))
            }
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch.branch}>
                {branch.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Fetch Bank Data Button */}
        <button onClick={fetchBankData}>Get Bank Details</button>

        {/* Loading State */}
        {loading && <p className="loading">Loading...</p>}

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Bank Results */}
        {banks.length > 0 && (
          <div className="bank-details">
            <h2>Bank Details</h2>
            <ul className="bank-list">
              {banks.map((bank, index) => (
                <li key={index}>
                  <p>{bank.branch}</p>
                  <p>IFSC: {bank.ifsc}</p>
                  <p>Address: {bank.address}</p>
                  <p>District: {bank.district}</p>
                  <p>State: {bank.state}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bank;
