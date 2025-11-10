import { Project } from 'ts-morph';

const project = new Project({});
// добавить все файлы в скрипт ts & tsx
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
function isAbsolute(value:string) {
    const layers = ['app', 'shared', 'entity', 'features', 'pages', 'widgets'];
    return layers.some((layer) => value.startsWith(layer));
}
files.forEach((sourceFile) => {
    // получаем все ноды импортов
    const importDeclaretions = sourceFile.getImportDeclarations();
    importDeclaretions.forEach((importDeclaration) => {
        // получаем значение ноды содержащий адрес подключаемого модуля
        const value = importDeclaration.getModuleSpecifierValue();
        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
    const exportDeclaretions = sourceFile.getExportDeclarations();
    exportDeclaretions.forEach((exportDeclaration) => {
        // получаем значение ноды содержащий адрес подключаемого модуля
        const value = exportDeclaration.getModuleSpecifierValue();
        if (value && isAbsolute(value)) {
            exportDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});
// сохранить изменения
project.save();
