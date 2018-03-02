/**
 *   @author Delaney, Tayler (delaneyt@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Mid-term
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let cardNumbers = [666666, 777777],
    pinNumbers = [4321, 1234],
    checkingBalance = [1000.00, 1000.00],
    savingsBalance = [1000.00, 1000.00];

let cardNames = ["Jonas", "Brock"];
let currentLocation, currentCard, currentPin, continueResponse, taskChosen, loggingIn = 0, loggedIn = 0;
let currentName;

/**
 * @method
 * @desc Main dispatch method
 * @returns {null}
 */
function main() {
    setContinueResponse();
    authRoutine();
    while(loggedIn === 1 && continueResponse === 1) {
        process.stdout.write(`\x1Bc`);
        chooseTask();
        if (continueResponse !== 0) {
            setContinueResponse();
        }
    }
}

main();

/**
 * @method
 * @desc continueResponse mutator written by Howard Bates
 * @returns {null}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc chooseTask dispatch method
 * @returns {null}
 */
function chooseTask() {
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 to check your balance.`);
    console.log(`Enter 2 to withdraw funds.`);
    console.log(`Enter 3 to deposit funds.`);
    console.log(`Enter 4 to transfer funds.`)
    taskChosen = Number(PROMPT.question(`What would you like to do? `));
    if (taskChosen === 0) {
        console.log(`Exiting...`);
        continueResponse = 0;
    } else if (taskChosen === 1) {
        process.stdout.write(`\x1Bc`);
        checkBalance();
    } else if (taskChosen === 2) {
        process.stdout.write(`\x1Bc`);
        withdrawFunds();
    } else if (taskChosen === 3) {
        process.stdout.write(`\x1Bc`);
        depositFunds();
    } else if (taskChosen === 4) {
        process.stdout.write(`\x1Bc`);
        transferFunds();
    } else {
        console.log(`Invalid option, try again.`);
        process.stdout.write(`\x1Bc`);
        return chooseTask();
    }
}

/**
 * @method
 * @desc checkBalance utility method, simply prints to screen values user wants.
 * @returns {null}
 */
function checkBalance() {
    let checkSave;
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 for checking balance.`);
    console.log(`Enter 2 for savings balance.`);
    checkSave = Number(PROMPT.question(`Enter(1 or 2): `));
    if (checkSave ==0) {
        console.log(`Exiting...`);
        continueResponse = 0;
    }
    if (checkSave == 1) {
        process.stdout.write(`\x1Bc`);
        console.log(`${cardNames[currentLocation]}, your checking balance is \$${checkingBalance[currentLocation]}.`);
    } else if (checkSave == 2) {
        process.stdout.write(`\x1Bc`);
        console.log(`${cardNames[currentLocation]}, your savings balance is \$${savingsBalance[currentLocation]}.`);
    } else {
        console.log(`Invalid option, try again.`);
        process.stdout.write(`\x1Bc`);
        return checkBalance;
    }

}

/**
 * @method
 * @desc withdrawFunds mutator method, removes funds from chosen account, validates input
 * @returns {null}
 */
