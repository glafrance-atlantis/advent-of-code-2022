const findMostCaloriesElf = async () => {
    const data = await getData();
    const arr = data.split('\n');

    const elfData = chunkData(arr);
    const elfSums = sumData(elfData);
    const maxCalories = findMax(elfSums);
    document.querySelector('#result').textContent = maxCalories;
};

const findMax = (calData) => {
    let max = 0;

    for (let n of calData) {
        if (n > max) {
            max = n;
        }
    }

    return max;
};

const sumData = (rawInput) => {
    const sums = [];

    if (rawInput && rawInput.length) {
        for (let arr of rawInput) {
            const currSum = arr.reduce((total, num) => {
                return total += num;
            }, 0);
            sums.push(currSum);
        }
    }

    return sums;
};

const chunkData = (input) => {
    const chunks = [];
    let buffer = [];

    if (input && input.length) {
        for (let line of input) {
            if (line.trim() === '') {
                if (buffer && buffer.length) {
                    chunks.push(buffer);
                }
                buffer = [];
            } else {
                buffer.push(parseInt(line.trim()));
            }
        }
    }

    return chunks;
};

const getData = async () => {
    let calorieData;

    await $.ajax({
        url: "http://localhost:3000/calories",
        success: (data) => {
            calorieData = data;
        },
        error: (error) => {
            console.log("Error getting data: ", error);
        }
    });

    return calorieData;
}
