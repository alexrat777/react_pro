const path = require('path');

// eslint-disable-next-line camelcase
const path_cache = path.resolve(__dirname, '..', 'node_modules', '.cache');

console.log(path_cache);

const fs = require('fs');

fs.rm(path_cache, { recursive: true }, (err) => {
    if (err) {
        console.error('Ошибка при удалении:', err);
        return;
    }
    console.log('Папка с JS-файлами удалена!');
});
