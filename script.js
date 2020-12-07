// Dark theme
document.documentElement.toggleAttribute('data-dark-mode');
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.documentElement.toggleAttribute('data-dark-mode');
});

// Channel list
(function () {
    const channelList = document.getElementById('ch-list');
    const addBtn = document.getElementById('ch-list-add');
    const saveBtn = document.getElementById('ch-list-save');
    const loadBtn = document.getElementById('ch-list-load');
    const exportBtn = document.getElementById('ch-list-export');
    const importBtn = document.getElementById('ch-list-import');
    const clearBtn = document.getElementById('ch-list-clear');
    const storedChannelLists = document.getElementById('stored-ch-lists');
    const storedKeyPrefix = 'ch-list';
    let channelListName = 'default';

    function htmlElement(type, attributes) {
        const element = document.createElement(type);

        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }

        return element;
    }

    function areInputsValid(parent) {
        let valid = true;
        for (const input of parent.querySelectorAll('input')) {
            const message = input.validationMessage;
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
        }
        return valid;
    }

    function addChannel(num, channelName) {
        const index = htmlElement('span');
        index.textContent = num ? num : 1 + channelList.querySelectorAll('span').length;
        channelList.appendChild(index);

        const input = htmlElement('input', {
            type: 'url',
            class: 'dim',
            required: true,
            placeholder: 'Write channel name...'
        });
        if (num) {
            input.value = channelName;
            input.readonly = true;
        }
        channelList.appendChild(input);

        const deleteButton = htmlElement('button', {
            class: 'danger',
            type: 'button'
        });
        deleteButton.textContent = '\u2715';
        deleteButton.addEventListener('click', () => {
            // Remove row
            index.remove();
            input.remove();
            deleteButton.remove();

            // Edit index spans
            channelList.querySelectorAll('span').forEach(
                (span, i) => { span.textContent = i + 1; }
            );
        });
        channelList.appendChild(deleteButton);

        if (!num) {
            input.focus();
        }
    }

    function clearList(list) {
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }
    }

    function loadChannelList(key, listName) {
        channelListName = listName;

        const channels = JSON.parse(decodeURIComponent(
            localStorage.getItem(key)
        ));

        channels.forEach((channelName, i) => { addChannel(i + 1, channelName) });
    }

    // Add new channel to list
    addBtn.addEventListener('click', () => { addChannel() });

    // Local storage save
    saveBtn.addEventListener('click', () => {
        if (!areInputsValid(channelList)) return;

        const listName = window.prompt('Name your channel list', channelListName);
        const listNameEnc = storedKeyPrefix.concat(encodeURIComponent(listName));

        const confirmText = 'This name already exists. Overwrite?';
        if (localStorage.getItem(listNameEnc) && !window.confirm(confirmText)) {
            return;
        }

        const channelsEnc = encodeURIComponent(JSON.stringify(
            [...channelList.querySelectorAll('input')].map(input => input.value)
        ));

        localStorage.setItem(listNameEnc, channelsEnc);
    });

    // Local storage load
    loadBtn.addEventListener('click', () => {
        if (storedChannelLists.firstChild) {
            // List already showing
            return;
        }
        Object.keys(localStorage)
            .filter(key => key.startsWith(storedKeyPrefix))
            .forEach((key, i) => {
                const listName = decodeURIComponent(
                    key.replace(storedKeyPrefix, '')
                );

                const index = htmlElement('span');
                index.textContent = i + 1;
                storedChannelLists.appendChild(index);

                const channelField = htmlElement('input', {
                    type: 'text',
                    class: 'dim',
                    required: true,
                    placeholder: 'Write list name...',
                    value: listName,
                    readonly: true
                });
                channelField.addEventListener('click', () => {
                    if (channelList.firstChild && confirm('Want to save your list first?')) {
                        return;
                    }
                    clearList(channelList);
                    clearList(storedChannelLists);
                    loadChannelList(key, listName);
                });
                storedChannelLists.appendChild(channelField);

                const deleteButton = htmlElement('button', {
                    class: 'danger',
                    type: 'button'
                });
                deleteButton.textContent = '\u2715';
                deleteButton.addEventListener('click', () => {
                    // Remove row
                    index.remove();
                    channelField.remove();
                    deleteButton.remove();

                    // Edit index spans
                    storedChannelLists.querySelectorAll('span').forEach(
                        (span, i) => { span.textContent = i + 1 }
                    );

                    // Remove local storage data
                    localStorage.removeItem(key);
                });
                storedChannelLists.appendChild(deleteButton);
            });
    });

    // Export channel list to local file
    exportBtn.addEventListener('click', () => {
    });

    // Import channel list from local file
    importBtn.addEventListener('click', () => {
    });

    // Clear list
    clearBtn.addEventListener('click', () => {
        const confirmText = 'Are you sure? Whole channel list will be deleted.';
        if (channelList.firstChild && window.confirm(confirmText)) {
            clearList(channelList);
        }
    });
}());
