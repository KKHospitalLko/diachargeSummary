import { useState } from "react";

const testCategories = {
  "Haematology": [
    { name: "Haemoglobin (Hb)", unit: "gm/dL", referenceRange: "12.0 – 15.5 gm/dL (Female), 13.0 – 17.0 gm/dL (Male)" },
    { name: "Total Leukocyte Count (TLC)", unit: "/mm³", referenceRange: "4,000 – 11,000 /mm³" },
    { 
      name: "Differential Leucocyte Count (DLC)", 
      unit: "%", 
      referenceRange: "Neutrophils: 40–75%, Lymphocytes: 20–45%, Monocytes: 2–10%, Eosinophils: 1–6%, Basophils: 0–1%" 
    },
    { name: "General Blood Picture (GBP)", unit: "-", referenceRange: "Normal morphology" },
    { name: "General Blood Picture for Malaria Parasite/Microfilaria", unit: "-", referenceRange: "Negative" },
    { name: "Erythrocyte Sedimentation Rate (ESR)", unit: "mm/hr", referenceRange: "0–20 mm/hr (Female), 0–15 mm/hr (Male)" },
    { name: "Platelet Count", unit: "/mm³", referenceRange: "1.5 – 4.5 lakh /mm³" },
    { name: "Total RBC Count", unit: "× 10⁶/µL", referenceRange: "3.8 – 5.8 × 10⁶/µL" },
    { name: "Hematocrit (HCT)", unit: "%", referenceRange: "36 – 46 % (Female), 40 – 50 % (Male)" },
    { name: "Blood Grouping", unit: "-", referenceRange: "A, B, AB, O (Positive/Negative)" }
  ],
  "Renal Function Tests (RFT)": [
    { name: "Blood Urea", unit: "mg/dL", referenceRange: "10 – 40 mg/dL" },
    { name: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.6 – 1.2 mg/dL (Female), 0.7 – 1.4 mg/dL (Male)" }
  ],
  "Electrolytes & Minerals": [
    { name: "Serum Sodium", unit: "mmol/L", referenceRange: "135 – 145 mmol/L" },
    { name: "Serum Potassium", unit: "mmol/L", referenceRange: "3.5 – 5.1 mmol/L" },
    { name: "Serum Calcium", unit: "mg/dL", referenceRange: "8.5 – 10.5 mg/dL" },
    { name: "Serum Phosphorus", unit: "mg/dL", referenceRange: "2.5 – 4.5 mg/dL" },
    { name: "Serum Magnesium", unit: "mg/dL", referenceRange: "1.8 – 2.6 mg/dL" }
  ],
  "Coagulation Profile": [
    { name: "Prothrombin Time (PT)", unit: "secs", referenceRange: "11 – 13.5 secs" },
    { name: "INR", unit: "-", referenceRange: "0.8 – 1.2" },
    { name: "Activated Partial Thromboplastin Time (APTT)", unit: "secs", referenceRange: "25 – 35 secs" },
    { name: "BT/CT", unit: "min", referenceRange: "BT: 2 – 7 min, CT: 8 – 15 min" }
  ],
  "Liver Function Tests (LFT)": [
    { name: "Serum Protein", unit: "g/dL", referenceRange: "6.0 – 8.3 g/dL" },
    { name: "Serum Albumin", unit: "g/dL", referenceRange: "3.5 – 5.0 g/dL" },
    { name: "Serum Bilirubin (Total)", unit: "mg/dL", referenceRange: "0.2 – 1.2 mg/dL" },
    { name: "SGPT (ALT)", unit: "U/L", referenceRange: "7 – 45 U/L" },
    { name: "SGOT (AST)", unit: "U/L", referenceRange: "8 – 40 U/L" },
    { name: "Bili (T)", unit: "mg/dL", referenceRange: "0.2 – 1.2 mg/dL" },
    { name: "Bili TDI", unit: "mg/dL", referenceRange: "Direct: 0.1 – 0.4 mg/dL, Indirect: 0.2 – 0.8 mg/dL" }
  ],
  "Infectious Disease Markers": [
    { name: "Widal Test", unit: "-", referenceRange: "Negative" },
    { name: "Typhoid IgM (Card Test)", unit: "-", referenceRange: "Negative" },
    { name: "Typhoid IgG (Card Test)", unit: "-", referenceRange: "Negative" },
    { name: "HBsAg", unit: "-", referenceRange: "Non-reactive" },
    { name: "Hepatitis C Virus Antibody", unit: "-", referenceRange: "Non-reactive" },
    { name: "HIV Antibody Test", unit: "-", referenceRange: "Non-reactive" },
    { name: "Dengue NS1/IgM/IgG Test", unit: "-", referenceRange: "Negative" },
    { name: "C-Reactive Protein (CRP)", unit: "mg/L", referenceRange: "< 10 mg/L" },
    { name: "QF TB Gold", unit: "-", referenceRange: "Negative" }
  ],
  "Diabetes": [
    { name: "HBA1C", unit: "%", referenceRange: "4.0 – 5.6 %" }
  ],
  "Thyroid Profile": [
    { name: "Thyroid Stimulating Hormone (TSH)", unit: "µIU/mL", referenceRange: "0.4 – 4.0 µIU/mL" },
    { name: "FT3, FT4, TSH", unit: "-", referenceRange: "FT3: 2.3 – 4.2 pg/mL, FT4: 0.8 – 1.8 ng/dL, TSH: 0.4 – 4.0 µIU/mL" },
    { name: "FT4", unit: "ng/dL", referenceRange: "0.8 – 1.8 ng/dL" },
    { name: "T3T4TSH", unit: "-", referenceRange: "T3: 80 – 200 ng/dL, T4: 5.0 – 12.0 µg/dL, TSH: 0.4 – 4.0 µIU/mL" }
  ],
  "Other Investigations": [
    { name: "Procalcitonin (PCT)", unit: "ng/mL", referenceRange: "< 0.5 ng/mL" },
    { name: "Urine Examination", unit: "-", referenceRange: "Normal" },
    { name: "Reti Count", unit: "%", referenceRange: "0.5 – 2.0 %" },
    { name: "B. Sugar Random", unit: "mg/dL", referenceRange: "< 140 mg/dL" },
    { name: "Blood Sugar Fasting", unit: "mg/dL", referenceRange: "70 – 100 mg/dL" },
    { name: "Blood Sugar PP", unit: "mg/dL", referenceRange: "< 140 mg/dL" },
    { name: "AeP", unit: "U/L", referenceRange: "30 – 120 U/L" },
    { name: "Amylase", unit: "U/L", referenceRange: "30 – 110 U/L" },
    { name: "Lipase", unit: "U/L", referenceRange: "< 60 U/L" },
    { name: "Trop-T", unit: "-", referenceRange: "Negative" },
    { name: "RA Factor", unit: "IU/mL", referenceRange: "< 15 IU/mL" },
    { name: "ASO Titre", unit: "IU/mL", referenceRange: "< 200 IU/mL (Adults)" },
    { name: "C/S", unit: "-", referenceRange: "No growth" },
    { name: "AFB", unit: "-", referenceRange: "Negative" },
    { name: "Gram's", unit: "-", referenceRange: "No organisms seen" },
    { name: "Semen Exam", unit: "-", referenceRange: "Normal" },
    { name: "Lipid Profile", unit: "-", referenceRange: "Total Cholesterol: < 200 mg/dL, HDL: 40–60 mg/dL, LDL: < 100 mg/dL, Triglycerides: < 150 mg/dL" },
    { name: "Cholesterol", unit: "mg/dL", referenceRange: "< 200 mg/dL" },
    { name: "Triglyceride", unit: "mg/dL", referenceRange: "< 150 mg/dL" },
    { name: "CBC", unit: "-", referenceRange: "Varies by parameter" },
    { name: "Biopsy (Small)", unit: "-", referenceRange: "Normal" },
    { name: "BIOPSY Large", unit: "-", referenceRange: "Normal" },
    { name: "CK-NAC", unit: "U/L", referenceRange: "38 – 174 U/L" },
    { name: "CK-MB", unit: "U/L", referenceRange: "< 25 U/L" },
    { name: "ABG", unit: "-", referenceRange: "pH: 7.35–7.45, pCO2: 35–45 mmHg, pO2: 75–100 mmHg, HCO3: 22–26 mmol/L" },
    { name: "CSF R/M", unit: "-", referenceRange: "Normal" },
    { name: "Pleural Fluid R/M", unit: "-", referenceRange: "Normal" },
    { name: "Ascitic Fluid R/M", unit: "-", referenceRange: "Normal" },
    { name: "PPD", unit: "-", referenceRange: "Negative" },
    { name: "SPSA Total", unit: "ng/mL", referenceRange: "< 4.0 ng/mL" },
    { name: "AMH", unit: "ng/mL", referenceRange: "1.0 – 4.0 ng/mL (Female, reproductive age)" },
    { name: "LH", unit: "mIU/mL", referenceRange: "Follicular: 2.4–12.6, Luteal: 1.0–11.4 (Female); 1.7–8.6 (Male)" },
    { name: "FSH", unit: "mIU/mL", referenceRange: "Follicular: 3.5–12.5, Luteal: 1.7–7.7 (Female); 1.5–12.4 (Male)" },
    { name: "Prolactin", unit: "ng/mL", referenceRange: "4.8 – 23.3 ng/mL (Female, non-pregnant); 2.3 – 13.7 ng/mL (Male)" },
    { name: "B HCG", unit: "mIU/mL", referenceRange: "< 5 mIU/mL (Non-pregnant)" },
    { name: "Pregnancy Test", unit: "-", referenceRange: "Negative" },
    { name: "Testosterone Total", unit: "ng/dL", referenceRange: "300 – 1000 ng/dL (Male), 15 – 70 ng/dL (Female)" },
    { name: "Triple Test", unit: "-", referenceRange: "Varies by gestational age" },
    { name: "Torch Profile", unit: "-", referenceRange: "Negative" },
    { name: "Double Marker", unit: "-", referenceRange: "Varies by gestational age" },
    { name: "Quadruple Marker", unit: "-", referenceRange: "Varies by gestational age" },
    { name: "TB PCR", unit: "-", referenceRange: "Negative" },
    { name: "ADA", unit: "U/L", referenceRange: "< 40 U/L" },
    { name: "CA-125", unit: "U/mL", referenceRange: "< 35 U/mL" },
    { name: "Trop I", unit: "ng/mL", referenceRange: "< 0.04 ng/mL" },
    { name: "Psa Free", unit: "ng/mL", referenceRange: "< 4.0 ng/mL" },
    { name: "Testosterone Free", unit: "pg/mL", referenceRange: "5.0 – 21.0 pg/mL (Male)" },
    { name: "Ammonia", unit: "µmol/L", referenceRange: "15 – 45 µmol/L" },
    { name: "Bone Marrow", unit: "-", referenceRange: "Normal" },
    { name: "PAP Smear", unit: "-", referenceRange: "Normal" },
    { name: "CB-NAAT", unit: "-", referenceRange: "Negative" },
    { name: "LDH", unit: "U/L", referenceRange: "140 – 280 U/L" },
    { name: "Vit B12", unit: "pg/mL", referenceRange: "200 – 900 pg/mL" },
    { name: "Vit-D", unit: "ng/mL", referenceRange: "20 – 50 ng/mL" },
    { name: "Iron Profile", unit: "-", referenceRange: "Serum Iron: 60–170 µg/dL, TIBC: 240–450 µg/dL, Ferritin: 30–400 ng/mL (Male), 15–150 ng/mL (Female)" },
    { name: "Blood C/S", unit: "-", referenceRange: "No growth" },
    { name: "NT Pro BNP", unit: "pg/mL", referenceRange: "< 125 pg/mL (<75 years), < 450 pg/mL (≥75 years)" },
    { name: "D. Dimer", unit: "µg/mL", referenceRange: "< 0.5 µg/mL" },
    { name: "Folic Acid", unit: "ng/mL", referenceRange: "3.0 – 20.0 ng/mL" }
  ]
};

const allUnits = [
  "gm/dL",
  "/mm³",
  "× 10⁶/µL",
  "%",
  "mg/dL",
  "mmol/L",
  "secs",
  "-",
  "g/dL",
  "U/L",
  "ng/mL",
  "mm/hr",
  "min",
  "mg/L",
  "µIU/mL",
  "pg/mL",
  "ng/dL",
  "µg/dL",
  "mIU/mL",
  "IU/mL",
  "µmol/L",
];

// The rest of the code (BloodInvestigation component) remains unchanged
export function BloodInvestigation({ investigations, setInvestigations }) {
  const addDate = (e) => {
    e.preventDefault();
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

      <div>
        <button
          onClick={addDate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Date
        </button>
      </div>

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
                    className="right-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 mt-2 w-max"
                    title="Remove Test"
                  >
                    Remove Test
                  </button>
                </div>
              ))}

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