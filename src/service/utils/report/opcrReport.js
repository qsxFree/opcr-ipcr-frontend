import jspdf from "jspdf";
import autoTable from "jspdf-autotable";
import CNSCHeader from "../../../assets/header-pcr.png";
import moment from "moment";

export default function createOpcrPdf({
  completeName,
  positionRank,
  officeName,
  period,
  _approved_by,
  date_approved,
  record,
}) {
  var doc = new jspdf({ orientation: "landscape", unit: "mm", format: "a4" });
  var img = new Image();

  var rateDate = moment().format("MMMM DD, YYYY");
  img.src = CNSCHeader;
  doc.addImage(img, "JPEG", 11, 5, 275, 20);
  doc.setFontSize(10);
  doc.text("OFFICE PERFORMANCE COMMITMENT AND REVIEW (OPCR)", 100, 30, {
    align: "justify",
  });

  doc.text("I,", 35, 40, { align: "justify" });
  // Complete Name
  doc.text(completeName + "   ,", 45, 40, { align: "justify" });
  doc.text("___________________________", 41, 41, { align: "justify" });
  doc.text("( Complete Name )", 48, 45, { align: "justify" });
  // Position Rank
  doc.text(positionRank, 99, 40, { align: "justify" });
  doc.text("___________________________", 99, 41, { align: "justify" });
  doc.text("( Position Rank )", 109, 45, { align: "justify" });
  doc.text("Head of the", 153, 40, { align: "justify" });
  // Name of office
  doc.text(officeName, 173, 40, { align: "justify" });
  doc.text("___________________________", 173, 41, { align: "justify" });
  doc.text("( Name of Office )", 187, 45, { align: "justify" });
  //
  doc.text("commit to deliver and agree", 230, 40, { align: "justify" });
  // second line
  doc.text(
    "to be rated on the following targets in the accordance with the indicated measures for the period " +
      period,
    10,
    52,
    { align: "justify" }
  );
  //   // First Period
  //   doc.text(firstPeriod, 180, 52, { align: "justify" });
  //   doc.text("__________", 173, 53, { align: "justify" });
  //   doc.text("to", 198, 52, { align: "justify" });
  //   // Second Period
  //   doc.text(secondPeriod, 205, 52, { align: "justify" });
  //   doc.text("__________", 203, 53, { align: "justify" });
  //   doc.text("20", 225, 52, { align: "justify" });
  //   // Current year
  //   doc.text(currYear, 235, 52, { align: "justify" });
  //   doc.text("___", 233, 53, { align: "justify" });
  // Ratee
  doc.text("Ratee:", 235, 65, { align: "justify" });
  doc.text(completeName, 250, 65, { align: "justify" });
  doc.text("____________________", 250, 65, { align: "justify" });
  // Date Rated
  doc.text("Date:", 235, 70, { align: "justify" });
  doc.text(rateDate, 250, 70, { align: "justify" });
  doc.text("____________________", 250, 70, { align: "justify" });
  // Reviewed By, Approved By, Date Table
  autoTable(doc, {
    styles: {
      fillColor: [221, 221, 221],
      textColor: [0, 0, 0],
      cellWidth: "auto",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    margin: { top: 80, left: 5, right: 5, bottom: 0 },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    tableWidth: 287,
    columnStyles: {
      0: { fillColor: [255, 255, 255] },
      1: { fillColor: [255, 255, 255] },
      2: { fillColor: [255, 255, 255] },
      3: { fillColor: [255, 255, 255] },
    },
    columns: [
      {
        title: "Reviewed By:",
        footer: _approved_by._role.role,
        key: "reviewed_by",
      },
      { title: "Date:", dataKey: "date1" },
      {
        title: "Approved By:",
        footer: `${_approved_by._role._office.code} - ${_approved_by._role._office.name}`,
        key: "approved_by",
      },
      { title: "Date:", dataKey: "date2" },
    ],
    body: [
      {
        reviewed_by: `${_approved_by.first_name} ${_approved_by.last_name}`,
        date1: moment(date_approved).format("DD MMMM YYYY"),
        approved_by: `${_approved_by.first_name} ${_approved_by.last_name}`,
        date2: moment(date_approved).format("DD MMMM YYYY"),
      },
    ],
  });

  const strategicPriority = record.filter((item) => item.type === 1);
  const coreFunctionality = record.filter((item) => item.type === 2);
  const supportingFunctionality = record.filter((item) => item.type === 3);

  // MFO/PAP, SI, Budget, Accountable, Ratings, Remarks Table
  autoTable(doc, {
    styles: {
      fillColor: [221, 221, 221],
      textColor: [0, 0, 0],
      cellWidth: "auto",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      halign: "center",
    },
    margin: { top: 0, left: 5, right: 5 },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    tableWidth: 287,
    showHead: "firstPage",

    columnStyles: {
      0: {
        fillColor: [255, 255, 255],
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },
      1: { fillColor: [255, 255, 255], cellWidth: 50 },
      2: { fillColor: [255, 255, 255] },
      3: { fillColor: [255, 255, 255] },
      4: { fillColor: [255, 255, 255] },
      5: { fillColor: [255, 255, 255], cellWidth: 50 },
      6: { fillColor: [255, 255, 255] },
    },

    // Adding of Columns For OPCR Printing
    columns: [
      { title: "MFO/PAP", key: "_mfo" },
      { title: "Success Indicator", key: "_success_indicator" },
      { title: "Allotted Budget", key: "_budget" },
      {
        title: "UnitSection/Individual Accountable",
        key: "_UnitSection",
      },
      { title: "Actual Accomplishment", key: "_accomplishment" },
      {
        title: "RATING\n|   Q1   |   E2   |   T3   |   A4   |",
        key: "_rating",
      },
      { title: "REMARKS", key: "_remarks" },
    ],

    body: [
      {
        _mfo: "Strategic Priority",
        _success_indicator: "",
        _budget: "",
        _UnitSection: "",
        _accomplishment: "",
        _rating: "",
        _remarks: "",
      },
      //For Strategic Priority
      ...strategicPriority.map((item) => {
        return {
          _mfo: item._mfo.name,
          _success_indicator: item.success_indicator,
          _budget: item.budget,
          _UnitSection: item._accountable
            .map(
              (person) =>
                person.first_name +
                " " +
                person.last_name +
                ", " +
                person._role.role
            )
            .join(", "),
          _accomplishment: "",
          _rating: "",
          _remarks: "",
        };
      }),
      {
        _mfo: "Core Functions",
        _success_indicator: "",
        _budget: "",
        _UnitSection: "",
        _accomplishment: "",
        _rating: "",
        _remarks: "",
      },
      ...coreFunctionality.map((item) => {
        return {
          _mfo: item._mfo.name,
          _success_indicator: item.success_indicator,
          _budget: item.budget,
          _UnitSection: item._accountable
            .map(
              (person) =>
                person.first_name +
                " " +
                person.last_name +
                ", " +
                person._role.role
            )
            .join(", "),
          _accomplishment: "",
          _rating: "",
          _remarks: "",
        };
      }),

      {
        _mfo: "Support Function",
        _success_indicator: "",
        _budget: "",
        _UnitSection: "",
        _accomplishment: "",
        _rating: "",
        _remarks: "",
      },

      ...supportingFunctionality.map((item) => {
        return {
          _mfo: item._mfo.name,
          _success_indicator: item.success_indicator,
          _budget: item.budget,
          _UnitSection: item._accountable
            .map(
              (person) =>
                person.first_name +
                " " +
                person.last_name +
                ", " +
                person._role.role
            )
            .join(", "),
          _accomplishment: "",
          _rating: "",
          _remarks: "",
        };
      }),
    ],
    didDrawCell: function (data) {
      if (data.column.dataKey === "_rating" && data.section === "body") {
        autoTable(doc, {
          startY: data.cell.y,
          margin: { left: data.cell.x, bottom: 0, right: 0, top: 0 },
          styles: {
            fillColor: [221, 221, 221],
            textColor: [0, 0, 0],
            cellWidth: "auto",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            halign: "center",
          },
          columnStyles: {
            0: {
              fillColor: [255, 255, 255],
            },
            1: {
              fillColor: [255, 255, 255],
            },
            2: { fillColor: [255, 255, 255] },
            3: { fillColor: [255, 255, 255] },
          },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
          tableWidth: 50,
          body: [[" ", " ", " ", " "]],
        });
      }
    },
  });

  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 2,
    margin: { top: 0, left: 4, right: 4 },
    columnStyles: {
      0: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    },
    body: [[{ content: "Average Rating", styles: { halign: "left" } }]],
  });
  // Average Rating Table
  autoTable(doc, {
    startY: doc.autoTable.previous.finalY,
    styles: {
      fillColor: [221, 221, 221],
      textColor: [0, 0, 0],
      cellWidth: "auto",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      halign: "center",
    },
    margin: { top: 10, left: 5, right: 5 },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    tableWidth: 287,
    showHead: "firstPage",
    columnStyles: {
      0: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        cellWidth: 125,
      },
      1: {
        fillColor: [255, 255, 255],
      },
      2: { fillColor: [255, 255, 255] },
    },
    head: [["CATEGORY", "MFO¹", "RATING"]],
    body: [
      ["Strategic Priority"],
      ["Core Functions²"],
      ["Support Functions"],
      ["Total Overall Rating"],
      ["Final average Rating"],
      ["Adjectival Rating"],
    ],
    didDrawCell: function (data) {
      if (data.column.index === 1 && data.section === "body") {
        // MFO¹ Table End
        autoTable(doc, {
          startY: data.cell.y,
          styles: {
            fillColor: [221, 221, 221],
            textColor: [0, 0, 0],
            cellWidth: "auto",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            halign: "center",
          },
          columnStyles: {
            0: {
              fillColor: [255, 255, 255],
            },
            1: {
              fillColor: [255, 255, 255],
            },
            2: { fillColor: [255, 255, 255] },
          },
          margin: { top: 0, left: 129.8, right: 5 },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
          tableWidth: 72,
          body: [["", ""]],
        });
      }
      if (data.column.index === 2 && data.section === "body") {
        // Ratings Table End
        autoTable(doc, {
          startY: data.cell.y,
          styles: {
            fillColor: [221, 221, 221],
            textColor: [0, 0, 0],
            cellWidth: "auto",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            halign: "center",
          },
          columnStyles: {
            0: {
              fillColor: [255, 255, 255],
              cellWidth: 40,
            },
            1: {
              fillColor: [255, 255, 255],
              cellWidth: 12,
            },
            2: { fillColor: [255, 255, 255], cellWidth: 12 },
            3: {
              fillColor: [255, 255, 255],
              cellWidth: 12,
            },
            4: { fillColor: [255, 255, 255] },
            cellWidth: 12,
          },
          margin: { top: 0, left: 202, right: 0 },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
          tableWidth: 90,
          body: [["", "", "", "", ""]],
        });
      }
    },
  });

  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 20,
    styles: {
      fillColor: [221, 221, 221],
      textColor: [0, 0, 0],
      cellWidth: "auto",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    margin: { top: 10, left: 5, right: 5, bottom: 0 },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    tableWidth: 287,
    columnStyles: {
      0: {
        fillColor: [255, 255, 255],
        cellPadding: [20, 0, 0, 0],
        halign: "center",
        valign: "bottom",
      },
      1: { fillColor: [255, 255, 255], valign: "bottom", halign: "center" },
      2: {
        fillColor: [255, 255, 255],
        valign: "bottom",
        cellWidth: 30,
        halign: "center",
        valign: "bottom",
      },
      3: { fillColor: [255, 255, 255], valign: "bottom", halign: "center" },
      4: {
        fillColor: [255, 255, 255],
        valign: "bottom",
        halign: "center",
        valign: "bottom",
      },
      5: { fillColor: [255, 255, 255], valign: "bottom", halign: "center" },
    },
    columns: [
      {
        title: "Assessed By:",
        footer: "Planning Office",
        key: "assessed_by",
      },
      { title: "Date:", key: "date3" },
      { footer: "PMT", key: "_pmt" },
      { title: "Date:", key: "date4" },
      {
        title: "Final Rating By:",
        footer: "OIC - Office Of The College President",
        key: "fin_rating_by",
      },
      { title: "Date:", key: "date5" },
    ],
    body: [
      {
        assessed_by: "ENGR. ROGER JAY L. DE VELA, Ph.D.",
        date3: "",
        _pmt: "",
        date4: "",
        fin_rating_by: "DIR. FREDDIE T. BERNAL, CESO III",
        date5: "",
      },
    ],
  });

  autoTable(doc, {
    startY: doc.autoTable.previous.finalY,
    styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
    tableWidth: 287,
    margin: { top: 0, left: 5, right: 5 },
    columnStyles: {
      0: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    },
    body: [
      [
        {
          content:
            "Legend:   1 - Quantity   2 - Effeciency   3 - Timeliness   4 - Average",
          styles: { halign: "left" },
        },
      ],
      [
        {
          content:
            "Rating Scale:   5 - Outstanding   4 - Very Satisfactory   3 - Satisfactory   2 - Unsatisfactory   1- Poor",
          styles: { halign: "left" },
        },
      ],
    ],
  });

  doc.save(
    `OPCR - ${moment().format("MMMM Do YYYY, h:mm:ss a")} - ${officeName}.pdf`
  );
}
