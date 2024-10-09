import inquirer from "inquirer";
//bank accont class
class BankAccount {
    accountNumber;
    balance;
    constructor(an, bl) {
        this.accountNumber = an;
        this.balance = bl;
    }
    //Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawel of $${amount} successful. Remaing Balance $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //if anyone deposit more than 100$ $1 will be charged
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Total Balace: $${this.balance}`);
    }
    //check balance
    checkBalance() {
        console.log(`Current Balancr$${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Creat bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//creat customers
const customers = [
    new Customer("Hamza", "Usman", "Male", 35, 3145687632, accounts[0]),
    new Customer("Asma", "Zahid", "female", 22, 3335687632, accounts[1]),
    new Customer("Ayesha", "Khan", "female", 28, 3423687632, accounts[2])
];
//fuction to interact with banck account
async function service() {
    do {
        const accNumbInput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter you account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber == accNumbInput.accountnumber);
        if (customer) {
            console.log(`welcome ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank program...");
                    console.log("Thank you for using our bank services");
                    return;
            }
        }
        else {
            console.log("Invalid account number Please try again!");
        }
    } while (true);
}
service();
