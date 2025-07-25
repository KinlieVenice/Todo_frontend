const url = "http://127.0.0.1:5000";
let currentId = null;
let subjId = null;
let userId;


// FETCHING
const fetchSubjects = async () => {
  try {
    const token = localStorage.getItem("jwt");  
    const link = `${url}/subjects`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token  
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched subjects:", data);
    return data;

  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
};

const fetchTasks = async (subj_id) => {
  try {
    const token = localStorage.getItem("jwt");
    const link = `${url}/subjects/${subj_id}/tasks`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const fetchIndivSubj = async (id) => {
  try {
    const token = localStorage.getItem("jwt"); 
    const link = `${url}/subjects/${id}`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const fetchDone = async () => {
  try {
    const token = localStorage.getItem("jwt");

    let link = `${url}/subjects/tasks/done`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

const fetchMajor = async () => {
  try {
    const token = localStorage.getItem("jwt"); 
    let link = `${url}/subjects/majors`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const fetchMinor = async () => {
  try {
    const token = localStorage.getItem("jwt"); 
    let link = `${url}/subjects/minors`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const fetchUser = async (id) => {
  try {
    const token = localStorage.getItem("jwt"); 
    const link = `${url}/api/register/${id}`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  } 
}

// DISPLAYING
const displaySubjects = async () => {
  displayUser(userId);
  const subjects = await fetchSubjects();
  const subj_div = document.getElementById("subject_div");

  // delete content first to not keep appending
  subj_div.className = "";
  subj_div.innerHTML = "";

  // because done changes the innerHTML
  document.getElementById("task_title").innerHTML = "My Tasks";
  document.getElementById("task_filters").classList.remove("hidden");

  const pending = document.getElementById("pendingTab");
  const done = document.getElementById("doneTab");

  const mobilePending = document.getElementById("mobilependingTab");
  const mobileDone = document.getElementById("mobiledoneTab");

  // Toggle visibility first
  pending.classList.add("tabs-selected");
  done.classList.remove("tabs-selected");

  mobilePending.classList.add("tabs-selected");
  mobileDone.classList.remove("tabs-selected");

    subjects.forEach((subject) => {
      const color = subject.task_length == 0 ? "Gainsboro" : subject.color;
      const text_color = subject.task_length == 0 ? "gray" : "black";

      subj_div.insertAdjacentHTML(
        "beforeend",
        `<div class="subject" style="background-color: ${color}; color: ${text_color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class="font-medium  capitalize" value="${subject.name}">${subject.name}</p>
                <p class=" ">Class: <span class=" italic capitalize" value="${subject.name}">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" data-name="${subject.name}" data-class="${subject.class}" data-color="${subject.color}" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
            <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
            </div>

        </div>`
      );
      console.log(`tasks-maindiv-${subject.id}`);

    });
};

const displayTasks = async (subj_id) => {
  const tasks = await fetchTasks(subj_id);
  const tasks_maindiv = document.getElementById(`tasks-maindiv-${subj_id}`);
  const task_div = document.getElementById(`task-div-${subj_id}`);


  // Toggle visibility first
  tasks_maindiv.classList.toggle("hidden");
  tasks_maindiv.classList.toggle("flex");

  // Clear previous tasks if any
  task_div.innerHTML = "";

  // Re-insert tasks only if showing
  tasks.forEach((task) => {
    const descriptionHtml = task.description.replace(/\n/g, "<br>");
    const rgbaColor = hexToRgba(task.subject_color, 0.3);

    task_div.insertAdjacentHTML(
      "beforeend",
      ` <div class="indiv-task w-[280px] md:w-[380px]  border bg-bg border-transparent !rounded-[12px]">
                <div class="py-2 px-4 !rounded-t-[12px] flex justify-between items-center" style="background-color: ${rgbaColor}">
                  <p><span class="font-semibold">Deadline: <span>${task.deadline_date}</span> | <span>${task.deadline_time}</span></span></p>
                  <span class="flex gap-2 items-center">
                      <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'editTaskModal', ${task.subject_id})" data-image="${task.img_filename}" data-deadline="${task.deadline}" data-description="${task.description}" data-name="${task.name}" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1.39574C11.08 1.39574 12.08 1.7374 12.8975 2.32074L5.28583 9.93157C5.20624 10.0084 5.14276 10.1004 5.09908 10.2021C5.05541 10.3037 5.03242 10.4131 5.03146 10.5237C5.0305 10.6344 5.05158 10.7441 5.09348 10.8465C5.13538 10.9489 5.19726 11.042 5.2755 11.1202C5.35375 11.1985 5.44679 11.2604 5.5492 11.3023C5.65162 11.3442 5.76135 11.3652 5.872 11.3643C5.98265 11.3633 6.092 11.3403 6.19367 11.2967C6.29534 11.253 6.38729 11.1895 6.46417 11.1099L14.0758 3.49824C14.6784 4.3441 15.0016 5.35717 15 6.39574V14.7291C15 15.1711 14.8244 15.595 14.5118 15.9076C14.1993 16.2201 13.7754 16.3957 13.3333 16.3957H1.66667C1.22464 16.3957 0.800716 16.2201 0.488155 15.9076C0.175595 15.595 0 15.1711 0 14.7291V3.0624C0 2.62038 0.175595 2.19645 0.488155 1.88389C0.800716 1.57133 1.22464 1.39574 1.66667 1.39574H10ZM15.5475 0.848237C15.7037 1.00451 15.7915 1.21643 15.7915 1.4374C15.7915 1.65837 15.7037 1.8703 15.5475 2.02657L14.075 3.49824C13.7505 3.04267 13.3522 2.64442 12.8967 2.3199L14.3683 0.848237C14.5246 0.692011 14.7365 0.604248 14.9575 0.604248C15.1785 0.604248 15.3912 0.692011 15.5475 0.848237Z" fill="white"/>
                      </svg>
                      <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'deleteTaskModal', ${task.subject_id})"  viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.62484 13.3333C1.62484 14.25 2.37484 15 3.2915 15H9.95817C10.8748 15 11.6248 14.25 11.6248 13.3333V5C11.6248 4.08333 10.8748 3.33333 9.95817 3.33333H3.2915C2.37484 3.33333 1.62484 4.08333 1.62484 5V13.3333ZM11.6248 0.833333H9.5415L8.94984 0.241667C8.79984 0.0916666 8.58317 0 8.3665 0H4.88317C4.6665 0 4.44984 0.0916666 4.29984 0.241667L3.70817 0.833333H1.62484C1.1665 0.833333 0.791504 1.20833 0.791504 1.66667C0.791504 2.125 1.1665 2.5 1.62484 2.5H11.6248C12.0832 2.5 12.4582 2.125 12.4582 1.66667C12.4582 1.20833 12.0832 0.833333 11.6248 0.833333Z"
                          fill="white"/>
                      </svg>
                  </span>
                </div>
                <div class="p-3 md:p-5">
                  <span class="flex justify-between items-center">
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="done" value="${task.id}" class="peer sr-only" onclick="showModal(event, ${task.id}, 'updateStatusModal', ${task.subject_id})"/>
                      <span class="checkbox"></span>
                      <p class="font-semibold ml-2">${task.name}</p>
                    </label>
                    <p><span class="text-red-500">${task.due_text}</span></p>
                  </span>
                  <div class="flex gap-8 w-full items-center px-5 p-3 !pb-0">
                    <img src="${url}/images/${task.img_filename}" alt="" class="w-[70px] md:w-[90px] aspect-square object-cover"/>
                    <p class="max-w-[300px]">${descriptionHtml}</p>
                  </div>
                </div>
              </div>

        `
    );
  });
};

const displayDone = async () => {
  const tasks = await fetchDone();
  const container = document.getElementById("subject_div");
  container.className =
    "justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10";

  container.innerHTML = ""; // Clear old content
  document.getElementById("task_title").innerHTML = "My Accomplished Tasks";

  document.getElementById("task_filters").classList.add("hidden");

  const pending = document.getElementById("pendingTab");
  const done = document.getElementById("doneTab");

  const mobilePending = document.getElementById("mobilependingTab");
  const mobileDone = document.getElementById("mobiledoneTab");

  // Toggle visibility first
  pending.classList.remove("tabs-selected");
  done.classList.add("tabs-selected");

  mobilePending.classList.remove("tabs-selected");
  mobileDone.classList.add("tabs-selected");


  tasks.forEach((task) => {
    const descriptionHtml = task.description.replace(/\n/g, "<br>");


    // Create a div element
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "indiv-task w-[280px] md:w-[380px]  border bg-bg border-transparent !rounded-[12px]";

    taskDiv.innerHTML = `
      <div class=" py-2 px-4 !rounded-t-[12px] flex justify-between items-center" style="background-color: ${task.subject_color}">
                    <p><span class="font-semibold">Deadline: <span>${task.deadline_date}</span> | <span>${task.deadline_time}</span></span></p>
                    <span class="flex gap-3 items-center">
                        <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'deleteDoneModal')" width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.62484 13.3333C1.62484 14.25 2.37484 15 3.2915 15H9.95817C10.8748 15 11.6248 14.25 11.6248 13.3333V5C11.6248 4.08333 10.8748 3.33333 9.95817 3.33333H3.2915C2.37484 3.33333 1.62484 4.08333 1.62484 5V13.3333ZM11.6248 0.833333H9.5415L8.94984 0.241667C8.79984 0.0916666 8.58317 0 8.3665 0H4.88317C4.6665 0 4.44984 0.0916666 4.29984 0.241667L3.70817 0.833333H1.62484C1.1665 0.833333 0.791504 1.20833 0.791504 1.66667C0.791504 2.125 1.1665 2.5 1.62484 2.5H11.6248C12.0832 2.5 12.4582 2.125 12.4582 1.66667C12.4582 1.20833 12.0832 0.833333 11.6248 0.833333Z"
                            fill="white"/>
                        </svg>
                    </span>
                  </div>
                  <div class="p-3 md:p-5">
                    <h5 class="capitalize pb-2"><span class="font-semibold">Subject:</span> ${task.subject_name} | ${task.subject_class}</h5>
                    <span class="flex justify-between items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="done" value="${task.id}" class="peer sr-only" onclick="showModal(event, ${task.id}, 'reupdateStatusModal')" checked/>
                        <span class="checkbox"></span>
                        <p class="font-semibold ml-2">${task.name}</p>
                      </label>
                      <p><span class="text-green-500">Done!</span></p>
                    </span>
                    <div class="flex gap-8 w-full items-center px-5 p-3 !pb-0">
                      <img src="${url}/images/${task.img_filename}" alt="" class="w-[70px] md:w-[90px] aspect-square object-cover"/>
                      <p class="max-w-[300px]">${descriptionHtml}</p>
                    </div>
                  </div>
                  </div>
    `;

    container.appendChild(taskDiv); // Add each task to #main, appended needed because div was just created
  });
};

const displayMajor = async () => {
  displayUser(userId);
  const subjects = await fetchMajor();
  const subj_div = document.getElementById("subject_div");
  subj_div.className = "";
  subj_div.innerHTML = "";

  document.getElementById("task_title").innerHTML = "My Tasks";
  document.getElementById("task_filters").classList.remove("hidden");

    subjects.forEach((subject) => {
      const color = subject.task_length == 0 ? "Gainsboro" : subject.color;
      const text_color = subject.task_length == 0 ? "gray" : "black";

      subj_div.insertAdjacentHTML(
        "beforeend",
        `<div class="subject" style="background-color: ${color}; color: ${text_color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class="capitalize" value="${subject.name}">${subject.name}</p>
                <p ">Class: <span class=" italic capitalize" value="${subject.name}">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" data-name="${subject.name}" data-class="${subject.class}" data-color="${subject.color}" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
          <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
          </div>

        </div>`
      );
    });
};

const displayMinor = async () => {
  displayUser(userId);
  const subjects = await fetchMinor();
  document.getElementById("task_title").innerHTML = "My Tasks";
  document.getElementById("task_filters").classList.remove("hidden");
  const subj_div = document.getElementById("subject_div");
  subj_div.className = "";
  subj_div.innerHTML = "";
 

    subjects.forEach((subject) => {
      const color = subject.task_length == 0 ? "Gainsboro" : subject.color;
      const text_color = subject.task_length == 0 ? "gray" : "black";

      subj_div.insertAdjacentHTML(
        "beforeend",
        `<div class="subject" style="background-color: ${color}; color: ${text_color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class=" capitalize" value="${subject.name}">${subject.name}</p>
                <p >Class: <span class=" italic capitalize" value="${subject.name}">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" data-name="${subject.name}" data-class="${subject.class}" data-color="${subject.color}" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
          <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
          </div>

        </div>`
      );
    });
};


const displayUser = async (id) => {
  const headerDiv = document.getElementById("header_pic");
  const side_bar = document.getElementById("side_bar");
  const side_panel = document.getElementById("side_panel");

  const user = await fetchUser(id);
  side_bar.innerHTML = "";
  headerDiv.innerHTML = "";
  side_panel.innerHTML = "";


  headerDiv.insertAdjacentHTML(
    "afterbegin",
    ` <div onclick="showModal(event, ${user.id}, 'editHeaderModal')"
        class="relative cover_img bg-cover bg-center bg-no-repeat h-[200px] group overflow-hidden"
        style="background-image: url('${url}/images/${user.header}')"
      >
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Change Header
            </p>
        </div>
      </div>
      <div onclick="showModal(event, ${user.id}, 'editProfileModal')" class="absolute bottom-[-35%] group w-[130px] aspect-square ml-[115px] border border-light rounded-full overflow-hidden">
        <img
          src="${url}/images/${user.profile}"
          class="object-cover w-full h-full"
          alt="Profile Image"
        />
        <!-- Dark overlay with text -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
          <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Change Profile
          </p>
        </div>
      </div>
      
    `
  );

  side_bar.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="side-bar__wrapper grid place-items-center w-full gap-[5px]">
          <h3 class="uppercase">${user.username}</h3>
          <span class="block bg-primary h-[8px] w-full rounded-[8px]"></span>
          <span onclick="showModal(event, ${user.id}, 'editBioModal')"
            class="relative block bg-cover group bg-center bg-no-repeat h-[160px] w-full" style="background-image: url('${url}/images/${user.bio}')"
          >
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Change Bio Picture
              </p>
            </div>
          </span>
          <div class="tabs bg-primary">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.41667 21.8332H17.5833C18.7783 21.8332 19.75 20.8614 19.75 19.6665V3.4165C19.75 2.22159 18.7783 1.24984 17.5833 1.24984H15.4167C15.4167 0.962519 15.3025 0.686969 15.0994 0.483805C14.8962 0.28064 14.6207 0.166504 14.3333 0.166504H5.66667C5.37935 0.166504 5.1038 0.28064 4.90063 0.483805C4.69747 0.686969 4.58333 0.962519 4.58333 1.24984H2.41667C1.22175 1.24984 0.25 2.22159 0.25 3.4165V19.6665C0.25 20.8614 1.22175 21.8332 2.41667 21.8332ZM2.41667 3.4165H4.58333V5.58317H15.4167V3.4165H17.5833V19.6665H2.41667V3.4165Z"
                fill="#F5F5F5"
              />
            </svg>
            <p>My Tasks</p>
          </div>
          <div class="tabs-indent tabs-selected" id="pendingTab"  onclick="displaySubjects()">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4375 2.4375C15.4375 3.78371 14.3462 4.875 13 4.875C11.6538 4.875 10.5625 3.78371 10.5625 2.4375C10.5625 1.09129 11.6538 0 13 0C14.3462 0 15.4375 1.09129 15.4375 2.4375ZM13 21.125C11.6538 21.125 10.5625 22.2163 10.5625 23.5625C10.5625 24.9087 11.6538 26 13 26C14.3462 26 15.4375 24.9087 15.4375 23.5625C15.4375 22.2163 14.3462 21.125 13 21.125ZM23.5625 10.5625C22.2163 10.5625 21.125 11.6538 21.125 13C21.125 14.3462 22.2163 15.4375 23.5625 15.4375C24.9087 15.4375 26 14.3462 26 13C26 11.6538 24.9087 10.5625 23.5625 10.5625ZM4.875 13C4.875 11.6538 3.78371 10.5625 2.4375 10.5625C1.09129 10.5625 0 11.6538 0 13C0 14.3462 1.09129 15.4375 2.4375 15.4375C3.78371 15.4375 4.875 14.3462 4.875 13ZM5.5312 18.0313C4.18498 18.0313 3.0937 19.1226 3.0937 20.4688C3.0937 21.815 4.18498 22.9063 5.5312 22.9063C6.87741 22.9063 7.9687 21.815 7.9687 20.4688C7.9687 19.1226 6.87736 18.0313 5.5312 18.0313ZM20.4688 18.0313C19.1226 18.0313 18.0313 19.1226 18.0313 20.4688C18.0313 21.815 19.1226 22.9063 20.4688 22.9063C21.815 22.9063 22.9063 21.815 22.9063 20.4688C22.9063 19.1226 21.815 18.0313 20.4688 18.0313ZM5.5312 3.0937C4.18498 3.0937 3.0937 4.18498 3.0937 5.5312C3.0937 6.87741 4.18498 7.9687 5.5312 7.9687C6.87741 7.9687 7.9687 6.87741 7.9687 5.5312C7.9687 4.18498 6.87736 3.0937 5.5312 3.0937Z"
                fill="#81C784"
              />
            </svg>
            <p>Pending</p>
          </div>
          <div class="tabs-indent" id="doneTab" onclick="displayDone()">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.60001 23.4H23.4V2.6H2.60001V23.4ZM0 26H26V0H0V26ZM12.277 17.8724L7.67991 13.2756L9.51848 11.4374L12.277 14.196L17.7927 8.6801L19.6312 10.5183L12.2782 17.8724H12.277Z"
                fill="#81C784"
              />
            </svg>
            <p>Done</p>
          </div>

          
        </div>
    `
  );

  side_panel.insertAdjacentHTML(
    "afterbegin",
    ` <div onclick="showModal(event, ${user.id}, 'editHeaderModal')"
        class="relative cover_img bg-cover bg-center bg-no-repeat h-[100px] md:h-[180px] group overflow-hidden"
        style="background-image: url('${url}/images/${user.header}')"
      >
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Change Header
            </p>
        </div>
      </div>
      <div>
      <div onclick="showModal(event, ${user.id}, 'editProfileModal')" class="absolute top-[70px] group w-[80px] md:w-[120px] aspect-square ml-[100px] md:ml-[115px] border border-light rounded-full overflow-hidden">
        <img
          src="${url}/images/${user.profile}"
          class="object-cover w-full h-full"
          alt="Profile Image"
        />
        <!-- Dark overlay with text -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center text-center">
          <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Change Profile
          </p>
        </div>
      </div>
      </div>
      <div class="side-bar__wrapper mt-13 grid px-2 pb-2 place-items-center w-full gap-[5px]">
          <h3 class="uppercase">${user.username}</h3>
          <span class="block bg-primary h-[8px] w-full rounded-[8px]"></span>
          <span onclick="showModal(event, ${user.id}, 'editBioModal')"
            class="relative block bg-cover group bg-center bg-no-repeat h-[160px] w-full" style="background-image: url('${url}/images/${user.bio}')"
          >
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <p class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Change Bio Picture
              </p>
            </div>
          </span>
          <div class="tabs bg-primary">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.41667 21.8332H17.5833C18.7783 21.8332 19.75 20.8614 19.75 19.6665V3.4165C19.75 2.22159 18.7783 1.24984 17.5833 1.24984H15.4167C15.4167 0.962519 15.3025 0.686969 15.0994 0.483805C14.8962 0.28064 14.6207 0.166504 14.3333 0.166504H5.66667C5.37935 0.166504 5.1038 0.28064 4.90063 0.483805C4.69747 0.686969 4.58333 0.962519 4.58333 1.24984H2.41667C1.22175 1.24984 0.25 2.22159 0.25 3.4165V19.6665C0.25 20.8614 1.22175 21.8332 2.41667 21.8332ZM2.41667 3.4165H4.58333V5.58317H15.4167V3.4165H17.5833V19.6665H2.41667V3.4165Z"
                fill="#F5F5F5"
              />
            </svg>
            <p>My Tasks</p>
          </div>
          <div class="tabs-indent tabs-selected" id="mobilependingTab"  onclick="displaySubjects(); toggleMenu()">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4375 2.4375C15.4375 3.78371 14.3462 4.875 13 4.875C11.6538 4.875 10.5625 3.78371 10.5625 2.4375C10.5625 1.09129 11.6538 0 13 0C14.3462 0 15.4375 1.09129 15.4375 2.4375ZM13 21.125C11.6538 21.125 10.5625 22.2163 10.5625 23.5625C10.5625 24.9087 11.6538 26 13 26C14.3462 26 15.4375 24.9087 15.4375 23.5625C15.4375 22.2163 14.3462 21.125 13 21.125ZM23.5625 10.5625C22.2163 10.5625 21.125 11.6538 21.125 13C21.125 14.3462 22.2163 15.4375 23.5625 15.4375C24.9087 15.4375 26 14.3462 26 13C26 11.6538 24.9087 10.5625 23.5625 10.5625ZM4.875 13C4.875 11.6538 3.78371 10.5625 2.4375 10.5625C1.09129 10.5625 0 11.6538 0 13C0 14.3462 1.09129 15.4375 2.4375 15.4375C3.78371 15.4375 4.875 14.3462 4.875 13ZM5.5312 18.0313C4.18498 18.0313 3.0937 19.1226 3.0937 20.4688C3.0937 21.815 4.18498 22.9063 5.5312 22.9063C6.87741 22.9063 7.9687 21.815 7.9687 20.4688C7.9687 19.1226 6.87736 18.0313 5.5312 18.0313ZM20.4688 18.0313C19.1226 18.0313 18.0313 19.1226 18.0313 20.4688C18.0313 21.815 19.1226 22.9063 20.4688 22.9063C21.815 22.9063 22.9063 21.815 22.9063 20.4688C22.9063 19.1226 21.815 18.0313 20.4688 18.0313ZM5.5312 3.0937C4.18498 3.0937 3.0937 4.18498 3.0937 5.5312C3.0937 6.87741 4.18498 7.9687 5.5312 7.9687C6.87741 7.9687 7.9687 6.87741 7.9687 5.5312C7.9687 4.18498 6.87736 3.0937 5.5312 3.0937Z"
                fill="#81C784"
              />
            </svg>
            <p>Pending</p>
          </div>
          <div class="tabs-indent" id="mobiledoneTab" onclick="displayDone(); toggleMenu();"
>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.60001 23.4H23.4V2.6H2.60001V23.4ZM0 26H26V0H0V26ZM12.277 17.8724L7.67991 13.2756L9.51848 11.4374L12.277 14.196L17.7927 8.6801L19.6312 10.5183L12.2782 17.8724H12.277Z"
                fill="#81C784"
              />
            </svg>
            <p>Done</p>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 mt-auto p-4">
          <svg onclick="logout()" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="8" fill="#4CAF50"/>
            <path d="M24.7983 15.6953L22.7535 13.6505C22.5805 13.4775 22.3285 13.4101 22.0924 13.4733C21.8562 13.5366 21.6717 13.7211 21.6084 13.9573C21.5452 14.1934 21.6126 14.4456 21.7855 14.6184L22.6717 15.4977H18.8614C18.6179 15.4977 18.3928 15.6276 18.271 15.8385C18.1492 16.0494 18.1492 16.3093 18.271 16.5202C18.3928 16.7311 18.6179 16.861 18.8614 16.861H22.6717L21.7855 17.7402C21.6126 17.9132 21.5451 18.1652 21.6084 18.4014C21.6716 18.6375 21.8562 18.822 22.0924 18.8853C22.3285 18.9486 22.5805 18.8811 22.7535 18.7082L24.7983 16.6635V16.6633C24.9274 16.5354 24.9999 16.3611 24.9999 16.1794C24.9999 15.9976 24.9274 15.8234 24.7983 15.6954V15.6953Z" fill="white"/>
            <path d="M21.5874 20.2694C21.4068 20.2694 21.2333 20.3411 21.1054 20.4689C20.9777 20.5968 20.9059 20.7701 20.9059 20.9509V22.9957H17.4978V12.7713C17.4966 12.5434 17.3814 12.3311 17.191 12.2057L12.9308 9.36331H20.906V11.4081C20.906 11.6516 21.0359 11.8767 21.2468 11.9985C21.4577 12.1203 21.7176 12.1203 21.9285 11.9985C22.1394 11.8767 22.2693 11.6516 22.2693 11.4081V8.68155C22.2693 8.50077 22.1974 8.32742 22.0695 8.19956C21.9418 8.07188 21.7683 8 21.5875 8H10.6817C10.5009 8 10.3276 8.07188 10.1997 8.19956C10.0719 8.32741 10 8.50076 10 8.68155V22.314C10.0012 22.542 10.1164 22.7544 10.3068 22.8797L16.4416 26.9695C16.5422 27.0346 16.6582 27.072 16.7779 27.0781C16.8975 27.084 17.0167 27.0583 17.1233 27.0037C17.2346 26.9475 17.3284 26.862 17.3945 26.7561C17.4607 26.6504 17.4965 26.5284 17.4982 26.4038V24.3588H21.588H21.5878C21.7686 24.3588 21.9421 24.2871 22.0698 24.1593C22.1977 24.0314 22.2696 23.8581 22.2696 23.6773V20.9508C22.2696 20.77 22.1977 20.5966 22.0698 20.4688C21.9421 20.3409 21.7686 20.2692 21.5878 20.2692L21.5874 20.2694ZM16.1345 25.1291L11.3631 21.9458V9.95595L16.1345 13.1391V25.1291Z" fill="white"/>
          </svg>
            
          <button onclick="logout()"><h4>Logout</h4></button>
        </div>
      
      
    `
  );


}

// CREATING
const createSubject = async (e) => {
  e.preventDefault();
  const form = document.getElementById("createSubjectForm");
  const formData = new FormData(form);
  const token = localStorage.getItem("jwt"); 

  const requiredFields = ["name", "classname", "color"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  document.getElementById("createSubjModal").classList.add("hidden");

  try {
    const response = await fetch(`${url}/subjects`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token, // Send JWT token here
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displaySubjects();
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create subject.");
  }
};


const createTask = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const token = localStorage.getItem("jwt");
  const form = document.getElementById("createTaskForm");
  const formData = new FormData(form);
  const modal = document.getElementById("createTaskModal");
  const tasks_maindiv = document.getElementById(`tasks-maindiv-${currentId}`);


  // Validate required fields
  const requiredFields = ["name", "description", "deadline", "img_filename"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (fieldName === "img_filename") {
      if (!input.files || input.files.length === 0) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }
      return;
    }

    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  

  // Format deadline (e.g., "2025-06-27T16:00" → "2025-06-27 16:00:00")
  let deadlineInput = formData.get("deadline");
  let deadlineFormatted = deadlineInput.replace("T", " ") + ":00";
  formData.set("deadline", deadlineFormatted);

  try {
    const response = await fetch(`${url}/subjects/${currentId}/tasks`, {
      method: "POST",
      headers: {
        Authorization: token, 
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    modal.classList.add("hidden");

    if (tasks_maindiv.classList.contains("hidden")) {
      await displayTasks(currentId);
    } else {
      await displaySubjects();
      await displayTasks(currentId);
    }
    form.reset();


  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create task. Please try again.");
  }

};


// EDITING
const editSubject = async (event) => {
  const token = localStorage.getItem("jwt"); 
  event.preventDefault();
  const form = document.getElementById("editSubjectForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editSubjModal");

  const requiredFields = ["name", "classname", "color"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  try {
    const response = await fetch(`${url}/subjects/${currentId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    modal.classList.add("hidden");
    displaySubjects(); // Refresh the tasks list
    return data;
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
};

const editTask = async (event) => {
  const token = localStorage.getItem("jwt"); //  Get token from storage
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("editTaskForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editTaskModal");

  // Validate required fields
  const requiredFields = ["name", "description", "deadline"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);


    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  let deadlineInput = formData.get("deadline");
  let deadlineFormatted = deadlineInput.replace("T", " ") + ":00";
  formData.set("deadline", deadlineFormatted);

  try {
    const response = await fetch(`${url}/tasks/${currentId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    modal.classList.add("hidden");
    form.reset();
    const tasks_maindiv = document.getElementById(`tasks-maindiv-${subjId}`);

    if (tasks_maindiv){
      await displaySubjects();
      await displayTasks(subjId); //currentId here is the task not the subject change to subjId
    }
    return data;

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to edit task. Please try again.");
  }
};

const editProfile = async (event) => {
  const token = localStorage.getItem("jwt");
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("editProfileForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editProfileModal");

  // Validate required fields
  const requiredFields = ["profile"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  try {
    const response = await fetch(`${url}/api/register/${currentId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    modal.classList.add("hidden");
    location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to change profile. Please try again.");
  }
};

const editHeader = async (event) => {
  const token = localStorage.getItem("jwt"); 
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("editHeaderForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editHeaderModal");

  // Validate required fields
  const requiredFields = ["header"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }
  try {
    const response = await fetch(`${url}/api/register/${currentId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    modal.classList.add("hidden");
    location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to change header. Please try again.");
  }
};

const editBio = async (event) => {
  const token = localStorage.getItem("jwt"); 
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("editBioForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editBioModal");

  // Validate required fields
  const requiredFields = ["bio"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (!formData.get(fieldName)) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields");
    return;
  }

  try {
    const response = await fetch(`${url}/api/register/${currentId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    modal.classList.add("hidden");
    location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to change bio. Please try again.");
  }
};

// DELETING
const deleteSubject = async (event) => {
  const modal = document.getElementById("deleteSubjModal");

  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You are not authenticated.");
      return;
    }
// subjectId
    const link = `${url}/subjects/${currentId}`;

    const response = await fetch(link, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();

    modal.classList.add("hidden");
    displaySubjects();
    return data;
  } catch (error) {
    console.error("Error deleting subject:", error.message);
    alert("Failed to delete subject. " + error.message);
    return [];
  }
};


const deleteTask = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const modal = document.getElementById("deleteTaskModal");
  const tasks_maindiv = document.getElementById(`tasks-maindiv-${subjId}`);

  try {
    const token = localStorage.getItem("jwt"); 
    if (!token) {
      alert("Please log in to perform this action.");
      return;
    }

    const link = `${url}/tasks/${currentId}`;

    const response = await fetch(link, {
      method: "DELETE",
      headers: {
        Authorization: token, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();
    modal.classList.add("hidden");

    if (tasks_maindiv) {
      await displaySubjects();
      await displayTasks(subjId); //currentId here is the task not the subject change to subjId
    }
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete task. " + error.message);
    return [];
  }
};

const deleteDone = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const modal = document.getElementById("deleteDoneModal");

  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please log in to perform this action.");
      return;
    }

    const link = `${url}/tasks/${currentId}`;

    const response = await fetch(link, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();
    modal.classList.add("hidden");

    displayDone();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete task. " + error.message);
    return [];
  }
};


// UPDATE STATUS
const updateStatus = async (event) => {
  const tasks_maindiv = document.getElementById(`tasks-maindiv-${subjId}`);

  try {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${url}/tasks/done/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
      body: JSON.stringify({ is_done: 1 }),
    });

    if (response.ok) {
      console.log("Task updated successfully.");
      document.getElementById("updateStatusModal").classList.add("hidden");

      if (tasks_maindiv) {
        await displaySubjects();
        await displayTasks(subjId); //currentId here is the task not the subject change to subjId
      }
    } else {
      console.error("Failed to update task.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

const reupdateStatus = async (event) => {
  try {
    const token = localStorage.getItem("jwt"); //  taskId
    const response = await fetch(`${url}/tasks/undone/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
      body: JSON.stringify({ is_done: 0 }),
    });

    if (response.ok) {
      document.getElementById("reupdateStatusModal").classList.add("hidden");
      displayDone();
    } else {
      console.error("Failed to update task.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

// SHOWING MODAL
const showModal = async (event, id, modalName, subj_id = null) => {
  event.stopPropagation();
  event.preventDefault();
  currentId = id;
  subjId = subj_id;

  console.log(currentId)

  const target = event.currentTarget;

  if (modalName == 'editSubjModal') {
    const name = target.dataset.name;
    const subjectClass = target.dataset.class;
    const color = target.dataset.color;

    document.querySelector('#editSubjectForm input[name="name"]').value = name;
    document.querySelector('#editSubjectForm select[name="classname"]').value =
      subjectClass;

    const colorRadios = document.querySelectorAll(
      '#editSubjectForm input[name="color"]'
    );
    colorRadios.forEach((radio) => {
      radio.checked = radio.value === color;
    });
  }

  if (modalName == "editTaskModal") {
    const task_name = target.dataset.name;
    const task_description = target.dataset.description;
    let task_deadline = target.dataset.deadline;
    // console.log(task_deadline);
    task_deadline = new Date(task_deadline).toISOString().slice(0, 16);

    const task_image = target.dataset.image;
    document.getElementById(
      "existingImagePreview"
    ).src = `${url}/images/${task_image}`;

    document.querySelector('#editTaskForm input[name="name"]').value =
      task_name;
    document.querySelector(
      '#editTaskForm textarea[name="description"]'
    ).value = task_description;
    document.querySelector('#editTaskForm input[name="deadline"]').value =
      task_deadline;

    // document.querySelector('#editTaskForm input[name="task_image"]').value =
    // task_image;
  }
 
  const modal = document.getElementById(`${modalName}`);
  modal.classList.remove("hidden");
};

// COLOR OPACITY OF TASKS
const hexToRgba = (hex, opacity) => {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


const checkLogout = () => {
  const token_for_id = localStorage.getItem("jwt");

  // Helper function to decode JWT
  if (token_for_id) {
    function decodeJWT(token) {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    }
    const decoded = decodeJWT(token_for_id);
    userId = decoded.user_id; // ✅ Get the user_id from JWT
  } else {
    window.location.href = "/dist/login.html";
  }
}

checkLogout();

const logout = () => {
  localStorage.removeItem("jwt"); // Remove token
  window.location.href = "/dist/login.html"; // Redirect to login
};

displaySubjects();





    