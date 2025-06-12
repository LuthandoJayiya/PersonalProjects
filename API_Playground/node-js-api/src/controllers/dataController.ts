import { Request, Response } from "express";
import { DataRequestBody } from "../interfaces/data";

export const postData = (req: Request<{}, {}, DataRequestBody>, res: Response) => {
    const dataReceived = req.body.data;
    console.log("Data received:", dataReceived);

    //validate the data
    if(typeof dataReceived !== 'string' || dataReceived.trim() === '') {
        res.status(400).json({ message: "Invalid data format. Expected a non-empty string." });
    }else{
        // so if the data is valid, i can proceed
        // the next step is to use the spread operator to convert received data into an array
        const dataArray = [...dataReceived];
        console.log("Data as array:", dataArray);

        //then now we can sort the array, alphabetically using sort function
        dataArray.sort();

        //now i can prepare the response
        const response: {[key: string]: string[] } = {}
        response[dataReceived] = dataArray;

        res.status(200).json({ message: "Data received successfully", data: dataReceived, sortedData: response });
    }
}

//then i went to chatgpt and asked it to write the controller for me
//it simplified the code  below
// import { Request, Response } from "express";
// import { DataRequestBody } from "../interfaces/data";

// export const postData = (req: Request<{}, {}, DataRequestBody>, res: Response) => {
//     const dataReceived = req.body.data;
//     console.log("Data received:", dataReceived);

//     //validate the data
//     if(typeof dataReceived !== 'string' || dataReceived.trim() === '') {
//         res.status(400).json({ message: "Invalid data format. Expected a non-empty string." });
//     }else{
//         // so if the data is valid, i can proceed
//         // the next step is to use the spread operator to convert received data into an array
//         const dataArray = [...dataReceived];
//         console.log("Data as array:", dataArray);

//         //then now we can sort the array, alphabetically using sort function
//         dataArray.sort();

//         //now i can prepare the response
//         const response: {[key: string]: string[] } = {}
//         response[dataReceived] = dataArray;

//         res.status(200).json({ message: "Data received successfully", data: dataReceived, sortedData: response });
//     }
// }