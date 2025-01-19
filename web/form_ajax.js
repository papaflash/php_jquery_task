$(document).ready(function () {

    $("#frm").submit(function (event) {
        var formData = {
            user_name: $("#user_name").val(),
            user_second_name: $("#user_second_name").val(),
            user_last_name: $("#user_last_name").val(),
            api_key: $("#api_key").val(),
            secret_key: $("#secret_key").val(),
        };

        if(iSEmptyInputsFrm(formData)) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "../dadata.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (result) {
            console.log(result);
            for (let value of result) {
                console.log(value);
                $("#span_for_name").html(
                    '<p>Имя: ' + value.name + '</p>' +
                    '<p>Отчество: ' + value.patronymic + '</p>' +
                    '<p>Фамилия: ' + value.surname + '</p>' +
                    '<p>Полное имя: ' + value.result + '</p>' +
                    '<p>В лице: ' + value.result_genitive + '</p>' +
                    '<p>Кому: ' + value.result_dative + '</p>' +
                    '<p>Согласовано: ' + value.result_ablative + '</p>'
                );
            }

        }).done(function () {
            $("#frm").hide();
            $("#span_for_name").show();
            $("#link").show();
        });

        event.preventDefault();
    });

    $("#link").click(function (e) {
        e.preventDefault();
        $("#frm").show();
        $("#frm")[0].reset();
        $("#span_for_name").hide();
        $("#link").hide();
    })
});
function iSEmptyInputsFrm(frm)
{
    if(frm.user_name === "" || frm.user_last_name === ""){
        alert("Для стандартизации необходимо заполнить минимум два поля: Имя и Фамилия!")
        return true;
    }
    return false;
}