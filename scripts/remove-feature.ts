import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off\on
// константы названий функции и компонента
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

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
            child.getText() === toggleFunctionName
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}
// функция проверки, что это компонент который мы ищем
function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
}
// функция замены
const replaceToggleFunction = (node: Node) => {
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
};
const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getNameNode().getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};
const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);
    // является ли атрибут с именем и забираем оттуда значение
    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');
    // название фичи
    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');

    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        // ищим в ноде потомках  тип ноды SyntaxKind.CallExpression и проверяем что функция toggleFeatures в функции isToggleFunction
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceComponent(node);
        }
        return null;
    });
});

project.save();
