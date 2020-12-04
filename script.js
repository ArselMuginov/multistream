// Dark theme
document.getElementById('theme-switch').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

// Channel list
(function () {
    var channelList = document.getElementById('ch-list');
    var addBtn = document.getElementById('ch-list-add');
    var saveBtn = document.getElementById('ch-list-save');
    var loadBtn = document.getElementById('ch-list-load');
    var exportBtn = document.getElementById('ch-list-export');
    var importBtn = document.getElementById('ch-list-import');
    var clearBtn = document.getElementById('ch-list-clear');

    function validateInputs() {
        channelList.querySelectorAll('input').forEach(input => {
            var message = input.validationMessage;
            if (message) {
                tippy(input, {
                    content: message,
                    showOnCreate: true,
                    trigger: 'manual',
                    onCreate(instance) {
                        window.setTimeout(function () {
                            if (instance) {
                                instance.destroy();
                            }
                        }, 5000);
                    },
                    onClickOutside(instance, event) {
                        instance.destroy();
                    }
                });
            }
        });
    }

    // Add new channel to list
    addBtn.addEventListener('click', function () {
        var number = document.createElement('span');
        number.className = 'clr3';
        number.textContent = channelList.getElementsByTagName('span').length + 1;
        channelList.appendChild(number);

        var input = document.createElement('input');
        input.type = 'url';
        input.placeholder = 'Add channel name...';
        channelList.appendChild(input);

        var deleteButton = document.createElement('button');
        deleteButton.className = 'danger';
        deleteButton.type = 'button';
        deleteButton.textContent = '\u2715';
        deleteButton.onclick = function () {
            number.remove();
            input.remove();
            deleteButton.remove();

            var chNumbers = channelList.getElementsByTagName('span');
            for (i = 0; i < chNumbers.length; ++i) {
                chNumbers[i].textContent = i + 1;
            }
        }
        channelList.appendChild(deleteButton);

        input.focus();
    });

    // Local storage save
    saveBtn.addEventListener('click', function () {
        validateInputs();
    });

    loadBtn.addEventListener('click', function () {
        // local storage save
    });

    exportBtn.addEventListener('click', function () {
        // local storage save
    });

    importBtn.addEventListener('click', function () {
        // local storage save
    });

    clearBtn.addEventListener('click', function () {
        if (window.confirm('Are you sure? Whole channel list will be deleted.')) {
            while (channelList.firstChild) {
                channelList.removeChild(channelList.lastChild);
            }
        }
    });
}());
