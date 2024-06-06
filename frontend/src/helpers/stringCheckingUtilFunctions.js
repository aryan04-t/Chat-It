const isASpecialCharacterExceptSpace = (ch) => {
    const allowedChars = /^[a-zA-Z0-9 ]$/;         
    return !allowedChars.test(ch); 
}

export const isNumber = (ch) => {
    return !isNaN(ch); 
}

const isALetterOfAlphabetOrSpace = (ch) => {
    if(isASpecialCharacterExceptSpace(ch)) return false; 
    else if(ch === ' ') return true; 
    else if(isNumber(ch)){
        return false;
    }
    else{
        return true; 
    }
} 

export const isUpperCase = (s) => {
    return (s === s.toUpperCase()) && (s !== s.toLowerCase()); 
}

export const isLowerCase = (s) => {
    return (s === s.toLowerCase()) && (s !== s.toUpperCase()); 
}


export default isALetterOfAlphabetOrSpace; 