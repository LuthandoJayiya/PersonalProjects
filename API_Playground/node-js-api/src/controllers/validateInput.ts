import { validation } from "../interfaces/validation";
import { Request, Response } from "express";

//helper function to validate URL
function isValidUrl(url: string): boolean {
    try {
        new URL(url); 
        return true;
    } catch (e) {
        return false;
    }
}

export const validateInput = (req: Request<{}, {}, validation>, res: Response) => {
    const { email, url } = req.body;

    console.log('Received data for validation:', { email, url });

    const errors: string[] = [];


    //used the internert to find a regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid or missing email address.');
    }

    //we can use a simple regex for URL validation
    // const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/;
    // if (!url || url.trim() === '') {
    //     errors.push('Invalid or missing URL.');
    // }

    //or we can use a helper function to validate the URL or a regex
    if (!url || !isValidUrl(url)) {
        errors.push('Invalid or missing URL.');
    }

    if (errors.length > 0) {
        res.status(400).json({
            message: 'Validation failed.',
            errors: errors
        });
    } else {
        res.status(200).json({
            message: 'Validation successful!',
            receivedEmail: email,
            receivedUrl: url,
            isValid: true
        });
    }
}