function withdrawFunds() {
    let checkSave;
    let withdrawAmnt;
    process.stdout.write(`\x1Bc`);
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 to withdraw from checking.`);
    console.log(`Enter 2 to withdraw from savings.`);
    checkSave = Number(PROMPT.question(`Enter(1 or 2): `));
    if (checkSave == 0) {
        console.log(`Exiting...`);
        continueResponse = 0;
    } else if (checkSave == 1) {
        withdrawAmnt = Number(PROMPT.question(`Enter withdrawal amount: `));
        if (validateAmount(withdrawAmnt)) {
            process.stdout.write(`\x1Bc`);
            checkingBalance[currentLocation] -= withdrawAmnt;
            console.log(`Funds withdrawn. Current Balance: \$${checkingBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return withdrawFunds();
        }
    } else if (checkSave == 2) {
        withdrawAmnt = Number(PROMPT.question(`Enter withdrawal amount: `));
        if (validateAmount(withdrawAmnt)) {
            process.stdout.write(`\x1Bc`);
            savingsBalance[currentLocation] -= withdrawAmnt;
            console.log(`Funds withdrawn. Current Balance: \$${savingsBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return withdrawFunds();
        }
    } else {
        console.log(`Invalid option, try again.`);
        process.stdout.write(`\x1Bc`);
        return withdrawFunds();
    }
}

/**
 * @method
 * @desc transferFunds mutator method, subtracts funds from 1 account, adds to the other, validates input
 * @returns {null}
 */
function transferFunds() {
    let checkSave;
    let transferAmnt;
    process.stdout.write(`\x1Bc`);
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 to transfer from your checking to savings.`);
    console.log(`Enter 2 to transfer from your savings to your checking.`);
    checkSave = Number(PROMPT.question(`Enter(1 or 2): `));
    if (checkSave == 0) {
        console.log(`Exiting...`);
        continueResponse = 0;
    } else if (checkSave == 1) {
        transferAmnt = Number(PROMPT.question(`Enter the amount to transfer: `));
        if (validateAmount(transferAmnt)) {
            process.stdout.write(`\x1Bc`);
            checkingBalance[currentLocation] -= transferAmnt;
            savingsBalance[currentLocation] += transferAmnt;
            console.log(`Funds transfered. \nChecking Balance: \$${checkingBalance[currentLocation]} \nSavings Balance: \$${savingsBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return transferFunds();
        }
    } else if (checkSave == 2) {
        transferAmnt = Number(PROMPT.question(`Enter the amount to transfer: `));
        if (validateAmount(transferAmnt)) {
            process.stdout.write(`\x1Bc`);
            savingsBalance[currentLocation] -= transferAmnt;
            checkingBalance[currentLocation] += transferAmnt;
            console.log(`Funds transfered. \nChecking Balance: \$${checkingBalance[currentLocation]} \nSavings Balance: \$${savingsBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return transferFunds();
        }
    } else {
        console.log(`Invalid option, try again.`)
        process.stdout.write(`\x1Bc`);
        return transferFunds();
    }
}

/**
 * @method
 * @desc depositFunds mutator method, adds funds to specified account, validates input
 * @returns {null}
 */
function depositFunds() {
    let checkSave;
    let depositAmnt;
    process.stdout.write(`\x1Bc`);
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 to deposit into checking.`);
    console.log(`Enter 2 to deposit into savings.`);
    checkSave = Number(PROMPT.question(`Enter(1 or 2): `));
    if (checkSave == 0) {
        console.log(`Exiting...`);
        continueResponse = 0;
    } else if (checkSave == 1) {
        depositAmnt = Number(PROMPT.question(`Enter the amount to deposit: `));
        if (validateAmount(depositAmnt)) {
            checkingBalance[currentLocation] += depositAmnt;
            process.stdout.write(`\x1Bc`);
            console.log(`Funds deposited. Current Balance: \$${checkingBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return depositFunds();
        }
    } else if (checkSave == 2) {
        depositAmnt = Number(PROMPT.question(`Enter the amount to deposit: `));
        if (validateAmount(depositAmnt)) {
            savingsBalance[currentLocation] += depositAmnt;
            process.stdout.write(`\x1Bc`);
            console.log(`Funds deposited. Current Balance: \$${savingsBalance[currentLocation]}`);
        } else {
            console.log(`Invalid amount, try again.`);
            process.stdout.write(`\x1Bc`);
            return depositFunds();
        }
    } else {
        console.log(`Invalid option, try again.`);
        process.stdout.write(`\x1Bc`);
        return depositFunds();
    }
}

/**
 * @method
 * @desc Login system method, checks entered name against array(3 attempts), if successful saves user position in array
 * @returns {null}
 */
function setCurrentName(){
    process.stdout.write('\x1Bc');
    currentName = PROMPT.question("Please enter your name: ");
    for (let i = 0; i < 2; i++) {
        for (let m = 0; m <= cardNames.length; m++) {
            if (currentName == cardNames[m]) {
                currentLocation = m;
                return 1;
            }
        }
        process.stdout.write('\x1Bc');
        console.log("Name does not match our records.");
        currentName = PROMPT.question("\nPlease enter your name: ");
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

/**
 * @method
 * @desc Login system method, checks entered card number against card number associated with name entered earlier(3 attempts)
 * @returns {null}
 */
function setCurrentCard() {
    process.stdout.write('\x1Bc');
    currentCard = PROMPT.question("Please enter your card number: ");
    for (let i = 0; i < 2; i++) {
        for (let m = 0; m <= cardNumbers.length; m++) {
            if (currentCard == cardNumbers[currentLocation]) {
                return 1;
            }
        }
        process.stdout.write('\x1Bc');
        console.log("Card number does not match our records.");
        currentName = PROMPT.question("\nPlease enter your name: ");
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

/**
 * @method
 * @desc Login system method, checks entered PIN against PIN associated with name, card number.(3 attempts)
 * @returns {null}
 */
function setCurrentPin() {
    process.stdout.write('\x1Bc');
    currentPin = PROMPT.question("Please enter your PIN: ");
    for (let i = 0; i < 2; i++) {
        for (let m = 0; m <= pinNumbers.length; m++) {
            if (currentPin == pinNumbers[currentLocation]) {
                return 1;
            }
        }
        process.stdout.write('\x1Bc');
        console.log("That is not a valid card number.");
        currentName = PROMPT.question("\nPlease enter your name: ");
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

/**
 * @method
 * @desc Login routine, if successful at each point(name, card #, pin), they are loggedIn
 * @returns {null}
 */
function authRoutine() {
    loggingIn = setCurrentName();
    if (loggingIn == 1) {
        loggingIn = 0;
        loggingIn = setCurrentCard();
        if (loggingIn == 1) {
            loggingIn = 0;
            loggingIn = setCurrentPin();
            if (loggingIn == 1) {
                loggedIn = 1;
            }
        }
    }
}

/**
 * @method
 * @desc Utility method to validate amount entered for customer actions
 * @returns {null}
 */
function validateAmount(amnt) {
    if (amnt > 0) {
        return true;
    } else {
        return false;
    }
}
