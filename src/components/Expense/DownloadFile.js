import React from "react";
import { useSelector } from "react-redux";

function DownloadFile() {
  const data = useSelector((state) => state.expense.expenseData);
  const download = () => {
    function makeCSV(rows) {
      let arr = [];
      rows.forEach((element) => {
        //   element.push(['Category', 'description', 'Amount'])

        const { id, ...idTrimmed } = element;
        arr.push(Object.values(idTrimmed));
      });

      return arr.map((r) => r.join(",")).join("\n");
    }
    let blob = new Blob([makeCSV(data)]);
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "myExpense.csv";
    a.href = file;
    a.click();
  };
  return (
    <button
      onClick={download}
      className="fixed border p-2 mt-2 mr-2  w-34 bg-red-600 text-white rounded-lg"
    >
      Downlaod in excel
    </button>
  );
}

export default DownloadFile;
