var chList = document.querySelector('.ch-list');
var chListAdd = document.getElementById('ch-list-add');
var chCount = 0;

chListAdd.onclick = function () {
    ++chCount;

    var chNum = document.createElement('span');
    chNum.className = 'ch-num';
    chNum.textContent = chCount;
    chList.appendChild(chNum);

    var chEdit = document.createElement('span');
    chEdit.className = 'ch-edit';
    chEdit.contentEditable = true;
    chList.appendChild(chEdit);

    var chRemove = document.createElement('button');
    chRemove.type = 'button';
    chRemove.textContent = 'X';
    chList.appendChild(chRemove);
}
