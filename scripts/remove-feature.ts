import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off\on

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага');
}

if (!featureState) {
    throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояния фичи (on или off)');
}

const project = new Project({});
// что обходим
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
// получаем все файлы для обхода
const files = project.getSourceFiles();
// вынесли условие нахождения ноды с функцией toggleFeatures
function isToggleFunction(node: Node) {
    let isToggleFeatures = false;
    // ищим в ноде потомках  тип ноды SyntaxKind.Identifier
    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === 'toggleFeatures'
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        // ищим в ноде потомках  тип ноды SyntaxKind.CallExpression и проверяем что функция toggleFeatures в функции isToggleFunction
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            // получаем наши поля 3 штуки они находятся в ObjectLiteralExpression   получаем первого потомка по типу getFirstDescendantByKind
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            );

            if (!objectOptions) return;
            // получаем значения каждой проперти
            const offFunctionProperty = objectOptions.getProperty('off');
            const onFunctionProperty = objectOptions.getProperty('on');

            const featureNameProperty = objectOptions.getProperty('name');

            // вынимаем функции из On и Off
            const onFunction = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            // получаем название  фичи
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1); // удаляем кавычки

            if (featureName !== removedFeatureName) return; // првоерка что нашли нужную фичу

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? ''); // заменяем текст в ноде на тело стрелочной функции getBody и переводим в текст
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? ''); // заменяем текст в ноде на тело стрелочной функции getBody и переводим в текст
            }
        }
    });
});

project.save();
