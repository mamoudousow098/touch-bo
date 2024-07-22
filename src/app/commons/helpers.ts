import {AppError} from "./errors/app-error";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BadRequestError} from "./errors/bad-request-error";
import {UnprocessableEntityError} from "./errors/unprocessable-entity-error";
import * as XLSX from 'xlsx';
import {ClientError} from "./errors/client-error";
import * as FileSaver from "file-saver";
import { ChartDataset } from "./interfaces/chart-dataset";
import { isNullOrUndef } from "chart.js/dist/helpers/helpers.core";



export function handleFormError(err: AppError, form: FormGroup) {
    console.log("hererererere", err, err instanceof BadRequestError)
    if (err instanceof BadRequestError) {
        console.log("here");

        let validationErrors = err.errors

        if (validationErrors.hasOwnProperty('message')) {
            form.setErrors(validationErrors)

            console.log(form.getError('message'))
        }

        Object.keys(validationErrors).forEach(prop => {
            const formControl = form.get(prop);
            if (formControl) {
                let error = validationErrors[prop as keyof typeof validationErrors]

                formControl.setErrors({
                    serverError: error
                });
            }
        });
    }

    if (err instanceof UnprocessableEntityError) {
        let validationErrors = err.errors

        if (validationErrors.hasOwnProperty('message')) {
            form.setErrors(validationErrors)

            console.log(form.getError('message'))
        }

        // Object.keys(validationErrors).forEach(prop => {
        //
        //     form.get(prop)
        //     const formControl = form.get(prop);
        //     if (formControl) {
        //         let error = validationErrors[prop as keyof typeof validationErrors]
        //
        //         formControl.setErrors({
        //             serverError: error
        //         });
        //     }
        // });
    }
}

export function navigateBack(router: Router) {
    const currentRoute = router.url;

    router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        router.navigate([currentRoute]);
    });
}

export function exportExcelFile(dataset: any[], headers: string[], exportedFileName: string) {
    console.log(Object.values(dataset[0]), headers);

    if (Object.values(dataset[0]).length != headers.length)
        throw new ClientError("Cannot export excel file. Dataset columns and headers must be same length");

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    //get the headers and sub headers

    XLSX.utils.sheet_add_aoa(worksheet, [headers], {origin: -1});
    // Iterate over the data and add the fields to the worksheet
    for (let i = 0; i < dataset.length; i++) {
        const data = dataset[i];
        const row = Object.values(data);
        XLSX.utils.sheet_add_aoa(worksheet, [row], {origin: -1});
    }
    const workbook = {Sheets: {data: worksheet}, SheetNames: ["data"]};
    const excelBuffer: any = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });
    saveAsExcelFile(excelBuffer, exportedFileName);

}

function saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
}

export function mergeGraphs(graph1: ChartDataset[], graph2: ChartDataset[]): any[]{
    console.log(graph1,graph2);
    
    if( graph1=== null || graph1 === undefined || graph2 === null || graph2 === undefined){
        return [graph1, graph2]
    }
    let xLabel= [... graph1.map(element=>element.label), ... graph2.map(element=>element.label)]

    xLabel = xLabel.sort((a, b) =>{
      // Convert the date strings to Date objects
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));

      //@ts-ignore
      return dateA - dateB;
  });
    let returnedGraph1: ChartDataset[] = []
    let returnedGraph2: ChartDataset[] = []
    console.log(xLabel);

    xLabel.forEach(element=>{
      if(graph1.some(stat=>stat.label == element)){
        returnedGraph1.push(graph1.find(stat=>stat.label == element))
      }
      else{
        returnedGraph1.push({
          label: element,
          type: null,
          codeAggregator: null,
          value: 0
        })
      }
      if(graph2.some(stat=>stat.label == element)){
        returnedGraph2.push(graph2.find(stat=>stat.label == element))
      }
      else{
        returnedGraph2.push({
          label: element,
          type: null,
          codeAggregator: null,
          value: 0
        })
      }
    })
    console.log(returnedGraph1, returnedGraph2);

    return [returnedGraph1, returnedGraph2]
}
