const url = "http://127.0.0.1:5000";

// FETCHING
const fetchSubjects = async (id) => {
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

// CREATING
const createSubject = async (formData) => {
  try {
    const response = await fetch(`${url}/subjects`, {
      method: "POST",
      body: formData, // for file uploads, use FormData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Subject created:", result);
    return result;
  } catch (error) {
    console.error("Error creating subject:", error);
    return null;
  }
};

const createTasks = async (formData) => {
  try {
    const response = await fetch(`${url}/tasks`, {
      method: "POST",
      body: formData, // for file uploads, use FormData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Subject created:", result);
    return result;
  } catch (error) {
    console.error("Error creating subject:", error);
    return null;
  }
};
  


// DISPLAYING
const displaySubjects = async (id) => {
    const subjects = await fetchSubjects();
    const subj_div = document.getElementById("subject__div");

    subjects.forEach(subject => {
        subj_div.insertAdjacentHTML(
          "beforeend",
          `<div class="subject" id="subject_${subject.id}" onclick="displayTasks(${subject.id})">
                <p class="capitalize">${subject.name}</p>
                <p class="">Class: <span class="text-primary capitalize">${subject.class}</span></p>
            </div>
            <div id="tasks-maindiv-${subject.id}" class="tasks gap-5 w-full hidden">
            <div id="task-div-${subject.id}" class="justify-center flex flex-wrap gap-x-4 gap-y-2 w-full mb-10">
            
            </div>
            <svg onclick="document.getElementById('createTaskModal').classList.remove('hidden')" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="8" fill="#FFC107" />
                <path d="M19.2857 14.4643V15.5357C19.2857 15.7567 19.1049 15.9375 18.8839 15.9375H15.9375V18.8839C15.9375 19.1049 15.7567 19.2857 15.5357 19.2857H14.4643C14.2433 19.2857 14.0625 19.1049 14.0625 18.8839V15.9375H11.1161C10.8951 15.9375 10.7143 15.7567 10.7143 15.5357V14.4643C10.7143 14.2433 10.8951 14.0625 11.1161 14.0625H14.0625V11.1161C14.0625 10.8951 14.2433 10.7143 14.4643 10.7143H15.5357C15.7567 10.7143 15.9375 10.8951 15.9375 11.1161V14.0625H18.8839C19.1049 14.0625 19.2857 14.2433 19.2857 14.4643ZM22.5 9.10714V20.8929C22.5 21.7801 21.7801 22.5 20.8929 22.5H9.10714C8.21987 22.5 7.5 21.7801 7.5 20.8929V9.10714C7.5 8.21987 8.21987 7.5 9.10714 7.5H20.8929C21.7801 7.5 22.5 8.21987 22.5 9.10714ZM20.8929 20.692V9.30804C20.8929 9.19754 20.8025 9.10714 20.692 9.10714H9.30804C9.19754 9.10714 9.10714 9.19754 9.10714 9.30804V20.692C9.10714 20.8025 9.19754 20.8929 9.30804 20.8929H20.692C20.8025 20.8929 20.8929 20.8025 20.8929 20.692Z"
                fill="#F5F5F5"/>
            </svg>
            </div>`
        );
    });
};

const displayTasks = async (id) => {
  const tasks = await fetchTasks(id);
  const tasks_maindiv = document.getElementById(`tasks-maindiv-${id}`);
  const task_div = document.getElementById(`task-div-${id}`);

  // Toggle visibility first
  tasks_maindiv.classList.toggle("hidden");
  tasks_maindiv.classList.toggle("flex");

  // Clear previous tasks if any
  task_div.innerHTML = "";

  // Re-insert tasks only if showing
    tasks.forEach((task) => {
      task_div.insertAdjacentHTML(
        "beforeend",
        ` <div class="indiv-task w-[500px] border bg-bg border-transparent !rounded-[12px]">
                  <div class="!bg-primary py-2 px-4 !rounded-t-[12px] flex justify-between items-center">
                    <span class="font-semibold">Deadline: <span>${task.deadline_date}</span> | <span>${task.deadline_time}</span></span>
                    <span class="flex gap-3 items-center">
                        <svg onclick="document.getElementById('editTaskModal').classList.remove('hidden')" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.39574C11.08 1.39574 12.08 1.7374 12.8975 2.32074L5.28583 9.93157C5.20624 10.0084 5.14276 10.1004 5.09908 10.2021C5.05541 10.3037 5.03242 10.4131 5.03146 10.5237C5.0305 10.6344 5.05158 10.7441 5.09348 10.8465C5.13538 10.9489 5.19726 11.042 5.2755 11.1202C5.35375 11.1985 5.44679 11.2604 5.5492 11.3023C5.65162 11.3442 5.76135 11.3652 5.872 11.3643C5.98265 11.3633 6.092 11.3403 6.19367 11.2967C6.29534 11.253 6.38729 11.1895 6.46417 11.1099L14.0758 3.49824C14.6784 4.3441 15.0016 5.35717 15 6.39574V14.7291C15 15.1711 14.8244 15.595 14.5118 15.9076C14.1993 16.2201 13.7754 16.3957 13.3333 16.3957H1.66667C1.22464 16.3957 0.800716 16.2201 0.488155 15.9076C0.175595 15.595 0 15.1711 0 14.7291V3.0624C0 2.62038 0.175595 2.19645 0.488155 1.88389C0.800716 1.57133 1.22464 1.39574 1.66667 1.39574H10ZM15.5475 0.848237C15.7037 1.00451 15.7915 1.21643 15.7915 1.4374C15.7915 1.65837 15.7037 1.8703 15.5475 2.02657L14.075 3.49824C13.7505 3.04267 13.3522 2.64442 12.8967 2.3199L14.3683 0.848237C14.5246 0.692011 14.7365 0.604248 14.9575 0.604248C15.1785 0.604248 15.3912 0.692011 15.5475 0.848237Z" fill="white"/>
                        </svg>
                        <svg onclick="document.getElementById('deleteTaskModal').classList.remove('hidden')" width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.62484 13.3333C1.62484 14.25 2.37484 15 3.2915 15H9.95817C10.8748 15 11.6248 14.25 11.6248 13.3333V5C11.6248 4.08333 10.8748 3.33333 9.95817 3.33333H3.2915C2.37484 3.33333 1.62484 4.08333 1.62484 5V13.3333ZM11.6248 0.833333H9.5415L8.94984 0.241667C8.79984 0.0916666 8.58317 0 8.3665 0H4.88317C4.6665 0 4.44984 0.0916666 4.29984 0.241667L3.70817 0.833333H1.62484C1.1665 0.833333 0.791504 1.20833 0.791504 1.66667C0.791504 2.125 1.1665 2.5 1.62484 2.5H11.6248C12.0832 2.5 12.4582 2.125 12.4582 1.66667C12.4582 1.20833 12.0832 0.833333 11.6248 0.833333Z"
                            fill="white"/>
                        </svg>
                    </span>
                  </div>
                  <div class="p-5">
                    <span class="flex justify-between items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="photoshoot" value="${task.id}" class="peer sr-only"/>
                        <span class="checkbox"></span>
                        <h3 class="ml-2">${task.name}</h3>
                      </label>
                      <span class="text-red-500">${task.due_text}</span>
                    </span>
                    <div class="flex gap-8 w-full items-center px-5 p-3">
                      <img src="${url}/images/${task.img_filename}" alt="" class="w-[90px] aspect-square object-cover"/>

                      <p class="max-w-[300px]">${task.description}</p>
                    </div>
                  </div>
                </div>`
      );
      console.log("Image filename:", task.img_filename);
      console.log(task.img_filename)
    });
};




displaySubjects();

    