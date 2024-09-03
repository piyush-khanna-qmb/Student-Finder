function isWithinThreeHours(timestamp) {
    // Parse the given timestamp to a Date object
    const givenTime = new Date(timestamp);

    // Get the current machine time
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(currentTime - givenTime);

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    // Check if the difference is less than 3 hours
    return differenceInHours < 3;
}

// Example usage
console.log(isWithinThreeHours("2024/09/03 06:17:24")); 