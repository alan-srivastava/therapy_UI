document.addEventListener('DOMContentLoaded', function () {
    // Therapy Mode Selection
    const therapyModes = document.querySelectorAll('.therapy-mode');
    therapyModes.forEach(mode => {
      mode.addEventListener('click', () => {
        therapyModes.forEach(m => m.classList.remove('active'));
        mode.classList.add('active');
      });
    });
  
    // Filter button toggle (Slots / Date)
    const slotsFilter = document.getElementById('slotsFilter');
    const dateFilter = document.getElementById('dateFilter');
    const slotsSection = document.getElementById('slotsSection');
    const dateSection = document.getElementById('dateSection');
  
    slotsFilter.addEventListener('click', () => {
      slotsSection.classList.add('active');
      dateSection.classList.remove('active');
      slotsFilter.classList.add('active');
      dateFilter.classList.remove('active');
    });
  
    dateFilter.addEventListener('click', () => {
      dateSection.classList.add('active');
      slotsSection.classList.remove('active');
      dateFilter.classList.add('active');
      slotsFilter.classList.remove('active');
    });
  
    // Enable Proceed Button when a slot is selected
    const slotButtons = document.querySelectorAll('.slot-button');
    const proceedButton = document.getElementById('proceedButton');
    
    slotButtons.forEach(button => {
      button.addEventListener('click', () => {
        proceedButton.classList.add('active');
        proceedButton.classList.remove('disabled');
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const modeButtons = document.querySelectorAll(".mode-btn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const slotButtons = document.querySelectorAll(".slot-btn");
    const calendarSection = document.getElementById("calendar-section");
    const slotsSection = document.getElementById("slots-section");
    const proceedButton = document.getElementById("proceed-btn");
  
    let selectedSlot = null;
    let selectedDate = null;
  
    // Handle therapy mode selection
    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  
    // Toggle between Slots and Date
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.id === "slot-filter") {
          calendarSection.classList.add("hidden");
          slotsSection.classList.remove("hidden");
        } else {
          slotsSection.classList.add("hidden");
          calendarSection.classList.remove("hidden");
        }
      });
    });
  
    // Handle slot selection
    slotButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        slotButtons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSlot = btn.innerText;
        toggleProceedButton();
      });
    });
  
    // Handle date selection (Placeholder logic for now)
    document.querySelector(".calendar-grid").addEventListener("click", (e) => {
      if (e.target.tagName === "DIV") {
        selectedDate = e.target.innerText;
        toggleProceedButton();
      }
    });
  
    function toggleProceedButton() {
      if (selectedSlot || selectedDate) {
        proceedButton.classList.add("active");
        proceedButton.disabled = false;
      } else {
        proceedButton.classList.remove("active");
        proceedButton.disabled = true;
      }
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const modeButtons = document.querySelectorAll(".mode-btn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const slotButtons = document.querySelectorAll(".slot-btn");
    const calendarSection = document.getElementById("calendar-section");
    const slotsSection = document.getElementById("slots-section");
    const calendarGrid = document.querySelector(".calendar-grid");
    const proceedButton = document.getElementById("proceed-btn");
    const monthDisplay = document.getElementById("current-month");
  
    let selectedSlot = null;
    let selectedDate = null;
    let currentMonth = 7; // August (0-based index for months)
    let currentYear = 2024;
  
    // Handle therapy mode selection
    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  
    // Toggle between Slots and Date
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.id === "slot-filter") {
          calendarSection.classList.add("hidden");
          slotsSection.classList.remove("hidden");
        } else {
          slotsSection.classList.add("hidden");
          calendarSection.classList.remove("hidden");
        }
      });
    });
  
    // Handle slot selection
    slotButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        slotButtons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSlot = btn.innerText;
        toggleProceedButton();
      });
    });
  
    // Generate the calendar dynamically
    function generateCalendar(month, year) {
      calendarGrid.innerHTML = ""; // Clear the current calendar
      monthDisplay.innerText = new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
  
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Add empty slots for the first week
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarGrid.appendChild(emptyCell);
      }
  
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement("div");
        dateCell.innerText = day;
        dateCell.classList.add("calendar-day");
        dateCell.addEventListener("click", () => {
          document
            .querySelectorAll(".calendar-day")
            .forEach((cell) => cell.classList.remove("selected"));
          dateCell.classList.add("selected");
          selectedDate = `${day}/${month + 1}/${year}`;
          toggleProceedButton();
        });
        calendarGrid.appendChild(dateCell);
      }
    }
  
    // Navigate months
    document.querySelector(".prev-month").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
    });
  
    document.querySelector(".next-month").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
    });
  
    // Enable the Proceed button
    function toggleProceedButton() {
      if (selectedSlot || selectedDate) {
        proceedButton.classList.add("active");
        proceedButton.disabled = false;
      } else {
        proceedButton.classList.remove("active");
        proceedButton.disabled = true;
      }
    }
  
    // Initial calendar generation for August 2024
    generateCalendar(currentMonth, currentYear);
  });
  
  