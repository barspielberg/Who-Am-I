const backdrop = $(".backdrop");
const message = $(".message");
const hidden = $("#id-input");


function deletequiz(args) {
    backdrop.css("display", "grid");
    setTimeout(() => {
      message.addClass("open");
      backdrop.addClass("open");
    }, 10);
    hidden.val(args);
  }
  
  function disappear() {
    message.removeClass("open");
    backdrop.removeClass("open");
    setTimeout(() => {
      backdrop.css("display", "none");
    }, 200);
  }


function copyToClipboard(text) {
  var dummy = document.createElement("input");

  document.body.appendChild(dummy);
  dummy.value ="https://who-am-i-1.herokuapp.com/quiz/"+ text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  $(`#${text}`).addClass('pressed');
  setTimeout(()=>{
    $(`#${text}`).removeClass('pressed');
  },1500);
}
