import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});
// добавить все файлы в скрипт ts & tsx
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
// получаем путь до обрабатываемой папки src\shared\ui
const pathUrl = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
// указатель на эту папку
const sharedUiDirectory = project.getDirectory(pathUrl);
// массив указателей на дерриктории внутри папки
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entity', 'features', 'pages', 'widgets'];
    return layers.some((layer) => value.startsWith(layer));
}
// идем по деррикториям в обрабатываемой папке
componentsDirs?.forEach((directory) => {
    // сгенерировать путь к индекс файлу
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);
    // проверить есть ли он
    if (!indexFile) {
        // если нет, то создаем
        const sourceCode = `export * from './${directory.getBaseName()}';`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        });
        file.save();
    }
});

files.forEach((sourceFile) => {
    // получаем все ноды импортов
    const importDeclaretions = sourceFile.getImportDeclarations();
    importDeclaretions.forEach((importDeclaration) => {
        // получаем значение ноды содержащий адрес подключаемого модуля
        const value = importDeclaration.getModuleSpecifierValue();
        // убрать элиас
        const valueWithoutAlias = value.replace('@/', '');
        // сигменты в массив
        const segments = valueWithoutAlias?.split('/');
        // подготовка условий для рефакторинга, только для слоя shared и слайса ui
        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            // разбираем строку на массив и потом ее снова собираем но только с 0 по 2  элементы (3шт)
            const result = valueWithoutAlias?.split('/').slice(0, 3).join('/');
            // заменить строку импорта на новую
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});
// сохранить изменения
project.save();
