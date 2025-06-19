import { useState } from "react";

const testCategories = {
  Haematology: [
    { name: "Haemoglobin (Hb)", unit: "gm%", referenceRange: "12.0 – 15.5 gm%" },
    { name: "Total Leukocyte Count (TLC)", unit: "/mm³", referenceRange: "4,000 – 11,000 /mm³" },
    { name: "Platelet Count", unit: "/mm³", referenceRange: "1.5 – 4.5 lakh /mm³" },
    { name: "Total RBC Count", unit: "× 10⁶/µL", referenceRange: "3.8 – 5.0 × 10⁶/µL" },
    { name: "Hematocrit (HCT)", unit: "%", referenceRange: "36 – 46 %" },
  ],
  "Renal Function Tests (RFT)": [
    { name: "Blood Urea", unit: "mg/dL", referenceRange: "10 – 40 mg/dL" },
    { name: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.6 – 1.2 mg/dL" },
  ],
  "Electrolytes & Minerals": [
    { name: "Serum Sodium", unit: "mmol/L", referenceRange: "135 – 145 mmol/L" },
    { name: "Serum Potassium", unit: "mmol/L", referenceRange: "3.5 – 5.1 mmol/L" },
    { name: "Serum Calcium", unit: "mg/dL", referenceRange: "8.5 – 10.5 mg/dL" },
  ],
  "Coagulation Profile": [
    { name: "Prothrombin Time (PT)", unit: "secs", referenceRange: "11 – 13.5 secs" },
    { name: "INR", unit: "", referenceRange: "0.8 – 1.2" },
  ],
  "Liver Function Tests (LFT)": [
    { name: "Serum Protein", unit: "g/dL", referenceRange: "6.0 – 8.3 g/dL" },
    { name: "Serum Albumin", unit: "g/dL", referenceRange: "3.5 – 5.0 g/dL" },
    { name: "Serum Bilirubin (Total)", unit: "mg/dL", referenceRange: "0.2 – 1.2 mg/dL" },
    { name: "SGPT (ALT)", unit: "U/L", referenceRange: "5 – 40 U/L" },
    { name: "SGOT (AST)", unit: "U/L", referenceRange: "5 – 40 U/L" },
    { name: "Serum Alkaline Phosphatase", unit: "U/L", referenceRange: "40 – 129 U/L" },
  ],
  "Infectious Disease Markers": [
    { name: "Widal Test", unit: "-", referenceRange: "-" },
    { name: "Typhoid IgM (Card Test)", unit: "-", referenceRange: "-" },
    { name: "Typhoid IgG (Card Test)", unit: "-", referenceRange: "-" },
  ],
  "Other Investigations": [
    { name: "Procalcitonin (PCT)", unit: "ng/mL", referenceRange: "-" },
    { name: "Urine Examination", unit: "-", referenceRange: "-" },
  ],
};

const allUnits = [
  "gm%",
  "/mm³",
  "× 10⁶/µL",
  "%",
  "mg/dL",
  "mmol/L",
  "sec",
  "-",
  "g/dL",
  "U/L",
  "ng/mL",
];

export function BloodInvestigation({ investigations, setInvestigations }) {
  const addDate = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log("Before adding date:", investigations);
    const newInvestigations = [...investigations, { date: new Date().toISOString().split("T")[0], categories: [] }];
    setInvestigations(newInvestigations);
    console.log("After adding date:", newInvestigations);
  };

  const updateDate = (dateIndex, value) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].date = value;
    setInvestigations(newInvestigations);
  };

  const deleteDate = (dateIndex) => {
    const newInvestigations = investigations.filter((_, index) => index !== dateIndex);
    setInvestigations(newInvestigations);
  };

  const addCategory = (dateIndex, category) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].categories.push({ category, tests: [] });
    setInvestigations(newInvestigations);
  };

  const addTest = (dateIndex, categoryIndex, test) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].categories[categoryIndex].tests.push(test);
    setInvestigations(newInvestigations);
  };

  const updateTestValue = (dateIndex, categoryIndex, testIndex, field, value) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].categories[categoryIndex].tests[testIndex][field] = value;
    setInvestigations(newInvestigations);
  };

  const deleteCategory = (dateIndex, categoryIndex) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].categories = newInvestigations[dateIndex].categories.filter(
      (_, index) => index !== categoryIndex
    );
    if (newInvestigations[dateIndex].categories.length === 0) {
      newInvestigations.splice(dateIndex, 1);
    }
    setInvestigations(newInvestigations);
  };

  const deleteTest = (dateIndex, categoryIndex, testIndex) => {
    const newInvestigations = [...investigations];
    newInvestigations[dateIndex].categories[categoryIndex].tests = newInvestigations[
      dateIndex
    ].categories[categoryIndex].tests.filter((_, index) => index !== testIndex);
    if (newInvestigations[dateIndex].categories[categoryIndex].tests.length === 0) {
      newInvestigations[dateIndex].categories.splice(categoryIndex, 1);
    }
    if (newInvestigations[dateIndex].categories.length === 0) {
      newInvestigations.splice(dateIndex, 1);
    }
    setInvestigations(newInvestigations);
  };

  return (
    <div className="space-y-4 form-section">
      <h2
        className="h2"
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Patient Laboratory Report
      </h2>

      {/* Add Date Button */}
      <div>
        <button
          onClick={addDate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Date
        </button>
      </div>

      {/* Display Date Sections */}
      {investigations.map((dateEntry, dateIndex) => (
        <div key={dateIndex} className="border rounded-md p-4 shadow-md mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="font-medium">Date:</label>
              <input
                type="date"
                value={dateEntry.date}
                onChange={(e) => updateDate(dateIndex, e.target.value)}
                className="ml-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={() => deleteDate(dateIndex)}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
              title="Remove Date"
            >
              Remove Date
            </button>
          </div>

          {/* Add Category Dropdown */}
          <div>
            <label className="font-medium">Add Category:</label>
            <select
              onChange={(e) => {
                const selected = e.target.value;
                if (
                  selected &&
                  !dateEntry.categories.find((inv) => inv.category === selected)
                ) {
                  addCategory(dateIndex, selected);
                }
                e.target.value = "";
              }}
              className="ml-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              {Object.keys(testCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Display Category Cards */}
          {dateEntry.categories.map((inv, categoryIndex) => (
            <div key={categoryIndex} className="border rounded-md p-4 shadow-md relative mt-4">
              <h3 className="text-lg font-semibold mb-2">{inv.category}</h3>
              <button
                onClick={() => deleteCategory(dateIndex, categoryIndex)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
                title="Remove Category"
              >
                Remove Category
              </button>

              {inv.tests.map((test, testIndex) => (
                <div key={testIndex} className="grid grid-cols-12 gap-3 mb-2 relative">
                  <div className="col-span-4">
                    <label className="block text-sm font-medium">Test</label>
                    <input
                      type="text"
                      value={test.name}
                      readOnly
                      className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium">Value</label>
                    <input
                      type="text"
                      value={test.value || ""}
                      onChange={(e) =>
                        updateTestValue(dateIndex, categoryIndex, testIndex, "value", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium">Unit</label>
                    <select
                      value={test.unit}
                      onChange={(e) =>
                        updateTestValue(dateIndex, categoryIndex, testIndex, "unit", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded"
                    >
                      {allUnits.map((unit, k) => (
                        <option key={k} value={unit}>
                          {unit || "(none)"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium">Reference Range</label>
                    <input
                      type="text"
                      value={test.referenceRange}
                      readOnly
                      className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                  </div>
                  <button
                    onClick={() => deleteTest(dateIndex, categoryIndex, testIndex)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                    title="Remove Test"
                  >
                    Remove Test
                  </button>
                </div>
              ))}

              {/* Sub Test Dropdown */}
              <div className="mt-2">
                <label className="text-sm font-medium">Add Test:</label>
                <select
                  onChange={(e) => {
                    const selectedTest = testCategories[inv.category].find(
                      (t) => t.name === e.target.value
                    );
                    if (
                      selectedTest &&
                      !inv.tests.find((t) => t.name === selectedTest.name)
                    ) {
                      addTest(dateIndex, categoryIndex, { ...selectedTest, value: "" });
                    }
                    e.target.value = "";
                  }}
                  className="ml-2 p-2 border rounded"
                >
                  <option value="">Select Test</option>
                  {testCategories[inv.category].map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}