const findMostCaloriesElf = async () => {
    const data = await getData();
    const arr = data.split('\n');

    const elfData = chunkData(arr);
    const elfSums = sumData(elfData);
    const maxThreeCalories = findMaxThree(elfSums);
    document.querySelector('#result').textContent = maxThreeCalories;
};

const findMaxThree = (calData) => {
    const max1 = calData[0] || 0;
    const max2 = calData[1] || 0;
    const max3 = calData[2] || 0;
    const total = (max1 + max2 + max3);

    return total;
};

const sumData = (rawInput) => {
    let sums = [];

    if (rawInput && rawInput.length) {
        for (let arr of rawInput) {
            const currSum = arr.reduce((total, num) => {
                return total += num;
            }, 0);
            sums.push(currSum);
        }
    }

    sums.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });

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
