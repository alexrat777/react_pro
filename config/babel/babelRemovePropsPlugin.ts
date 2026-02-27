import { PluginItem } from '@babel/core';
/// https://astexplorer.net/  -  ноды дерева кода
export default function (): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                // получение конфига что удалять  пропсы для плагина
                const forbidden = state.opts.props || [];
                // пройти по всем нодам файла path.traverse
                path.traverse({
                    // тут указать тип ноды обрабатываемой JSXIdentifier - нода jsx ноды
                    JSXIdentifier(current) {
                        // получаем название ноды
                        const nodeName = current.node.name;
                        // если название входит в массив тегов на удаление
                        if (forbidden.includes(nodeName)) {
                            // удалить ноду
                            current.parentPath.remove();
                        }
                    },
                });
            },
        },
    };
}
