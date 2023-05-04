// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add code to display the current date in the header of the page.
// This line indicates that the code is waiting for the document to be fully loaded before it runs.
  $(document).ready(function () {
    var currentDate = dayjs();
    var date = currentDate.date();
    var suffix = getDayOfMonthSuffix(date);

    // This line logs the current date and time in the console in the format of "Day of the week, Month name Day number
    console.log(currentDate.format("dddd, MMMM D") + suffix);
    // This line sets the text of the element with the ID "currentDay" to the same current date and time format as the console log.
    $("#currentDay").text(currentDate.format("dddd, MMMM D") + suffix);
  });
  
  // This function adds a suffix to the current date.
  function getDayOfMonthSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".saveBtn").on("click", function() {
    
    // Gets user input entered.
    var userTask = $(this).siblings(".description").val();
    var timeBlock = $(this).parent().attr("id");
  
    // Shows the info in the console.
    console.log("task = ", userTask);
    console.log("time-slot =", timeBlock);

  localStorage.setItem(timeBlock, JSON.stringify(userTask))
  });
  

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // 1 - Get the current hour.
  var currentHour = dayjs().hour();
  console.log(currentHour)

$(".time-block").each(function () {
  $(this).removeClass("past present future");

  // 2 - Get the value from the html for the current hour block.
  let blockHour = parseInt($(this).attr("id").split("-")[1]);
  console.log(blockHour)
    
  // 3 - Check if the currentHour > or < blockHour and add css styling to the text sections.
  if (currentHour === blockHour) {
    $(this).addClass("present");
  } else if (currentHour < blockHour) {
    $(this).addClass("future");
  } else {
    $(this).addClass("past");
  }
});

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

