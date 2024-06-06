import isALetterOfAlphabetOrSpace from './stringCheckingUtilFunctions' 
import { isUpperCase, isLowerCase, isNumber } from './stringCheckingUtilFunctions' 


const validateInputFields = (name, value, setters) => {
    
    const {
        setIsNameErrorTextInvisible,
        setNameErrorText,
        setIsEmailErrorTextInvisible,
        setEmailErrorText,
        setIsPasswordErrorTextInvisible,
        setPasswordErrorText
    } = setters; 

    const trimmedValue = value.trim();

    if(name === 'name'){
        if(value === ''){
            setIsNameErrorTextInvisible(true); 
            setNameErrorText('Display Name Error Text'); 
            return; 
        }
        if(trimmedValue === ''){
            setIsNameErrorTextInvisible(false); 
            setNameErrorText('Name cannot be just filled with whitespaces'); 
            return; 
        }
        if(value[0] === ' '){
            setIsNameErrorTextInvisible(false); 
            setNameErrorText('Leading whitespaces are not allowed in name'); 
            return; 
        } 
        if(value[value.length-1] === ' '){
            setIsNameErrorTextInvisible(false); 
            setNameErrorText('Trailing whitespaces are not allowed in name'); 
            return; 
        }
        for(let i=1; i < value.length; i++){
            if(value[i] === value[i-1] && value[i] === ' '){
                setIsNameErrorTextInvisible(false); 
                setNameErrorText('You cannot have more than one space between words'); 
                return; 
            }
        }
        let isValid = true; 
        for(let i=0; i < value.length; i++){
            if(!isALetterOfAlphabetOrSpace(value[i])){
                isValid = false; 
                break; 
            }
            if(value[0] !== value[0].toUpperCase()){
                setIsNameErrorTextInvisible(false); 
                setNameErrorText('First char of each word should be capital'); 
                return; 
            }
            if(value[i] === ' ' && i+1 < value.length && value[i+1] !== value[i+1].toUpperCase()){
                setIsNameErrorTextInvisible(false); 
                setNameErrorText('First char of each word should be capital'); 
                return; 
            }
        }
        if(!isValid){
            setIsNameErrorTextInvisible(false); 
            setNameErrorText('Only alphabet letters and spaces are allowed');
            return;
        }
        if(value.length > 100){
            setIsNameErrorTextInvisible(false); 
            setNameErrorText('Name length cannot be more than 100 chars'); 
            return; 
        }
        setIsNameErrorTextInvisible(true); 
        setNameErrorText('Display Password Error Text');     
    }
    else if(name === 'email'){
        if(value === ''){
            setIsEmailErrorTextInvisible(true); 
            setEmailErrorText('Display Email Error Text'); 
            return; 
        }
        if(trimmedValue === ''){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('Email cannot be just filled with whitespaces'); 
            return; 
        }
        if(value[0] === ' '){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('Leading whitespaces are not allowed in email'); 
            return; 
        } 
        if(value[value.length-1] === ' '){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('Trailing whitespaces are not allowed in email'); 
            return; 
        }
        for(let i=0; i < value.length; i++){
            if(value[i] === ' '){
                setIsEmailErrorTextInvisible(false); 
                setEmailErrorText('You cannot have whitespaces in between your email'); 
                return; 
            }
            if(i >= 1){
                if(value[i] === value[i-1] && value[i] === '.'){
                    setIsEmailErrorTextInvisible(false); 
                    setEmailErrorText('You cannot have more than one period/dot in a row'); 
                    return; 
                }
            }
        }
        const pieces = value.split("@"); 
        if(pieces[0].length < 6){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText("G-mail username should be at least 6 chars long"); 
            return; 
        }
        if(pieces[0].length > 30){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText("G-mail username cannot have more than 30 chars"); 
            return; 
        }
        if(pieces.length === 1 && pieces[0].length === value.length){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('One @ should be their in your g-mail address'); 
            return; 
        }
        if(pieces.length === 2 && pieces[1] === ''){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('After @ the domain name cannot be empty'); 
            return; 
        }
        if(pieces.length === 2 && pieces[1] !== 'gmail.com'){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('After @ only gmail.com domain name is allowed'); 
            return; 
        }
        if(pieces.length >= 3){
            setIsEmailErrorTextInvisible(false); 
            setEmailErrorText('More than one @ is not allowed in gmail addresses'); 
            return; 
        }
        if(pieces.length === 2 && pieces[1] === 'gmail.com'){
            if(pieces[0][0] === '.'){
                setIsEmailErrorTextInvisible(false); 
                setEmailErrorText("G-mail address are not allowed to start with '.'"); 
                return; 
            }
            else if(pieces[0][pieces[0].length-1] === '.'){
                setIsEmailErrorTextInvisible(false); 
                setEmailErrorText("G-mail address usernames cannot end with '.'"); 
                return; 
            }
        }
        if(pieces.length === 2 && pieces[1] === 'gmail.com'){
            for(let i=0; i < pieces[0].length; i++){
                if(isUpperCase(pieces[0][i])){
                    setIsEmailErrorTextInvisible(false); 
                    setEmailErrorText("G-mail address don't have upper-case chars"); 
                    return; 
                }
                else if(!isLowerCase(pieces[0][i]) && !isNumber(pieces[0][i]) && pieces[0][i] !== '.'){
                    setIsEmailErrorTextInvisible(false); 
                    setEmailErrorText("Only (a-z), (0-9), and '.' are allowed in username"); 
                    return; 
                }
            }
        }
        setIsEmailErrorTextInvisible(true); 
        setEmailErrorText('Display Email Error Text'); 
        return; 
    }
    else if(name === 'password'){
        if(value === ''){
            setIsPasswordErrorTextInvisible(true); 
            setPasswordErrorText('Display Password Error Text'); 
            return; 
        }
        if(trimmedValue === ''){
            setIsPasswordErrorTextInvisible(false); 
            setPasswordErrorText('Password cannot be just filled with whitespaces'); 
            return; 
        }
        if(value[0] === ' '){
            setIsPasswordErrorTextInvisible(false); 
            setPasswordErrorText('Leading whitespaces are not allowed in password'); 
            return; 
        } 
        if(value[value.length-1] === ' '){
            setIsPasswordErrorTextInvisible(false); 
            setPasswordErrorText('Trailing whitespaces are not allowed in password'); 
            return; 
        }
        for(let i=1; i < value.length; i++){
            if(value[i] === value[i-1] && value[i] === ' '){
                setIsPasswordErrorTextInvisible(false); 
                setPasswordErrorText('You cannot have more than one space between words'); 
                return; 
            }
        }
        if(value.length < 8){
            setIsPasswordErrorTextInvisible(false); 
            setPasswordErrorText('Password length should be at least 8 characters'); 
        }
        else if(value.length > 100){
            setIsPasswordErrorTextInvisible(false); 
            setPasswordErrorText('Password length cannot be more than 100 chars'); 
            return; 
        }
        else{
            setIsPasswordErrorTextInvisible(true); 
            setPasswordErrorText('Display password error text'); 
        }
    }
} 

export default validateInputFields; 