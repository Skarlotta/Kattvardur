const isValidIsSSN = function(ssn){
    try{
        if (typeof(ssn) === 'undefined' || ssn == null){
            return false;
        }
        ssn = ssn.trim().replace("-",'').replace(" ","");
        //Basic sanity validation
        if(parseInt(ssn) != ssn){
            return false;
        }
        if (ssn.length !== 10){
            return false;
        }
        //Error digit checking
        let errorSequence = [3,2,7,6,5,4,3,2];
        let errorSum = 0;
        for(var i = 0; i < 8; i++){
            errorSum += errorSequence[i] * parseInt(ssn[i]);
        }
        errorSum = (11 - (errorSum % 11)) % 11;
        if (parseInt(ssn[8]) != errorSum){
            return false;
        }
        //Century checking. Update come the 2100's; as this software will totally still be in use in 80 years. 
        let century = parseInt(ssn[9]);
        if(century > 0 && century < 8){
            return false;
        }
        //All good to go.
        return true;
    } catch(e){
        //Something went wrong. Assume bad input, but alert console. 
        console.log("validation exception " + e);
        return false;
    }
}

export {
    isValidIsSSN
}