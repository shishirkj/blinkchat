
export function ErrorHandler(error:unknown){ 
    //native JavaScript error (e.g., TypeError, RangeError)
    if(error  instanceof Error)
    { 
        console.error(error.message);
        throw new Error(`Error: ${error.message}`);
    }
    else if(typeof error ==='string')
    {
        console.error(error);
    }
    else{ 
        console.error(error);
        throw new Error(`Unknown error: ${JSON.stringify(error)}`);
    }
}