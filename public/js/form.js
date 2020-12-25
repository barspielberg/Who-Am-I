const addNewBtn = $(".add-question-btn");
const subBtn = $("form .submit");
const cards = $(".question-cards");

let questionNum = 2;

const optionsNames = [];

for (let i = 1; i <= 4; i++) {
  $(`#op-${i}`).change((event) => {
    optionsNames[i] = event.target.value;
    $(`#qu-1-op-${i}`).attr("placeholder", `תשובה של ${optionsNames[i]}`);
  });
}

let inputs = $("form input");

const eventHandlerInputChange = (event) => {
  const input = event.target;
  if (input.checkValidity()) {
    input.classList.remove("error");
    const inValids = inputs.filter((i) => !inputs[i].checkValidity());
    if (inValids.length !== 0) {
      addNewBtn.addClass("disabled");
      // subBtn.prop("disabled", true);
    } else {
      addNewBtn.removeClass("disabled");
      // subBtn.prop("disabled", false);
    }
  }
};

inputs.change(eventHandlerInputChange);

addNewBtn.click((event) => {
  const inValids = inputs.filter((i) => !inputs[i].checkValidity());
  if (inValids.length !== 0) {
    inValids.addClass("error");
    poperror();
    return;
  }

  const questionName = `qu-${questionNum}`;

  const card = $("<div/>").addClass("question-card");
  card.append($("<label/>", { for: questionName }).text(`שאלה ${questionNum}`));
  card.append(
    $("<input/>", {
      type: "text",
      id: questionName,
      name: questionName,
      required: "required",
      placeholder: "מה העונה האהובה אליך?",
      autocomplete: "off",
    }).change(eventHandlerInputChange)
  );

  const options = $("<div/>").addClass("question-card__answers");

  for (let i = 1; i <= 4; i++) {
    const optionName = `op-${i}`;

    let option = $("<input/>", {
      type: "text",
      id: `${questionName}-${optionName}`,
      name: `${questionName}-${optionName}`,
      required: "required",
      placeholder: `תשובה של ${optionsNames[i]}`,
      autocomplete: "off",
    }).change(eventHandlerInputChange);
    option.appendTo(options);
  }
  card.append(options);

  card.appendTo(cards);
  questionNum++;
  inputs = $("form input");
  addNewBtn.addClass("disabled");
  // subBtn.prop("disabled", true);
});

for (let i = 1; i <= 4; i++) {
  $(`#op-${i}-img`).click(() => $(`#op-${i}-img-input`).trigger("click"));

  document.getElementById(`op-${i}-img-input`).onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById(`op-${i}-img`).src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  };
}

subBtn.click((event) => {
  const inValids = inputs.filter((i) => !inputs[i].checkValidity());
  if (inValids.length !== 0) {
    inValids.addClass("error");
    poperror();
  }
});

const backdrop = $(".backdrop");
const message = $(".message");
const missing = $(".message.missing");
const help = $(".message.help");

function poperror() {
  backdrop.css("display", "grid");
  missing.css("display", "absolute");
  console.log(missing);
  setTimeout(() => {
    missing.addClass("open");
    backdrop.addClass("open");
  }, 10);
}

function pophelp() {
  backdrop.css("display", "grid");
  help.css("display", "absolute");
  setTimeout(() => {
    help.addClass("open");
    backdrop.addClass("open");
  }, 10);
}

function disappear() {
  message.removeClass("open");
  backdrop.removeClass("open");
  setTimeout(() => {
    backdrop.css("display", "none");
    help.css("display", "none");
  }, 200);
}

$(() => {
  pophelp();
});
