// Dark theme
document.documentElement.toggleAttribute('data-dark-mode');
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.documentElement.toggleAttribute('data-dark-mode');
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
    var storedChannelLists = document.getElementById('stored-ch-lists');
    var storedKeyPrefix = 'ch-list';

    function appendIndex(parent, className, channelCount) {
        var index = document.createElement('span');
        index.className = className.concat(` row-${channelCount}`);
        index.textContent = channelCount;
        parent.appendChild(index);
    }

    function appendChannelInput(parent, channelCount) {
        var input = document.createElement('input');
        input.type = 'url';
        input.className = `row-${channelCount} dim`;
        input.required = true;
        input.placeholder = 'Write channel name...';
        parent.appendChild(input);
        input.focus();
    }

    function appendChannelListInput(parent, channel, channelCount) {
        var input = document.createElement('input');
        input.type = 'text';
        input.className = `row-${channelCount}`;
        input.required = true;
        input.placeholder = 'Write list name...';
        input.textContent = channel;
        parent.appendChild(input);
    }

    function appendDeleteButton(parent, channelCount) {
        var deleteButton = document.createElement('button');
        deleteButton.className = `danger row-${channelCount}`;
        deleteButton.type = 'button';
        deleteButton.textContent = '\u2715';

        deleteButton.onclick = function () {
            // Remove row
            parent.querySelectorAll('.row-'.concat(channelCount))
                .forEach(function (node) {
                    node.parentNode.removeChild(node);
                });

            // Edit index spans
            parent.querySelectorAll('span').forEach(function (span, i) {
                span.textContent = i + 1;
            });
        }
        parent.appendChild(deleteButton);
    }

    function areInputsValid(parent) {
        var valid = true;
        parent.querySelectorAll('input').forEach(function (input) {
            var message = input.validationMessage;
            if (message) {
                valid = false;
                tippy(input, {
                    content: message,
                    showOnCreate: true,
                    trigger: 'manual',
                    hideOnClick: false,
                    onClickOutside(instance, event) {
                        instance.destroy();
                    }
                });
            }
        });
        return valid;
    }

    // Add new channel to list
    addBtn.addEventListener('click', function () {
        var channelCount = (channelList.querySelectorAll('span').length + 1).toString();
        appendIndex(channelList, 'clr3', channelCount);
        appendChannelInput(channelList, channelCount);
        appendDeleteButton(channelList, channelCount);
    });

    // Local storage save
    saveBtn.addEventListener('click', function () {
        if (!areInputsValid(channelList)) {
            return;
        }

        var channelsEnc = encodeURIComponent(JSON.stringify(
            [...channelList.querySelectorAll('input')]
                .map(function (input) { return input.value; })
        ));
        var listNameEnc = encodeURIComponent(
            storedKeyPrefix.concat(window.prompt('Name your channel list', 'default'))
        );

        var confirmText = 'This name already exists. Overwrite?';
        if (localStorage.getItem(listNameEnc) && !window.confirm(confirmText)) {
            return;
        }
        localStorage.setItem(listNameEnc, channelsEnc);
    });

    // Local storage load
    loadBtn.addEventListener('click', function () {
        Object.keys(localStorage)
            .forEach(function (key, index) {
                var channel = decodeURIComponent(key).replace(storedKeyPrefix, '');
                appendIndex(storedChannelLists, 'clr3', index + 1);
                appendChannelListInput(storedChannelLists, channel, index + 1);
                appendDeleteButton(storedChannelLists, index + 1);
            });
    });

    exportBtn.addEventListener('click', function () {
        // local storage save
    });

    importBtn.addEventListener('click', function () {
        // local storage save
    });

    // Clear list
    clearBtn.addEventListener('click', function () {
        var confirmText = 'Are you sure? Whole channel list will be deleted.';
        if (channelList.firstChild && window.confirm(confirmText)) {
            while (channelList.firstChild) {
                channelList.removeChild(channelList.lastChild);
            }
        }
    });
}());
