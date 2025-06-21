const url = "http://127.0.0.1:5000";
let currentId = null;


// FETCHING
const fetchSubjects = async () => {
    try {
        let link = `${url}/subjects`

        const response = await fetch(link, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
        let link = `${url}/subjects/${subj_id}/tasks`

        const response = await fetch(link, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Fetched tasks:", data);
          return data;
        } catch (error) {
          console.error("Error fetching tasks:", error);
          return [];
        }

};

const fetchDone = async () => {
  try {
    let link = `${url}/tasks/done`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched tasks:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

const fetchMajor = async () => {
  try {
    let link = `${url}/subjects/majors`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched tasks:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const fetchMinor = async () => {
  try {
    let link = `${url}/subjects/minors`;

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched tasks:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// DISPLAYING
const displaySubjects = async () => {
  const subjects = await fetchSubjects();
  const container = document.getElementById("main");
  const subj_div = document.getElementById("subject__div");
  subj_div.className = "";
  subj_div.innerHTML = "";

  subjects.forEach((subject) => {
    subj_div.insertAdjacentHTML(
      "beforeend",
      `<div class="subject" style="background-color: ${subject.color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class="capitalize">${subject.name}</p>
                <p class="text-sm font-medium">Class: <span class="text-dark underline capitalize">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" width="21" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" width="17" height="20" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
          <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
          </div>
          <!-- <svg onclick="document.getElementById('createTaskModal').classList.remove('hidden')" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="8" fill="#FFC107" />
              <path d="M19.2857 14.4643V15.5357C19.2857 15.7567 19.1049 15.9375 18.8839 15.9375H15.9375V18.8839C15.9375 19.1049 15.7567 19.2857 15.5357 19.2857H14.4643C14.2433 19.2857 14.0625 19.1049 14.0625 18.8839V15.9375H11.1161C10.8951 15.9375 10.7143 15.7567 10.7143 15.5357V14.4643C10.7143 14.2433 10.8951 14.0625 11.1161 14.0625H14.0625V11.1161C14.0625 10.8951 14.2433 10.7143 14.4643 10.7143H15.5357C15.7567 10.7143 15.9375 10.8951 15.9375 11.1161V14.0625H18.8839C19.1049 14.0625 19.2857 14.2433 19.2857 14.4643ZM22.5 9.10714V20.8929C22.5 21.7801 21.7801 22.5 20.8929 22.5H9.10714C8.21987 22.5 7.5 21.7801 7.5 20.8929V9.10714C7.5 8.21987 8.21987 7.5 9.10714 7.5H20.8929C21.7801 7.5 22.5 8.21987 22.5 9.10714ZM20.8929 20.692V9.30804C20.8929 9.19754 20.8025 9.10714 20.692 9.10714H9.30804C9.19754 9.10714 9.10714 9.19754 9.10714 9.30804V20.692C9.10714 20.8025 9.19754 20.8929 9.30804 20.8929H20.692C20.8025 20.8929 20.8929 20.8025 20.8929 20.692Z"
              fill="#F5F5F5"/>
          </svg> -->
        </div>
        <div id="createTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
          <div class="bg-bg w-full max-w-md p-6 rounded-[8px] shadow-xl relative">
            <!-- Close button -->
            <button onclick="document.getElementById('createTaskModal').classList.add('hidden')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              &times;
            </button>
        
            <h2 class="text-xl font-semibold text-primary mb-4">Create Task</h2>
        
            <form id="createTaskForm" class="space-y-4" enctype="multipart/form-data">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" name="name" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none" required></textarea>
              </div>
        
              <!-- Deadline -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deadline (YYYY-MM-DD HH:MM:SS)</label>
                <input type="datetime-local" name="deadline" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" name="img_filename" accept="image/*" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Submit -->
              <div class="text-right">
                <button onclick="createTask(event)" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">Submit</button>
              </div>
            </form>
          </div>
        </div>
   
`
    );
  });
  container.appendChild(subj_div);

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
    task_div.insertAdjacentHTML(
      "beforeend",
      ` <div class="indiv-task w-[500px] border bg-bg border-transparent !rounded-[12px]">
                <div class="!bg-primary py-2 px-4 !rounded-t-[12px] flex justify-between items-center">
                  <span class="font-semibold">Deadline: <span>${task.deadline_date}</span> | <span>${task.deadline_time}</span></span>
                  <span class="flex gap-3 items-center">
                      <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'editTaskModal')" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1.39574C11.08 1.39574 12.08 1.7374 12.8975 2.32074L5.28583 9.93157C5.20624 10.0084 5.14276 10.1004 5.09908 10.2021C5.05541 10.3037 5.03242 10.4131 5.03146 10.5237C5.0305 10.6344 5.05158 10.7441 5.09348 10.8465C5.13538 10.9489 5.19726 11.042 5.2755 11.1202C5.35375 11.1985 5.44679 11.2604 5.5492 11.3023C5.65162 11.3442 5.76135 11.3652 5.872 11.3643C5.98265 11.3633 6.092 11.3403 6.19367 11.2967C6.29534 11.253 6.38729 11.1895 6.46417 11.1099L14.0758 3.49824C14.6784 4.3441 15.0016 5.35717 15 6.39574V14.7291C15 15.1711 14.8244 15.595 14.5118 15.9076C14.1993 16.2201 13.7754 16.3957 13.3333 16.3957H1.66667C1.22464 16.3957 0.800716 16.2201 0.488155 15.9076C0.175595 15.595 0 15.1711 0 14.7291V3.0624C0 2.62038 0.175595 2.19645 0.488155 1.88389C0.800716 1.57133 1.22464 1.39574 1.66667 1.39574H10ZM15.5475 0.848237C15.7037 1.00451 15.7915 1.21643 15.7915 1.4374C15.7915 1.65837 15.7037 1.8703 15.5475 2.02657L14.075 3.49824C13.7505 3.04267 13.3522 2.64442 12.8967 2.3199L14.3683 0.848237C14.5246 0.692011 14.7365 0.604248 14.9575 0.604248C15.1785 0.604248 15.3912 0.692011 15.5475 0.848237Z" fill="white"/>
                      </svg>
                      <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'deleteTaskModal')" width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.62484 13.3333C1.62484 14.25 2.37484 15 3.2915 15H9.95817C10.8748 15 11.6248 14.25 11.6248 13.3333V5C11.6248 4.08333 10.8748 3.33333 9.95817 3.33333H3.2915C2.37484 3.33333 1.62484 4.08333 1.62484 5V13.3333ZM11.6248 0.833333H9.5415L8.94984 0.241667C8.79984 0.0916666 8.58317 0 8.3665 0H4.88317C4.6665 0 4.44984 0.0916666 4.29984 0.241667L3.70817 0.833333H1.62484C1.1665 0.833333 0.791504 1.20833 0.791504 1.66667C0.791504 2.125 1.1665 2.5 1.62484 2.5H11.6248C12.0832 2.5 12.4582 2.125 12.4582 1.66667C12.4582 1.20833 12.0832 0.833333 11.6248 0.833333Z"
                          fill="white"/>
                      </svg>
                  </span>
                </div>
                <div class="p-5">
                  <span class="flex justify-between items-center">
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="done" value="${task.id}" class="peer sr-only" onclick="showModal(event, ${task.id}, 'updateStatusModal')"/>
                      <span class="checkbox"></span>
                      <h3 class="ml-2">${task.name}</h3>
                    </label>
                    <span class="text-red-500">${task.due_text}</span>
                  </span>
                  <div class="flex gap-8 w-full items-center px-5 p-3">
                    <img src="${url}/images/${task.img_filename}" alt="" class="w-[90px] aspect-square object-cover"/>
                    <p class="max-w-[300px]">${descriptionHtml}</p>
                  </div>
                </div>
              </div>

        `
    );
    console.log("Image filename:", task.img_filename);
    console.log(task.img_filename)
  });
};

const displayDone = async () => {
  const tasks = await fetchDone();
  const container = document.getElementById("subject__div");
  container.className =
    "justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10";

  container.innerHTML = ""; // Clear old content

  tasks.forEach((task) => {
    const descriptionHtml = task.description.replace(/\n/g, "<br>");

    // Create a div element
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "indiv-task w-[500px] border bg-bg border-transparent !rounded-[12px]";

    taskDiv.innerHTML = `
      <div class="!bg-primary py-2 px-4 !rounded-t-[12px] flex justify-between items-center">
                    <span class="font-semibold">Deadline: <span>${task.deadline_date}</span> | <span>${task.deadline_time}</span></span>
                    <span class="flex gap-3 items-center">
                        <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'editTaskModal')" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.39574C11.08 1.39574 12.08 1.7374 12.8975 2.32074L5.28583 9.93157C5.20624 10.0084 5.14276 10.1004 5.09908 10.2021C5.05541 10.3037 5.03242 10.4131 5.03146 10.5237C5.0305 10.6344 5.05158 10.7441 5.09348 10.8465C5.13538 10.9489 5.19726 11.042 5.2755 11.1202C5.35375 11.1985 5.44679 11.2604 5.5492 11.3023C5.65162 11.3442 5.76135 11.3652 5.872 11.3643C5.98265 11.3633 6.092 11.3403 6.19367 11.2967C6.29534 11.253 6.38729 11.1895 6.46417 11.1099L14.0758 3.49824C14.6784 4.3441 15.0016 5.35717 15 6.39574V14.7291C15 15.1711 14.8244 15.595 14.5118 15.9076C14.1993 16.2201 13.7754 16.3957 13.3333 16.3957H1.66667C1.22464 16.3957 0.800716 16.2201 0.488155 15.9076C0.175595 15.595 0 15.1711 0 14.7291V3.0624C0 2.62038 0.175595 2.19645 0.488155 1.88389C0.800716 1.57133 1.22464 1.39574 1.66667 1.39574H10ZM15.5475 0.848237C15.7037 1.00451 15.7915 1.21643 15.7915 1.4374C15.7915 1.65837 15.7037 1.8703 15.5475 2.02657L14.075 3.49824C13.7505 3.04267 13.3522 2.64442 12.8967 2.3199L14.3683 0.848237C14.5246 0.692011 14.7365 0.604248 14.9575 0.604248C15.1785 0.604248 15.3912 0.692011 15.5475 0.848237Z" fill="white"/>
                        </svg>
                        <svg onclick="event.stopPropagation(); showModal(event, ${task.id}, 'deleteTaskModal')" width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.62484 13.3333C1.62484 14.25 2.37484 15 3.2915 15H9.95817C10.8748 15 11.6248 14.25 11.6248 13.3333V5C11.6248 4.08333 10.8748 3.33333 9.95817 3.33333H3.2915C2.37484 3.33333 1.62484 4.08333 1.62484 5V13.3333ZM11.6248 0.833333H9.5415L8.94984 0.241667C8.79984 0.0916666 8.58317 0 8.3665 0H4.88317C4.6665 0 4.44984 0.0916666 4.29984 0.241667L3.70817 0.833333H1.62484C1.1665 0.833333 0.791504 1.20833 0.791504 1.66667C0.791504 2.125 1.1665 2.5 1.62484 2.5H11.6248C12.0832 2.5 12.4582 2.125 12.4582 1.66667C12.4582 1.20833 12.0832 0.833333 11.6248 0.833333Z"
                            fill="white"/>
                        </svg>
                    </span>
                  </div>
                  <div class="p-5">
                    <span class="flex justify-between items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="done" value="${task.id}" class="peer sr-only" onclick="showModal(event, ${task.id}, 'updateStatusModal')"/>
                        <span class="checkbox"></span>
                        <h3 class="ml-2">${task.name}</h3>
                      </label>
                      <span class="text-red-500">${task.due_text}</span>
                    </span>
                    <div class="flex gap-8 w-full items-center px-5 p-3">
                      <img src="${url}/images/${task.img_filename}" alt="" class="w-[90px] aspect-square object-cover"/>
                      <p class="max-w-[300px]">${descriptionHtml}</p>
                    </div>
                  </div>
                  </div>
    `;

    container.appendChild(taskDiv); // Add each task to #main
  });
};

const displayMajor = async () => {
  const subjects = await fetchMajor();
  const container = document.getElementById("main");
  const subj_div = document.getElementById("subject__div");
  subj_div.className = "";
  subj_div.innerHTML = "";

  subjects.forEach((subject) => {
    subj_div.insertAdjacentHTML(
      "beforeend",
      `<div class="subject" style="background-color: ${subject.color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class="capitalize">${subject.name}</p>
                <p class="text-sm font-medium">Class: <span class="text-dark underline capitalize">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" width="21" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" width="17" height="20" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
          <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
          </div>
          <!-- <svg onclick="document.getElementById('createTaskModal').classList.remove('hidden')" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="8" fill="#FFC107" />
              <path d="M19.2857 14.4643V15.5357C19.2857 15.7567 19.1049 15.9375 18.8839 15.9375H15.9375V18.8839C15.9375 19.1049 15.7567 19.2857 15.5357 19.2857H14.4643C14.2433 19.2857 14.0625 19.1049 14.0625 18.8839V15.9375H11.1161C10.8951 15.9375 10.7143 15.7567 10.7143 15.5357V14.4643C10.7143 14.2433 10.8951 14.0625 11.1161 14.0625H14.0625V11.1161C14.0625 10.8951 14.2433 10.7143 14.4643 10.7143H15.5357C15.7567 10.7143 15.9375 10.8951 15.9375 11.1161V14.0625H18.8839C19.1049 14.0625 19.2857 14.2433 19.2857 14.4643ZM22.5 9.10714V20.8929C22.5 21.7801 21.7801 22.5 20.8929 22.5H9.10714C8.21987 22.5 7.5 21.7801 7.5 20.8929V9.10714C7.5 8.21987 8.21987 7.5 9.10714 7.5H20.8929C21.7801 7.5 22.5 8.21987 22.5 9.10714ZM20.8929 20.692V9.30804C20.8929 9.19754 20.8025 9.10714 20.692 9.10714H9.30804C9.19754 9.10714 9.10714 9.19754 9.10714 9.30804V20.692C9.10714 20.8025 9.19754 20.8929 9.30804 20.8929H20.692C20.8025 20.8929 20.8929 20.8025 20.8929 20.692Z"
              fill="#F5F5F5"/>
          </svg> -->
        </div>
        <div id="createTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
          <div class="bg-bg w-full max-w-md p-6 rounded-[8px] shadow-xl relative">
            <!-- Close button -->
            <button onclick="document.getElementById('createTaskModal').classList.add('hidden')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              &times;
            </button>
        
            <h2 class="text-xl font-semibold text-primary mb-4">Create Task</h2>
        
            <form id="createTaskForm" class="space-y-4" enctype="multipart/form-data">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" name="name" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none" required></textarea>
              </div>
        
              <!-- Deadline -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deadline (YYYY-MM-DD HH:MM:SS)</label>
                <input type="datetime-local" name="deadline" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" name="img_filename" accept="image/*" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Submit -->
              <div class="text-right">
                <button onclick="createTask(event)" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">Submit</button>
              </div>
            </form>
          </div>
        </div>
   
`
    );
  });
  container.appendChild(subj_div);

};

const displayMinor = async () => {
  const subjects = await fetchMinor();
  const container = document.getElementById("main");
  const subj_div = document.getElementById("subject__div");
  subj_div.className = "";
  subj_div.innerHTML = "";

  subjects.forEach((subject) => {
    subj_div.insertAdjacentHTML(
      "beforeend",
      `<div class="subject" style="background-color: ${subject.color}" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
            <span class="">
                <p class="capitalize">${subject.name}</p>
                <p class="text-sm font-medium">Class: <span class="text-dark underline capitalize">${subject.class}</span></p>
            </span>
            <span class="flex gap-5">
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'createTaskModal')" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0567 7.46429V8.53571C12.0567 8.7567 11.8759 8.9375 11.6549 8.9375H8.7085V11.8839C8.7085 12.1049 8.52769 12.2857 8.30671 12.2857H7.23528C7.0143 12.2857 6.8335 12.1049 6.8335 11.8839V8.9375H3.88707C3.66609 8.9375 3.48528 8.7567 3.48528 8.53571V7.46429C3.48528 7.2433 3.66609 7.0625 3.88707 7.0625H6.8335V4.11607C6.8335 3.89509 7.0143 3.71429 7.23528 3.71429H8.30671C8.52769 3.71429 8.7085 3.89509 8.7085 4.11607V7.0625H11.6549C11.8759 7.0625 12.0567 7.2433 12.0567 7.46429ZM15.271 2.10714V13.8929C15.271 14.7801 14.5511 15.5 13.6639 15.5H1.87814C0.990862 15.5 0.270996 14.7801 0.270996 13.8929V2.10714C0.270996 1.21987 0.990862 0.5 1.87814 0.5H13.6639C14.5511 0.5 15.271 1.21987 15.271 2.10714ZM13.6639 13.692V2.30804C13.6639 2.19754 13.5735 2.10714 13.463 2.10714H2.07903C1.96854 2.10714 1.87814 2.19754 1.87814 2.30804V13.692C1.87814 13.8025 1.96854 13.8929 2.07903 13.8929H13.463C13.5735 13.8929 13.6639 13.8025 13.6639 13.692Z" fill="#F5F5F5"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id},'editSubjModal')" width="21" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.271 0.895737C11.351 0.895737 12.351 1.2374 13.1685 1.82074L5.55683 9.43157C5.47724 9.50844 5.41375 9.6004 5.37008 9.70207C5.3264 9.80374 5.30342 9.91309 5.30245 10.0237C5.30149 10.1344 5.32258 10.2441 5.36448 10.3465C5.40638 10.4489 5.46826 10.542 5.5465 10.6202C5.62474 10.6985 5.71779 10.7604 5.8202 10.8023C5.92261 10.8442 6.03235 10.8652 6.143 10.8643C6.25365 10.8633 6.363 10.8403 6.46467 10.7967C6.56634 10.753 6.65829 10.6895 6.73516 10.6099L14.3468 2.99824C14.9494 3.8441 15.2726 4.85717 15.271 5.89574V14.2291C15.271 14.6711 15.0954 15.095 14.7828 15.4076C14.4703 15.7201 14.0464 15.8957 13.6043 15.8957H1.93766C1.49564 15.8957 1.07171 15.7201 0.759151 15.4076C0.446591 15.095 0.270996 14.6711 0.270996 14.2291V2.5624C0.270996 2.12038 0.446591 1.69645 0.759151 1.38389C1.07171 1.07133 1.49564 0.895737 1.93766 0.895737H10.271ZM15.8185 0.348237C15.9747 0.50451 16.0625 0.716433 16.0625 0.937403C16.0625 1.15837 15.9747 1.3703 15.8185 1.52657L14.3468 2.99824C14.0223 2.54267 13.6232 2.14442 13.1677 1.8199L14.6393 0.348237C14.7956 0.192011 15.0075 0.104248 15.2285 0.104248C15.4495 0.104248 15.6622 0.192011 15.8185 0.348237Z" fill="white"/>
                </svg>
                <svg onclick="event.stopPropagation(); showModal(event, ${subject.id}, 'deleteSubjModal')" width="17" height="20" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.895833 13.8333C0.895833 14.75 1.64583 15.5 2.5625 15.5H9.22917C10.1458 15.5 10.8958 14.75 10.8958 13.8333V5.5C10.8958 4.58333 10.1458 3.83333 9.22917 3.83333H2.5625C1.64583 3.83333 0.895833 4.58333 0.895833 5.5V13.8333ZM10.8958 1.33333H8.8125L8.22083 0.741667C8.07083 0.591667 7.85417 0.5 7.6375 0.5H4.15417C3.9375 0.5 3.72083 0.591667 3.57083 0.741667L2.97917 1.33333H0.895833C0.4375 1.33333 0.0625 1.70833 0.0625 2.16667C0.0625 2.625 0.4375 3 0.895833 3H10.8958C11.3542 3 11.7292 2.625 11.7292 2.16667C11.7292 1.70833 11.3542 1.33333 10.8958 1.33333Z" fill="white"/>
                </svg>
            </span>
          </div>
          <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
          <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
          </div>
          <!-- <svg onclick="document.getElementById('createTaskModal').classList.remove('hidden')" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="8" fill="#FFC107" />
              <path d="M19.2857 14.4643V15.5357C19.2857 15.7567 19.1049 15.9375 18.8839 15.9375H15.9375V18.8839C15.9375 19.1049 15.7567 19.2857 15.5357 19.2857H14.4643C14.2433 19.2857 14.0625 19.1049 14.0625 18.8839V15.9375H11.1161C10.8951 15.9375 10.7143 15.7567 10.7143 15.5357V14.4643C10.7143 14.2433 10.8951 14.0625 11.1161 14.0625H14.0625V11.1161C14.0625 10.8951 14.2433 10.7143 14.4643 10.7143H15.5357C15.7567 10.7143 15.9375 10.8951 15.9375 11.1161V14.0625H18.8839C19.1049 14.0625 19.2857 14.2433 19.2857 14.4643ZM22.5 9.10714V20.8929C22.5 21.7801 21.7801 22.5 20.8929 22.5H9.10714C8.21987 22.5 7.5 21.7801 7.5 20.8929V9.10714C7.5 8.21987 8.21987 7.5 9.10714 7.5H20.8929C21.7801 7.5 22.5 8.21987 22.5 9.10714ZM20.8929 20.692V9.30804C20.8929 9.19754 20.8025 9.10714 20.692 9.10714H9.30804C9.19754 9.10714 9.10714 9.19754 9.10714 9.30804V20.692C9.10714 20.8025 9.19754 20.8929 9.30804 20.8929H20.692C20.8025 20.8929 20.8929 20.8025 20.8929 20.692Z"
              fill="#F5F5F5"/>
          </svg> -->
        </div>
        <div id="createTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
          <div class="bg-bg w-full max-w-md p-6 rounded-[8px] shadow-xl relative">
            <!-- Close button -->
            <button onclick="document.getElementById('createTaskModal').classList.add('hidden')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              &times;
            </button>
        
            <h2 class="text-xl font-semibold text-primary mb-4">Create Task</h2>
        
            <form id="createTaskForm" class="space-y-4" enctype="multipart/form-data">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" name="name" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none" required></textarea>
              </div>
        
              <!-- Deadline -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deadline (YYYY-MM-DD HH:MM:SS)</label>
                <input type="datetime-local" name="deadline" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" name="img_filename" accept="image/*" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
              </div>
        
              <!-- Submit -->
              <div class="text-right">
                <button onclick="createTask(event)" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">Submit</button>
              </div>
            </form>
          </div>
        </div>
   
`
    );
  });
  container.appendChild(subj_div);
};

// CREATING
const createSubject = async () => {
  const form = document.getElementById("createSubjectForm");
  const formData = new FormData(form);

  const requiredFields = ["name", "classname", "color"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    // Regular input validation
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

  fetch(`${url}/subjects`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Subject Created:", data);
      // alert(data.response || data.error);
    })
    .catch((error) => {
      console.error("Error:", error);
      // alert("Something went wrong.");
    });
};

const createTask = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("createTaskForm");
  const formData = new FormData(form);
  const modal = document.getElementById("createTaskModal");

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

  let deadlineInput = formData.get("deadline");
  let deadlineFormatted = deadlineInput.replace("T", " ") + ":00";
  formData.set("deadline", deadlineFormatted);

  try {
    const response = await fetch(`${url}/subjects/${currentId}/tasks`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Task Created:", data);

    // Close modal, reset form, and refresh tasks
    modal.classList.add("hidden");
    form.reset();
    displayTasks(currentId); // Refresh the tasks list
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create task. Please try again.");
  }
};

// EDITING
const editSubject = async (event) => {
  event.preventDefault(); 
  const form = document.getElementById("editSubjectForm");
  const formData = new FormData(form);
  const modal = document.getElementById('editSubjModal')

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
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Subject Updated:", data);
    // alert(data.response || "Subject successfully updated.");
    modal.classList.add("hidden");
    form.reset();
    displaySubjects(); // Refresh the tasks list
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
};

const editTask = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const form = document.getElementById("editTaskForm");
  const formData = new FormData(form);
  const modal = document.getElementById("editTaskModal");

  // Validate required fields
  const requiredFields = ["name", "description", "deadline", "image"];
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (fieldName === "image") {
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

  let deadlineInput = formData.get("deadline");
  let deadlineFormatted = deadlineInput.replace("T", " ") + ":00";
  formData.set("deadline", deadlineFormatted);

  try {
    const response = await fetch(`${url}/tasks/${currentId}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Task Created:", data);

    // Close modal, reset form, and refresh tasks
    modal.classList.add("hidden");
    form.reset();
    displayTasks(currentId); // Refresh the tasks list
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create task. Please try again.");
  }
};

// DELETING
const deleteSubject = async (event) => {
  const modal = document.getElementById("deleteSubjModal");
  try {
    let link = `${url}/subjects/${currentId}`;

    const response = await fetch(link, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Delete subjects:", data);
    modal.classList.add("hidden");
    displaySubjects();
    return data;
  } catch (error) {
    console.error("Error deleting subject:", error);
    return [];
  }
}

const deleteTask = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const modal = document.getElementById("deleteTaskModal");
  try {
    let link = `${url}/tasks/${currentId}`;

    const response = await fetch(link, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Delete tasks:", data);
    modal.classList.add("hidden");
    displayTasks(event);
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return [];
  }
};

// UPDATE STATUS
const updateStatus = async (event) => {
  try {
    const response = await fetch(`${url}/tasks/done/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_done: 1 }),
    });

    if (response.ok) {
      console.log("Task updated successfully.");
      document.getElementById("updateStatusModal").classList.add("hidden");
      location.reload();
    } else {
      console.error("Failed to update task.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

// SHOWING MODAL
const showModal = async (event, id, modalName) => {
  event.stopPropagation();
  event.preventDefault();
  currentId = id;
  const subjModal = document.getElementById(`${modalName}`);
  subjModal.classList.remove("hidden");
};

displaySubjects();

    