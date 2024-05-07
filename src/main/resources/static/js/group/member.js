(function($) {

    const $groupId = document.getElementById('groupIdContainer').getAttribute('data-group-id');

    $(document).ready(function() {
        init();
    });


    $('#update-btn').on('click',function(e){
        let formData = $('#modify-form').serializeArray();
        let param = {};
        formData.forEach(function(item) {
            param[item.name] = item.value;
        });

        $.ajax({
            type: "POST",
            url: `/api/group/master/${$groupId}/role`,
            contentType: "application/json",
            data: JSON.stringify(param),
            success: function(response){
                alert("매니저 권한 수정이 완료되었습니다.")
                init();
                $('#manager-modal').modal('hide');
            },
            error: function(xhr, status, error){
                console.error("에러 내용: ", error);
                alert("매니저 권한 수정에 실패했습니다.\n관리자에게 문의하세요.")
            }
        });
    });

    function init(){
        $.ajax({
            type: "GET",
            url: `/api/group/manage/${$groupId}/list`,
            success: function(response){
                console.log("매니저리스트", response);
                generateTable(response.groupUsers);
            },
            error: function(xhr, status, error){
                console.error("에러 내용: ", error);
                alert("전시 상태를 확인하세요");
            }
        })
    }

    function generateTable(data){
        let table = new Tabulator("#table", {
            layout: "fitDataStretch",
            placeholder: "데이터가 존재하지 않습니다.",
            pagination: "local",
            paginationSize: 10,
            ajaxURL: `/api/group/manage/${$groupId}/list`,
            ajaxResponse: function(url, params, response){
                console.log('AJAX Response:', response);
                return response.groupUsers;
            },
            columns: [
                {title: "role", field: "role", minWidth: 110},
                {title: "email", field: "email", minWidth: 200},
                {title: "name", field: "userName", minWidth: 200},
                {title: "phone", field: "phoneNumber", minWidth: 200},
                {title: "active status", field: "active", minWidth: 100},
                {title: "createdAt", field: "createdAt", minWidth: 190, formatter: function(cell, formatterParams, onRendered) {
                        let date = new Date(cell.getValue());
                        return date.getFullYear() + '-' +
                            ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + date.getDate()).slice(-2) + ' ' +
                            ('0' + date.getHours()).slice(-2) + ':' +
                            ('0' + date.getMinutes()).slice(-2) + ':' +
                            ('0' + date.getSeconds()).slice(-2);
                }},
                {title: "update", formatter:(cell, formatterParams, onRendered) => {
                        const rowData = cell.getRow().getData();
                        let button = document.createElement("button");
                        button.textContent = "권한변경";
                        button.className = "detail-button btn btn-sm btn-secondary";

                        button.addEventListener("click", function() {
                            console.log(rowData);

                            $('#userId').val(rowData.userId);
                            $('#email').val(rowData.email);

                            $('#role').val($('#role option').filter(function() {
                                return $(this).text() === rowData.role;
                            }).val());


                            $('#manager-modal').modal('show');
                        });

                        return button;
                }}
            ]
        })
    }

})(jQuery);
