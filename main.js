// import inquirer from "inquirer";
// const randomNumber: number = Math.floor(10000 + Math.random() * 90000)
// let myBalance: number = 0
// let answer = await inquirer.prompt(
//     [
//         {
//             type: "input",
//             name: "student",
//             message: "Enter student name:",
//             validate: function (value){
//                 if (value.trim() !== "") {
//                     return true;
//                 }
//             return "Please enter a non-empty value.";
//         },
//         },
//         {
//             name: "courses",
//             type: "list",
//             message: "Select the course to enrolled",
//             choices: ["HTML", "CSS","Javascript", "Typescript", "Python",]
//         }
//     ]
// );
// const tutionFee: {[key: string]: number} ={
//     "HTML": 5000,
//     "CSS": 5500,
//     "Javascript": 7000,
//     "Typescript": 8000,
//     "Python": 10000,
// };
// console.log(`\nTution fees: ${tutionFee[answer.courses]}/-\n`);
// console.log(`Balance:${myBalance}\n`);
// let paymentType = await inquirer.prompt([
//     {
//         name: "payment",
//         type: "list",
//         message: "Select payment method",
//         choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
//     },
//     {
//         name: "amount",
//         type: "input",
//         message: "Transfer amount",
//         validate: function(value) {
//             if (value.trim() !== "") {
//                 return true;
//             }
//             return "Please enter a non-empty value.";
//         }
//     }
// ]);
// console.log(`you select payment method ${paymentType.payment}`);
// const tutionFees = tutionFee [answer.courses];
// const paymentAmount = parseFloat(paymentType.payment)
// if (tutionFees === paymentAmount){
//     console.log(`Congratulations! you have successfully enrolled in ${answer.courses}. \n`);
// }
//  else{
//     console.log("insufficient amount");
// };
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate random number (unused in this context)
let myBalance = 0; // Assuming initial balance is 0
const courses = [
    { name: "HTML", fee: 5000 },
    { name: "CSS", fee: 5500 },
    { name: "Javascript", fee: 7000 },
    { name: "Typescript", fee: 8000 },
    { name: "Python", fee: 10000 },
];
async function enrollStudent() {
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "student",
            message: "Enter student name:",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
        {
            name: "courses",
            type: "list",
            message: "Select the course to enroll in:",
            choices: courses.map((course) => course.name),
        },
    ]);
    const selectedCourse = courses.find((course) => course.name === answer.courses);
    if (!selectedCourse) {
        console.error("An error occurred. Please try again.");
        return;
    }
    console.log(`\nTution fees: ${selectedCourse.fee}/-\n`);
    console.log(`Balance: ${myBalance}/-\n`); // Display current balance
    let paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select payment method:",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
        },
        {
            name: "amount",
            type: "input",
            message: "Transfer amount:",
            validate: function (value) {
                if (value.trim() !== "") {
                    const parsedAmount = parseFloat(value);
                    if (isNaN(parsedAmount) || parsedAmount <= 0) {
                        return "Please enter a valid positive number for the amount.";
                    }
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
    ]);
    console.log(`You selected payment method: ${paymentType.payment}`);
    const paymentAmount = parseFloat(paymentType.amount);
    if (paymentAmount >= selectedCourse.fee) {
        console.log(`Congratulations! You have successfully enrolled in ${answer.courses}.`);
        // Update balance if payment is successful (assuming payment goes to myBalance)
        myBalance += paymentAmount;
        console.log(`New balance: ${myBalance}/-`);
    }
    else {
        console.log("Insufficient amount. The required amount is:", selectedCourse.fee);
    }
}
enrollStudent();
