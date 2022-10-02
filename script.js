function reverseString(str) {
    var charList = str.split('');
    var reverseCharList = charList.reverse();
    var reversedString = reverseCharList.join('');
    return reversedString;
    // return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reversedString = reverseString(str);

    return str === reversedString;
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

// console.log(convertDateToStr(date));

function getAllDateFormats(date) {
    // var dateStr = convertDateToStr(date);
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
    // console.log(ddmmyy);
}

// getAllDateFormats(date);

function checkPalindromeForAllDateFormats(date) {
    var listOfDates = getAllDateFormats(date);
    var palindromeFlags = [];

    for (var index = 0; index < listOfDates.length; index++) {
        var flag = isPalindrome(listOfDates[index]);
        palindromeFlags.push(flag);
    }
    return palindromeFlags;
}

// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year) {
    if (year % 400) {
        return true;
    }
    if (year % 100) {
        return false;
    }
    if (year % 4) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}

// var date = {
//     day: 5,
//     month: 1,
//     year: 2020
// }
// console.log(getNextDate(date));

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var counter = 0;

    while (1) {
        counter++;
        var dateStr = convertDateToStr(nextDate);
        var palindromeFlags = checkPalindromeForAllDateFormats(dateStr);
        for (var index = 0; index < palindromeFlags.length; index++) {
            if (palindromeFlags[index]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

// console.log(getNextPalindromeDate(date));

const inputDateRef = document.querySelector("#bday-input");
const showBtnRef = document.querySelector("#show-btn");
const outputText = document.querySelector("#output");

showBtnRef.addEventListener('click', clickHandler);

function clickHandler() {
    var birthday = inputDateRef.value;
    if(birthday != ''){
    var birthdaySplit = birthday.split('-');
    console.log(birthdaySplit); 

    var date = {
        day: Number(birthdaySplit[2]),
        month: Number(birthdaySplit[1]),
        year: Number(birthdaySplit[0])
    }
    var birthdayStr = convertDateToStr(date);
    console.log(date);
    var flag = true;
    var palindromeFlags = checkPalindromeForAllDateFormats(birthdayStr);
    for(var index =0 ;index<palindromeFlags.length;index++){
        if(palindromeFlags[index]){
            outputText.innerText = "Yay, it is a palindrome";
            // flag = false;
            return;
        }
        
    }
    if (flag){
        var [counter,nextDate] = getNextPalindromeDate(date);
        outputText.innerText = `Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and there are ${counter} days to go`;
    }
}
else{
    outputText.innerText = "Please enter a Birthday"
}
   
}