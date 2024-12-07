//Ajax 資料請求

/* $.post 寫法 */
$.post("api.php?do=select", {start}, function (result) {
  $("tbody").html(result);
  $(".mdy").click(chginput);
});

/* $.Ajax 完整寫法 */
$.ajax({
  type: "POST",
  data: {start},
  url: "api.php?do=select",
  success: function (result){
    $("tbody").html(result);
    $(".mdy").click(chginput);
  }
});

let start = 0;
function loading() {
  $.post("api.php?do=select", { start }, function (result) {
    if (result != "fail") {
      $("tbody").append(result);
      $(".mdy").click(chginput);
      start += 10;
    }
  });
}
loading();

function sendForm(who) {
  const data = $(who).parents("form").find("input").serialize();
  $.post("api.php?do=insert", data, function (result) {
    //由於是分流載入而考慮情況較多。最快就是歸零重新載入初始 select
    $("tbody").empty();
    start = 0;
    loading();
    $(".insertzone").fadeOut();
  });
}