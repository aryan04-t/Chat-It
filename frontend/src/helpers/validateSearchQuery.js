const validateSearchQuery = (value, setters) => {

    const {
        setIsSearchBarErrorTextInvisible,
        setSearchBarErrorText
    } = setters; 

    const trimmedValue = value.trim();
    
    if(value === ''){
        setIsSearchBarErrorTextInvisible(true); 
        setSearchBarErrorText('Display Search Bar Error Text'); 
        return true; 
    }
    if(trimmedValue === ''){
        setIsSearchBarErrorTextInvisible(false); 
        setSearchBarErrorText('Search query cannot be just filled with whitespaces'); 
        return false;
    }
    if(value[0] === ' '){
        setIsSearchBarErrorTextInvisible(false); 
        setSearchBarErrorText('There is no sense in searching with leading whitespaces'); 
        return false; 
    } 
    if(value[value.length-1] === ' '){
        setIsSearchBarErrorTextInvisible(false); 
        setSearchBarErrorText('There is no sense in searching with Trailing whitespaces'); 
        return false; 
    }
    for(let i=1; i < value.length; i++){
        if(value[i] === value[i-1] && value[i] === ' '){
            setIsSearchBarErrorTextInvisible(false); 
            setSearchBarErrorText('You cannot have more than one space between words'); 
            return false;
        }
    }
    let isValid = true; 
    for(let i=0; i < value.length; i++){
        if(!isAValidSearchQueryChar(value[i])){
            isValid = false; 
            break; 
        }
    }
    if(!isValid){
        setIsSearchBarErrorTextInvisible(false); 
        setSearchBarErrorText("Only a-z, A-Z, 0-9, '@', '.', and space character are allowed to be typed in search query"); 
        return false; 
    }
    if(value.length > 100){
        setIsSearchBarErrorTextInvisible(false); 
        setSearchBarErrorText('Search query length cannot be more than 100 chars'); 
        return false; 
    }
    setIsSearchBarErrorTextInvisible(true); 
    setSearchBarErrorText('Display Search Bar Error Text'); 
    return true;
}


const isASpecialCharacterExceptSpaceAndAtTheRateAndDot = (ch) => {
    const allowedChars = /^[a-zA-Z0-9 @.]$/;         
    return !allowedChars.test(ch); 
}


const isAValidSearchQueryChar = (s) => {
    if(isASpecialCharacterExceptSpaceAndAtTheRateAndDot(s)){
        return false;
    }
    else{
        return true; 
    }
}


export default validateSearchQuery; 