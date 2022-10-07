let parent = document.querySelector("#parent");
let loading = document.querySelectorAll(".loading");

let data = fetch("https://api.github.com/users/mahmoudali0001/repos");

let dataArray = [];

function createElements(x) {
  dataArray = x.map((element, index) => {
    let parentProject = document.createElement("div");
    let nameOfProject = document.createElement("span");
    let createAt = document.createElement("span");
    let description = document.createElement("p");
    let moreInfoBtn = document.createElement("a");

    let nameOfProjectText = document.createTextNode(x[index].name);
    let createText = document.createTextNode(x[index].created_at.slice(0, 7));
    let descriptionText = document.createTextNode(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nequeducimus ullam amet vero sed nihil laudantium veritatis, dolore nulla rem quos natus sint. Sint, accusamus. Ea placeat quam dicta!"
    );
    let moreInfoBtnText = document.createTextNode("More Info..");

    description.classList = "text-gray-400 text-sm";
    parentProject.classList = "border p-2 mt-2 flex flex-col rounded-xl gap-2";
    nameOfProject.classList = "text-gray-900 text-2xl";
    createAt.classList = "text-gray-600";
    moreInfoBtn.classList = " py-2 text-ms rounded-full mt-5 text-cyan-500 ";

    moreInfoBtn.appendChild(moreInfoBtnText);
    moreInfoBtn.setAttribute("href", x[index].clone_url);
    moreInfoBtn.setAttribute("target", "_blank");

    description.appendChild(descriptionText);
    createAt.appendChild(createText);
    nameOfProject.appendChild(nameOfProjectText);
    parentProject.appendChild(nameOfProject);
    parentProject.appendChild(createAt);
    parentProject.appendChild(description);
    parentProject.appendChild(moreInfoBtn);

    parent.appendChild(parentProject);

    return {
      name: x[index].name,
      date: x[index].created_at.slice(0, 7),
      element: parentProject,
    };
  });
}

data
  .then((result) => {
    let allRepos = result.json();
    return allRepos;
  })
  .then((repos) => {
    document.querySelector("#search").addEventListener("input", (e) => {
      let value = e.target.value;
      dataArray.forEach((project) => {
        const isVisible = project.name.includes(value);
        project.element.classList.toggle("hidden", !isVisible);
      });
    });
    return repos;
  })
  .then((repos) => {
    loading.forEach((el) => {
      el.classList = "hidden";
    });
    createElements(repos);
    return repos;
  });
