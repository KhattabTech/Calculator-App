// Select buttons and display elements
const buttons = document.querySelectorAll(".btn");
const calculation = document.querySelector(".calculation");
const result = document.querySelector(".result");

let isEditing = false; // Track editing state

// Enable editing on mousedown
calculation.addEventListener("mousedown", () => {
  if (!isEditing) {
    calculation.contentEditable = true;
    calculation.focus();
    isEditing = true;
  }
});

// Disable editing on blur
calculation.addEventListener("blur", () => {
  if (isEditing) {
    calculation.contentEditable = false;
    isEditing = false;
    updateResult();
  }
});

// Handle "Enter" key to save input and update result
calculation.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    calculation.blur();
  }
});

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.dataset.operator || button.textContent;

    if (button.classList.contains("clear")) {
      // Clear calculation and result
      calculation.textContent = "";
      result.textContent = "0";
    } else if (button.classList.contains("delete")) {
      // Remove last character
      calculation.textContent = calculation.textContent.slice(0, -1);
      updateResult();
    } else if (button.classList.contains("equals")) {
      // Calculate result
      try {
        let calc = calculation.textContent
          .replace(/×/g, "*")
          .replace(/÷/g, "/");
        result.textContent = eval(calc);
        calculation.textContent = "";
      } catch {
        result.textContent = "Error";
      }
    } else {
      // Handle operators and numbers
      const lastChar = calculation.textContent.slice(-1);
      const operators = ["+", "-", "*", "/", "%", "×", "÷"];

      if (operators.includes(value)) {
        if (operators.includes(lastChar)) {
          calculation.textContent =
            calculation.textContent.slice(0, -1) + value;
        } else {
          calculation.textContent += value;
        }
      } else {
        calculation.textContent += value;
      }

      updateResult();
    }

    // Remove focus after button click
    if (isEditing) {
      calculation.blur();
    }
  });
});

// Update the result based on current calculation
function updateResult() {
  let calc = calculation.textContent.replace(/×/g, "*").replace(/÷/g, "/");
  calc = calc.trim();

  if (calc === "" || isNaN(eval(calc.slice(-1)))) {
    result.textContent = "0";
  } else {
    try {
      result.textContent = eval(calc);
    } catch {
      result.textContent = "Error";
    }
  }
}
