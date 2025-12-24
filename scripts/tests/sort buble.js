const myArray = [54, 78, 656, 1, 202, 33, 488, 66, 3];

const n = myArray.length;

for (let i = 0; i < n; i++) {
    for (let j = 1; j < n - i + 1; j++) {
        if (myArray[j - 1] > myArray[j]) {
            // const tmp = myArray[j];
            // myArray[j] = myArray[j - 1];
            // myArray[j - 1] = tmp;
            [myArray[j], myArray[j - 1]] = [myArray[j - 1], myArray[j]];
        }
    }
}
console.log(myArray);
