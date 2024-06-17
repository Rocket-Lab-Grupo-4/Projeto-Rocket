import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { type TDocumentDefinitions } from "pdfmake/interfaces";

// generate PDF from html to download
export default function ReportPDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const content = [
    {
      text: "Relatório de Avaliação de Desempenho",
      style: "header",
    },
  ];

  const docDefinition: TDocumentDefinitions = {
    content: [content],

    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 5, 0, 30],
      },
      subheader: {
        fontSize: 16,
        bold: true,
      },
      anotherStyle: {
        fontSize: 8,
        alignment: "left",
      },
      extra: {
        fontSize: 8,
        alignment: "left",
        margin: [0, 3, 0, 0],
      },
      aviso: {
        fontSize: 10,
        bold: true,
        alignment: "left",
        margin: [0, 0, 30, 0],
      },
      styleImage: {
        margin: [0, 0, 0, 40],
        alignment: "center",
      },
      styleImgTitle: {
        margin: [0, 0, 0, 20],
        alignment: "left",
      },
    },
  };

  // pdf name
  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.download("Report.pdf");
}
