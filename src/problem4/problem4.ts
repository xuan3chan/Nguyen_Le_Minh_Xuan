// Function sum_to_n_a: Iterative approach using a loop
// Time complexity: O(n) - The loop runs from 1 to n, so the time complexity is proportional to n.
// Space complexity: O(1) - It uses only one variable to store the sum, no additional memory is required.
// => This is the first approach I thought of. It’s simple and easy to understand to calculate the sum from 1 to n.
// However, with a time complexity of O(n), this method becomes inefficient when n is very large.
// Rating: 7/10
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i; 
    }
    return sum;
}

// Function sum_to_n_b: Recursive approach
// Time complexity: O(n) - The function calls itself n times (once for each value of n).
// Space complexity: O(n) - Each recursive call takes up memory in the stack, leading to n recursive calls in the stack.
// => This is the second approach I thought of. It's simple and easy to understand.
// However, the time complexity of O(n) makes this approach inefficient for large values of n.
// Rating: 6/10
function sum_to_n_b(n: number): number {
    if (n === 1) return 1;  
    return n + sum_to_n_b(n - 1);  
}

// Function sum_to_n_c: Mathematical formula approach (Optimal solution)
// Time complexity: O(1) - The formula calculates the sum in constant time, regardless of n.
// Space complexity: O(1) - Only a few variables are used to store the result, no additional memory is required.
// => To solve the issues above, I consulted GPT, and this is the most efficient method because it resolves the problems above.
// It uses a direct mathematical formula to calculate the sum from 1 to n.
// It is extremely fast and memory-efficient, especially when n is very large.
// Rating: 10/10
function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}
