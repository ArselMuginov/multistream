var chList = document.getElementById('ch-list');
var chListAdd = document.getElementById('ch-list-add');

chListAdd.onclick = function () {
    var chNumber = document.createElement('span');
    chNumber.className = 'ch-num symbol color1';
    chNumber.textContent = chList.querySelectorAll('.ch-num').length + 1;
    chList.insertBefore(chNumber, chListAdd);

    var chEdit = document.createElement('span');
    chEdit.className = 'color2 ch-edit';
    chEdit.contentEditable = true;
    chList.insertBefore(chEdit, chListAdd);

    var chRemove = document.createElement('button');
    chRemove.className = 'symbol color-danger';
    chRemove.type = 'button';
    chRemove.textContent = 'X';
    chRemove.onclick = function () {
        chNumber.remove();
        chEdit.remove();
        chRemove.remove();

        var chNumbers = chList.querySelectorAll('.ch-num');
        for (i = 0; i < chNumbers.length; ++i) {
            chNumbers[i].textContent = i + 1;
        }
    }
    chList.insertBefore(chRemove, chListAdd);

    chEdit.focus();
}
