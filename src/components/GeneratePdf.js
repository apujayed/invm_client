// import DataTable from 'react-data-table-component';
// import { ButtonGroup, Button,Spinner } from "react-bootstrap";
// import Pdf from "react-to-pdf";
// import React, { useState, useEffect, useRef, useContext } from "react";
import autoTable from "jspdf-autotable";
import { font } from "./font";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePdf = (props,thead) => {
  // e.preventDefault();
console.log(props);
  let doc = new jsPDF("l", "mm", [200, 300]);

  doc.setFontSize(10);
  doc.autoTable({ html: "#my-table" });
  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const cen = pageWidth / 2;
  const Line = pageWidth - 15;
  doc.addFileToVFS("WorkSans-normal.ttf", font);
  doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
  // doc.addImage(
  //   "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
  //   "PNG",
  //   10,
  //   7,
  //   25,
  //   15
  // );
  // // autoTable(doc, {
  //   body: [
  //     [
  //       {
  //         content: 'Company brand',
  //         styles: {
  //           halign: 'left',
  //           fontSize: 20,
  //           textColor: '#ffffff'
  //         }
  //       },
  //       {
  //         content: 'Invoice',
  //         styles: {
  //           halign: 'right',
  //           fontSize: 20,
  //           textColor: '#ffffff'
  //         }
  //       }
  //     ],
  //   ],
  //   theme: 'plain',
  //   styles: {
  //     fillColor: '#3366ff'
  //   }
  // });

  autoTable(doc, {
    startY: 3,
    body: [
      [
        {
          content: "Company Name",
          styles: {
            halign: "center",
            fontSize: 16,
            fontStyle: "bold",
            font: "WorkSans",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    // styles: { fillColor: [255, 0, 0] },
    // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } },
    startY: 10,
    body: [
      [
        {
          content:
            "Reference: #INV0001" +
            "\nDate: 2022-01-27" +
            "\nInvoice number: 123456" +
            "\n(Account Statement)",
          styles: {
            halign: "center",
            fontSize: 10,
            font: "WorkSans",
          },
        },
      ],
    ],
    theme: "plain",
  });

  // doc.setLineWidth(1.5);
  doc.setDrawColor(0, 0, 0);
  doc.line(15, 30, Line, 30);
  doc.setLineWidth(1.5);

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Billed to: jayed apu" +
            "\ncontract - 01796194791" +
            "\nBilling Address line 1" +
            "\nDate : 2022-07-78",
          styles: {
            halign: "left",
            font: "WorkSans",
          },
        },

       
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    startY: 42,
    body: [
      [
        {
          content: "Amount due: 5000.00",
          styles: {
            font: "WorkSans",
            halign: "right",
            fontSize: 12,
          },
        },
      ],
    ],
    theme: "plain",
  });



  // var total1 = props.reduce((sum, el) => sum + el.amount, 0);
  // let number = 1234567890;
  // let nf = new Intl.NumberFormat("en-US");
  // var total = nf.format(total1); // "1,234,567,890"


  doc.autoTable({
    head: [thead],
    body: props,
    theme: "grid",
    headStyles: {
      fillColor: [139, 0, 0],
    },
    styles: { font: "WorkSans" },
    columnStyles: {
      1: { halign: "right", textColor: [178, 0, 0], fontStyle: "bold" },
      4: { halign: "right" },
      5: { halign: "right" },
      6: { halign: "right" },
      7: { halign: "right" },
    },
    bodyStyles: { lineColor: [0, 0, 0] },
    tableWidth: "auto",
    columnWidth: "wrap",
    showHeader: "everyPage",
    tableLineColor: 200,
    tableLineWidth: 0,
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Terms & notes",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content:
            "orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia" +
            "molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum" +
            "numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium",
          styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "This is a centered footer",
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const header = "Report 2014";
    const footer = `Page ${i} of ${pageCount}`;

    // Header
    // doc.text(header, 30, 15, { baseline: 'top' });

    // Footer

    doc.setFont("courier");

    doc.text(
      footer,
      pageWidth / 2 - doc.getTextWidth(footer) / 2,
      pageHeight - 10,
      { baseline: "bottom" }
    );
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    doc.text("" + dateTime, pageWidth - doc.getTextWidth(dateTime) - 20, 5);
  }
  doc.setProperties({
    title: "Ledger",
  });
  // doc.setFont('courier');
  doc.output("dataurlnewwindow");
};

export default GeneratePdf;